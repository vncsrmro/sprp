import { Routes, Route, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import TermosDeUso from './pages/TermosDeUso';
import PoliticaDePrivacidade from './pages/PoliticaDePrivacidade';
import LGPD from './pages/LGPD';

const HomePage = () => {
    const handlePlayNow = () => {
        window.open('https://discord.gg/sprp', '_blank');
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

                    {/* CTA Button */}
                    <button
                        onClick={handlePlayNow}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
                    >
                        Jogar
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
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

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/termosdeuso" element={<TermosDeUso />} />
            <Route path="/politicadeprivacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/lgpd" element={<LGPD />} />
        </Routes>
    );
}

export default App;
