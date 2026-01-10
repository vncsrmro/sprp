import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

export default function HomeNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { label: 'HOME', id: 'home' },
        { label: 'PACOTE INICIAL', id: 'store' },
        { label: 'VIP', id: 'plans' },
        { label: 'NOTÍCIAS', id: 'news' },
        { label: 'COMO JOGAR', id: 'play' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
                    <img src="/sprp-logo.png" alt="SPRP" className="w-10 h-auto" />
                    <span className="text-xl font-bold italic tracking-tighter">SPRP</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white hover:text-sprp-neon-blue transition-colors"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/painel"
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-sprp-neon-blue to-purple-600 text-white font-bold uppercase italic tracking-wider skew-x-[-10deg] hover:scale-105 transition-transform"
                    >
                        <span className="skew-x-[10deg] flex items-center gap-2">
                            <User size={16} />
                            Painel
                        </span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-white/10 p-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className="text-left text-lg font-bold uppercase tracking-widest text-white/80"
                        >
                            {link.label}
                        </button>
                    ))}
                    <Link
                        to="/painel"
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-sprp-neon-blue text-black font-bold uppercase tracking-wider"
                        onClick={() => setIsOpen(false)}
                    >
                        Acessar Painel
                    </Link>
                </div>
            )}
        </nav>
    );
}
