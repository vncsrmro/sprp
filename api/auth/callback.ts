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
            user_id: 0,
            whitelisted: false,
            banned: false,
            groups: [] as string[]
        };

        if (process.env.DB_HOST) {
            try {
                console.log('Connecting to DB...', dbConfig.host);
                const connection = await mysql.createConnection(dbConfig);

                // Convert SteamID64 (decimal) to Hex for vRP
                // SteamID64 is BigInt, vRP uses 'steam:hex'
                const steamHex = `steam:${BigInt(steamId).toString(16)}`;
                console.log('Searching for identifier:', steamHex);

                // Query user_id
                const [rows]: any = await connection.execute(
                    'SELECT user_id FROM vrp_user_ids WHERE identifier = ?',
                    [steamHex]
                );

                console.log('User ID search result:', rows);

                if (rows.length > 0) {
                    userData.user_id = rows[0].user_id;

                    // Query whitelist/banned from vrp_users
                    const [userRows]: any = await connection.execute(
                        'SELECT whitelisted, banned FROM vrp_users WHERE id = ?',
                        [userData.user_id]
                    );

                    console.log('User status result:', userRows);

                    if (userRows.length > 0) {
                        // vRP often stores 1/0 as whitelist status
                        userData.whitelisted = !!userRows[0].whitelisted;
                        userData.banned = !!userRows[0].banned;
                    }

                    // Query Datatable for Groups (VIP) and Money
                    // Attempt to read 'vRP:datatable' from vrp_user_data
                    const [dataRows]: any = await connection.execute(
                        'SELECT dvalue FROM vrp_user_data WHERE user_id = ? AND dkey = "vRP:datatable"',
                        [userData.user_id]
                    );

                    if (dataRows.length > 0) {
                        try {
                            const datatable = JSON.parse(dataRows[0].dvalue);
                            if (datatable.groups) {
                                userData.groups = Object.keys(datatable.groups);
                            }
                        } catch (e) {
                            console.error('Failed to parse vRP datatable', e);
                        }
                    }
                }

                await connection.end();
            } catch (dbError) {
                console.error('Database connection error:', dbError);
                // Continue login even if DB fails, just with default data
            }
        }

        // 5. Create Session Token (JWT)
        const token = jwt.sign(
            {
                steamId: player.steamid,
                name: player.personaname,
                avatar: player.avatarfull,
                // Game Data
                gameId: userData.user_id,
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
