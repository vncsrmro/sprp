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
                    // Parse token data
                    const parsedToken = JSON.parse(jsonPayload);
                    console.log('Parsed Token Data:', parsedToken); // Debug log for user to check console
                    const { name, avatar, accountId, passportId, characterName, whitelisted, groups, steamId, debug } = parsedToken as any;

                    const newUserData = {
                        name,
                        avatar,
                        accountId: accountId || 'N/A', // Account ID
                        passportId, // Character ID
                        steamHex: steamId ? `steam:${BigInt(steamId).toString(16)}` : null, // Derived from steamId if available
                        characterName,
                        wlStatus: whitelisted ? 'approved' : 'pending',
                        groups: groups || [],
                        debug // Pass debug info to state
                    };
                    setUserData(newUserData);
                    setIsLoggedIn(true);
                } catch (e) {
                    console.error('Error parsing stored token', e);
                    localStorage.removeItem('sprp_token'); // Remove invalid token
                }
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
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                                <div className="bg-[#10101a] rounded-3xl p-12 border border-white/5 text-center flex flex-col items-center justify-center min-h-[400px]">
                                    <div className="max-w-md mx-auto">
                                        <div className="w-20 h-20 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                                            <svg className="w-10 h-10 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-3xl font-black text-white mb-4 italic uppercase">
                                            Acesso Restrito
                                        </h2>
                                        <p className="text-gray-400 mb-8 leading-relaxed">
                                            Para visualizar seus dados, histórico de compras e VIPs, você precisa estar conectado com sua conta Steam.
                                        </p>
                                        <button
                                            onClick={handleLogin}
                                            className="px-8 py-4 bg-[#FFD700] hover:bg-amber-400 text-black font-black uppercase italic tracking-wider rounded-xl transition-all hover:scale-105"
                                        >
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
            {/* Debug Info (Always show if N/A, handling missing debug data) */}
            {userData?.accountId === 'N/A' && (
                <div className="fixed bottom-4 right-4 p-4 bg-zinc-900/95 text-white text-xs rounded-lg max-w-md z-50 border border-red-500 shadow-2xl backdrop-blur-sm">
                    <p className="font-bold text-red-400 mb-2 border-b border-red-500/30 pb-1">⚠️ Falha na Conexão (v2)</p>

                    {(userData as any)?.debug ? (
                        <div className="space-y-1 font-mono">
                            <p><span className="text-gray-400">Status Conexão:</span> <span className={(userData as any).debug.connection === 'Success' ? 'text-green-400' : 'text-red-400'}>{(userData as any).debug.connection}</span></p>
                            <p><span className="text-gray-400">Hex Buscado:</span> <span className="text-blue-300">{(userData as any).debug.searchHex}</span></p>
                            <p><span className="text-gray-400">Encontrado na HWID?</span> <span className={(userData as any).debug.hwidFound ? 'text-green-400' : 'text-red-400'}>{(userData as any).debug.hwidFound ? 'SIM' : 'NÃO'}</span></p>
                            <p><span className="text-gray-400">Fallback Accounts?</span> {(userData as any).debug.fallback}</p>
                            {(userData as any).debug.error && (
                                <p className="mt-2 text-red-300 break-words bg-red-950/50 p-2 rounded">
                                    Error: {(userData as any).debug.error}
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="text-orange-400">
                            Nenhuma informação de debug recebida do servidor.<br />
                            Possível erro fatal antes da geração do token.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
