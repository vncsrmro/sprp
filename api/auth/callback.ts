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
            groups: [] as string[],
            dbDebug: {
                connection: 'Not Attempted',
                searchHex: '',
                hwidFound: false,
                accountFound: true,
                charFound: true,
                fallback: 'None',
                error: null as any
            }
        };
        if (process.env.DB_HOST) {
            try {
                // console.log('Connecting to DB...', dbConfig.host); // Debug log
                const connection = await mysql.createConnection(dbConfig);
                userData.dbDebug.connection = 'Success';

                const steamHex = `steam:${BigInt(steamId).toString(16)}`.toLowerCase();
                const steamHexNoPrefix = `${BigInt(steamId).toString(16)}`.toLowerCase();

                // 1. Find Account ID from HWID table (Creative Framework)
                // Try aggressive search: with 'steam:', without 'steam:', uppercase, etc.
                // We use multiple ORs to be sure.
                let [hwidRows]: any = await connection.execute(
                    'SELECT Account FROM hwid WHERE Token LIKE ? OR Token LIKE ?',
                    [`%${steamHex}%`, `%${steamHexNoPrefix}%`]
                );

                userData.dbDebug.searchHex = steamHex;
                userData.dbDebug.hwidFound = hwidRows.length > 0;

                // Fallback: Check 'accounts' table directly if 'hwid' table search fails
                if (hwidRows.length === 0) {
                    const [accountFallbackRows]: any = await connection.execute(
                        'SELECT id FROM accounts WHERE Token LIKE ? OR Token LIKE ?',
                        [`%${steamHex}%`, `%${steamHexNoPrefix}%`]
                    );
                    avatar: player.avatarfull,
                        // Game Data
                        accountId: userData.accountId,
                            passportId: userData.passportId,
                                characterName: userData.characterName,
                                    whitelisted: userData.whitelisted,
                                        banned: userData.banned,
                                            groups: userData.groups,
                                                debug: userData.dbDebug // Pass debug info to frontend
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
