import { Home, LayoutDashboard, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PainelSidebarProps {
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
    userData: any;
}

export default function PainelSidebar({ isLoggedIn, onLogout, userData }: PainelSidebarProps) {
    const [copied, setCopied] = useState(false);

    const copyHex = () => {
        if (userData?.steamHex) {
            navigator.clipboard.writeText(userData.steamHex);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!isLoggedIn) return null;

    return (
        <div className="bg-[#10101a] rounded-3xl p-6 border border-white/5 h-full flex flex-col relative">
            <span className="absolute top-2 right-4 text-[9px] text-gray-600 font-mono opacity-50">v2.4 BUILD</span>
            {/* User Profile Card */}
            <div className="flex flex-col items-center mb-10">
                <div className="relative mb-4 group">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7]">
                        <img
                            src={userData?.avatar}
                            alt={userData?.name}
                            className="w-full h-full rounded-full object-cover border-4 border-[#10101a]"
                        />
                    </div>
                    {/* Whitelist Badge */}
                    <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-full border-4 border-[#10101a] flex items-center justify-center ${userData?.wlStatus === 'approved' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {userData?.wlStatus === 'approved' ? <Check className="w-4 h-4 text-white" /> : <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{userData?.name}</h3>
                <p className="text-gray-400 text-sm font-medium mb-4">ID da Conta #{userData?.accountId}</p>

                {userData?.wlStatus !== 'approved' && (
                    <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 text-xs font-bold uppercase tracking-wider flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                        Allowlist Pendente
                    </div>
                )}

                {/* SteamHex Copy */}
                <button
                    onClick={copyHex}
                    className="w-full text-left bg-[#0a0a10] rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors group"
                >
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">SteamHex:</p>
                    <div className="flex items-center justify-between">
                        <code className="text-xs text-[#00d4ff] font-mono truncate max-w-[150px]">
                            {userData?.steamHex}
                        </code>
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />}
                    </div>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                >
                    <Home className="w-5 h-5 text-gray-600 group-hover:text-[#00d4ff] transition-colors" />
                    <span className="font-bold uppercase tracking-wide text-sm">Home</span>
                </Link>

                <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white shadow-lg shadow-cyan-900/20"
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-wide text-sm">Painel</span>
                </div>
            </nav>

            {/* Logout */}
            <button
                onClick={onLogout}
                className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full"
            >
                <LogOut className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wide text-sm">Desconectar</span>
            </button>
        </div>
    );
}
