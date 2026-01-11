import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const STEAM_API_KEY = process.env.STEAM_API_KEY;
    const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_please_change';
    const appUrl = process.env.VITE_APP_URL || `https://${process.env.VERCEL_URL}` || 'http://localhost:5173';

    console.log('API Callback hit. DB_HOST present:', !!process.env.DB_HOST);

    // DB Config
    const dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    };

    if (!STEAM_API_KEY) {
        return res.status(500).json({ error: 'STEAM_API_KEY is not defined' });
    }

    try {
        // 1. Validate OpenID authentication with Steam
        const params = new URLSearchParams(req.query as any);
        params.set('openid.mode', 'check_authentication');

        const validationResponse = await axios.get(`https://steamcommunity.com/openid/login?${params.toString()}`);

        if (!validationResponse.data.includes('is_valid:true')) {
            return res.status(401).json({ error: 'Invalid Steam authentication' });
        }

        // 2. Extract Steam ID
        const claimedId = req.query['openid.claimed_id'] as string;
        const steamId = claimedId.split('/').pop();

        if (!steamId) {
            return res.status(400).json({ error: 'Could not retrieve Steam ID' });
        }

        // 3. Fetch User Summary from Steam Web API
        const playersResponse = await axios.get(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`
        );
        const player = playersResponse.data.response.players[0];

        // 4. Query Game Database for Real Data (vRP/Creative)
        let userData = {
            accountId: 0,
            passportId: 0,
            characterName: '',
            whitelisted: false,
            banned: false,
            groups: [] as string[]
        };

        if (process.env.DB_HOST) {
            try {
                console.log('Connecting to DB...', dbConfig.host);
                const connection = await mysql.createConnection(dbConfig);

                // Convert SteamID64 (decimal) to Hex for query
                // Looking for 'steam:11000...' in hwid.Token
                const steamHex = `steam:${BigInt(steamId).toString(16)}`.toLowerCase();
                console.log('Searching for identifier:', steamHex);

                // 1. Find Account ID from HWID table (Creative Framework)
                let [hwidRows]: any = await connection.execute(
                    'SELECT Account FROM hwid WHERE Token LIKE ?',
                    [`%${steamHex}%`]
                );

                // Fallback: Check 'accounts' table directly if 'hwid' table search fails
                // Some Creative versions store SteamHex in accounts.Token or accounts.Discord (rarely)
                if (hwidRows.length === 0) {
                    console.log('HWID table search empty. Trying accounts table fallback...');
                    const [accountFallbackRows]: any = await connection.execute(
                        'SELECT id FROM accounts WHERE Token LIKE ?',
                        [`%${steamHex}%`]
                    );
                    if (accountFallbackRows.length > 0) {
                        hwidRows = [{ Account: accountFallbackRows[0].id }];
                        console.log('Found account via fallback search:', hwidRows);
                    }
                }

                console.log('HWID/Account Search result:', hwidRows);

                if (hwidRows.length > 0) {
                    userData.accountId = hwidRows[0].Account;

                    // 2. Query Account for Whitelist & Gems (and License to find Character)
                    const [accountRows]: any = await connection.execute(
                        'SELECT License, Whitelist, Banned, Gemstone FROM accounts WHERE id = ?',
                        [userData.accountId]
                    );

                    console.log('Account Search result:', accountRows);

                    if (accountRows.length > 0) {
                        const account = accountRows[0];
                        userData.whitelisted = !!account.Whitelist;
                        userData.banned = !!account.Banned;
                        // Map Gemstone to groups or similar purely for display if needed, 
                        // but here we primarily need the Character ID for the passport

                        // 3. Find Primary Character (Passport ID) using License
                        if (account.License) {
                            const [charRows]: any = await connection.execute(
                                'SELECT id, Name, Lastname FROM characters WHERE License = ? AND Deleted = 0 ORDER BY id ASC LIMIT 1',
                                [account.License]
                            );

                            console.log('Character Search result:', charRows);

                            if (charRows.length > 0) {
                                userData.passportId = charRows[0].id; // PASSPORT ID
                                userData.characterName = `${charRows[0].Name} ${charRows[0].Lastname}`;
                            }
                        }

                        // 4. Fetch permissions (VIPs)
                        // In Creative, permissions might be by Account ID or Character ID depending on setup.
                        // Based on user info: "Listar VIPs ativos (baseado em Gemstone/Premium)"
                        // Query: SELECT Permission FROM permissions WHERE ...? 
                        // Actually the user provided query uses JOIN on License.

                        // Alternative simple query matching user's 'Listar VIPs ativos':
                        // Check Gemstone as a 'group' for display?
                        if (account.Gemstone > 0) {
                            userData.groups.push(`💎 ${account.Gemstone} Gemas`);
                        }

                        // Try to get real permissions if possible.
                        // Since we don't have a direct user_id -> permission table in the description (it says 'permissions' table has 'Members'?), 
                        // it seems 'permissions' defines the group, but where is the link to the user?
                        // "permissions (Grupos/VIPs)... id, Permission, Members..." - This looks like a group definition table, not user assignments.
                        // Usually Creative uses `vrp_permissions` or similar, OR it's inside `accounts` columns.
                        // But user said: "Listar VIPs ativos (baseado em Gemstone/Premium)... SELECT ... FROM accounts a ... LEFT JOIN permissions p..." 
                        // Wait, the user's provided VIP query joins on License? "JOIN characters c ON c.License = a.License LEFT JOIN permissions p..."
                        // The JOIN condition `p.Permission LIKE` in that query suggests it's filtering global permissions? 
                        // No, typically there's a table linking User <-> Permission.
                        // Standard Creative: check `vrp_permissions` or `information` table?
                        // User said: "NÃO é vRP padrão... Não existe vrp_user_ids".

                        // Let's stick to what we know: Whitelist, Banned, Gemstone, Passport ID.
                        // For VIPs, I will add a placeholder or try to read typical Creative tables if they exist, 
                        // but for now let's ensure ID and WL works.
                    }
                }

                await connection.end();
            } catch (dbError) {
                console.error('Database connection error:', dbError);
            }
        }

        // 5. Create Session Token (JWT)
        const token = jwt.sign(
            {
                steamId: player.steamid,
                name: player.personaname, // Steam Name
                avatar: player.avatarfull,
                // Game Data
                accountId: userData.accountId,
                passportId: userData.passportId,
                characterName: userData.characterName,
                whitelisted: userData.whitelisted,
                banned: userData.banned,
                groups: userData.groups
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.redirect(`${appUrl}/painel?token=${token}`);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
