import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    // Use VITE_APP_URL for local development or production URL
    // Default to localhost:5173 if not set (development)
    // In production, VERCEL_URL is automatically set, but we usually prefer a custom VITE_APP_URL
    const appUrl = process.env.VITE_APP_URL || `https://${process.env.VERCEL_URL}` || 'http://localhost:5173';

    const returnUrl = `${appUrl}/api/auth/callback`;

    const params = new URLSearchParams({
        'openid.ns': 'http://specs.openid.net/auth/2.0',
        'openid.mode': 'checkid_setup',
        'openid.return_to': returnUrl,
        'openid.realm': appUrl,
        'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
        'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
    });

    const steamLoginUrl = `https://steamcommunity.com/openid/login?${params.toString()}`;

    res.redirect(steamLoginUrl);
}
