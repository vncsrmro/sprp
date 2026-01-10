import { useState, useEffect } from 'react';
import PainelHeader from '../components/painel/PainelHeader';
import PainelSidebar from '../components/painel/PainelSidebar';
import PainelTabs from '../components/painel/PainelTabs';
import Footer from '../components/Footer';

// Mock user data - Removed as we now fetch from token
// const mockUserData = { ... }

export default function PainelCidadao() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<any | null>(null);

    useEffect(() => {
        // Check for token in URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            try {
                // Basic JWT decode (payload is the second part)
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const user = JSON.parse(jsonPayload);

                setUserData({
                    name: user.name,
                    accountId: user.gameId || 'N/A', // Real Game ID from DB
                    steamHex: `steam:${BigInt(user.steamId).toString(16)}`,
                    email: 'steam@linked.account',
                    avatar: user.avatar,
                    wlStatus: user.whitelisted ? 'approved' : 'pending', // Real Status
                });
                setIsLoggedIn(true);

                // Clean URL
                window.history.replaceState({}, document.title, window.location.pathname);

                // Save to local storage
                localStorage.setItem('sprp_token', token);
            } catch (e) {
                console.error('Invalid token', e);
            }
        } else {
            // Check local storage
            const storedToken = localStorage.getItem('sprp_token');
            if (storedToken) {
                try {
                    const base64Url = storedToken.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    const user = JSON.parse(jsonPayload);
                    setUserData({
                        name: user.name,
                        accountId: user.gameId || 'N/A',
                        steamHex: `steam:${BigInt(user.steamId).toString(16)}`,
                        email: 'steam@linked.account',
                        avatar: user.avatar,
                        wlStatus: user.whitelisted ? 'approved' : 'pending',
                    });
                    setIsLoggedIn(true);
                } catch { }
            }
        }
    }, []);

    const handleLogin = () => {
        // Redirect to Vercel Function
        window.location.href = '/api/auth/steam';
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem('sprp_token');
    };

    return (
        <div className="min-h-screen bg-[#0a0a15]">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
            </div>

            {/* Noise overlay */}
            <div className="noise" />

            {/* Header */}
            <PainelHeader
                isLoggedIn={isLoggedIn}
                userName={userData?.name}
                userAvatar={userData?.avatar}
            />

            {/* Main Content */}
            <main className="relative z-10 pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Painel do Cidadão
                        </h1>
                        <p className="text-white/50">
                            {isLoggedIn
                                ? `Bem-vindo de volta, ${userData?.name}!`
                                : 'Conecte sua conta Steam para acessar o painel'
                            }
                        </p>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Sidebar */}
                        <div className="lg:col-span-3">
                            <PainelSidebar
                                isLoggedIn={isLoggedIn}
                                onLogin={handleLogin}
                                onLogout={handleLogout}
                                userData={userData}
                            />
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-9">
                            {isLoggedIn ? (
                                <PainelTabs userData={userData} />
                            ) : (
                                <div className="bg-gradient-to-b from-[#1a1a2e] to-[#16162a] rounded-2xl p-12 border border-white/5 text-center">
                                    <div className="max-w-md mx-auto">
                                        <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-3">
                                            Acesso Restrito
                                        </h2>
                                        <p className="text-white/50 mb-6">
                                            Para visualizar seus dados, histórico de compras e VIPs, você precisa estar conectado com sua conta Steam.
                                        </p>
                                        <button
                                            onClick={handleLogin}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1b2838] hover:bg-[#2a475e] border border-[#4c6b8a] rounded-lg text-white font-medium transition-all duration-300"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z" />
                                            </svg>
                                            Conectar com Steam
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
