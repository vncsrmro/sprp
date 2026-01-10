import { Link } from 'react-router-dom';
import { ArrowUpRight, User } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

const HomePage = () => {
    const handlePlayNow = () => {
        window.open('https://discord.gg/pj2fQNqU', '_blank');
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Noise overlay */}
            <div className="noise" />

            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/sprp-logo.png"
                            alt="SPRP"
                            className="w-9 h-auto group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="text-lg font-semibold text-white hidden sm:block">SPRP</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Area do Cidadao Button */}
                        <Link
                            to="/painel"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all duration-300 text-sm font-medium text-white/80 hover:text-white"
                        >
                            <User className="w-4 h-4" />
                            Área do Cidadão
                        </Link>

                        {/* CTA Button */}
                        <button
                            onClick={handlePlayNow}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
                        >
                            Jogar
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <HeroSection />

            {/* About Section */}
            <AboutSection />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
