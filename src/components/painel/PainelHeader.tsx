import { Link } from 'react-router-dom';
import { Home, User, Crown, Newspaper, HelpCircle, Ticket } from 'lucide-react';

interface PainelHeaderProps {
    isLoggedIn: boolean;
    userName?: string;
    userAvatar?: string;
}

export default function PainelHeader({ isLoggedIn, userName, userAvatar }: PainelHeaderProps) {
    const navItems = [
        { label: 'HOME', href: '/', icon: Home },
        { label: 'PAINEL', href: '/painel', icon: User, active: true },
        { label: 'VIP', href: '/painel?tab=diamantes', icon: Crown },
        { label: 'NOTÍCIAS', href: 'https://discord.gg/sprp', icon: Newspaper, external: true },
        { label: 'COMO JOGAR', href: 'https://discord.gg/sprp', icon: HelpCircle, external: true },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a15]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/sprp-logo.png"
                            alt="SPRP"
                            className="w-10 h-10 rounded-full group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            item.external ? (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${item.active
                                        ? 'text-amber-400'
                                        : 'text-white/60 hover:text-white'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${item.active
                                        ? 'text-amber-400'
                                        : 'text-white/60 hover:text-white'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        {/* Open Ticket Button */}
                        <a
                            href="https://discord.gg/sprp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-black text-sm font-semibold transition-all duration-300"
                        >
                            <Ticket className="w-4 h-4" />
                            <span className="hidden sm:inline">ABRIR TICKET</span>
                        </a>

                        {/* User Avatar (if logged in) */}
                        {isLoggedIn && userAvatar && (
                            <div className="flex items-center gap-2">
                                <span className="hidden lg:block text-white/60 text-sm">{userName}</span>
                                <img
                                    src={userAvatar}
                                    alt={userName}
                                    className="w-8 h-8 rounded-full border-2 border-amber-500/50"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
