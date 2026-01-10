import { useState } from 'react';
import { CheckCircle, Clock, ExternalLink, Ticket, ChevronDown } from 'lucide-react';

interface PainelSidebarProps {
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
    userData: {
        name: string;
        accountId: string;
        steamHex: string;
        avatar: string;
        wlStatus: 'approved' | 'pending' | 'rejected';
    } | null;
}

export default function PainelSidebar({ isLoggedIn, onLogin, onLogout, userData }: PainelSidebarProps) {
    const [showDropdown, setShowDropdown] = useState(false);

    const getWlBadge = () => {
        if (!userData) return null;

        switch (userData.wlStatus) {
            case 'approved':
                return (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">ALLOWLIST APROVADA</span>
                    </div>
                );
            case 'pending':
                return (
                    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">ALLOWLIST PENDENTE</span>
                    </div>
                );
            case 'rejected':
                return (
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <Clock className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 text-sm font-medium">ALLOWLIST REJEITADA</span>
                    </div>
                );
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="bg-gradient-to-b from-[#1a1a2e] to-[#16162a] rounded-2xl p-6 border border-white/5">
                <div className="flex flex-col items-center text-center">
                    {/* Steam Logo */}
                    <div className="w-20 h-20 bg-[#1b2838] rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z" />
                        </svg>
                    </div>

                    <h3 className="text-white text-lg font-semibold mb-2">Faça login com Steam</h3>
                    <p className="text-white/50 text-sm mb-6">
                        Conecte sua conta Steam para acessar o painel do cidadão
                    </p>

                    <button
                        onClick={onLogin}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1b2838] hover:bg-[#2a475e] border border-[#4c6b8a] rounded-lg text-white font-medium transition-all duration-300"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z" />
                        </svg>
                        CONECTAR COM STEAM
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-[#1a1a2e] to-[#16162a] rounded-2xl p-6 border border-white/5">
            <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="relative mb-4">
                    <img
                        src={userData?.avatar}
                        alt={userData?.name}
                        className="w-24 h-24 rounded-full border-4 border-amber-500/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-[#1a1a2e] flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Name & ID */}
                <h2 className="text-white text-xl font-bold mb-1">{userData?.name}</h2>
                <p className="text-white/50 text-sm mb-4">Account ID #{userData?.accountId}</p>

                {/* WL Status */}
                {getWlBadge()}

                {/* User Dropdown */}
                <div className="relative w-full mt-4">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg text-black font-semibold transition-all duration-300"
                    >
                        <span>CONECTADO</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#252540] rounded-lg border border-white/10 overflow-hidden z-10">
                            <button
                                onClick={() => window.open('https://discord.gg/sprp', '_blank')}
                                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 transition-colors"
                            >
                                <Ticket className="w-4 h-4" />
                                <span>Abrir Ticket</span>
                                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                            </button>
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                    onLogout();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <span>Desconectar</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* VIP Card Preview */}
                <div className="w-full mt-6 p-4 bg-gradient-to-br from-[#252540] to-[#1a1a2e] rounded-xl border border-white/5">
                    <div className="flex items-center justify-center mb-3">
                        <span className="text-4xl font-bold text-white tracking-wider">FREE</span>
                    </div>
                    <p className="text-center text-white/30 text-xs mb-3">VIP</p>
                    <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-black text-sm font-semibold transition-all duration-300">
                        COMPRAR VIP
                    </button>
                </div>

                {/* Steam Hex */}
                <div className="w-full mt-4 pt-4 border-t border-white/10">
                    <p className="text-white/30 text-xs">SteamHex:</p>
                    <p className="text-white/60 text-xs font-mono break-all">{userData?.steamHex}</p>
                </div>
            </div>
        </div>
    );
}
