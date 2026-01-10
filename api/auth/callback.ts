import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const STEAM_API_KEY = process.env.STEAM_API_KEY;
    const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_please_change';

    // Use VITE_APP_URL for redirection back to frontend
    const appUrl = process.env.VITE_APP_URL || `https://${process.env.VERCEL_URL}` || 'http://localhost:5173';

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
        // claimed_id comes as: https://steamcommunity.com/openid/id/76561198000000000
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

        // 4. Create Session Token (JWT)
        const token = jwt.sign(
            {
                steamId: player.steamid,
                name: player.personaname,
                avatar: player.avatarfull
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 5. Redirect back to frontend with token
        // In a production app, checking if 'painel' is the intended destination is better, 
        // but for now we redirect to /painel/callback or just /painel with a query param
        res.redirect(`${appUrl}/painel?token=${token}`);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
