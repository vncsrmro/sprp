import { Routes, Route, Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import PhysicsHero from './components/PhysicsHero';
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
        <div className="min-h-screen bg-sprp-dark">
            {/* Fixed Play Button */}
            <button
                onClick={handlePlayNow}
                className="fixed top-4 right-4 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sprp-neon-blue to-sprp-neon-purple text-white font-bold rounded-full shadow-neon-blue hover:scale-105 transition-transform animate-glow-pulse"
            >
                <Gamepad2 size={20} />
                JOGAR AGORA
            </button>

            {/* Fixed Logo/Home Link */}
            <Link
                to="/"
                className="fixed top-4 left-4 z-50 flex items-center gap-2"
            >
                <img src="/sprp-logo.png" alt="SPRP" className="w-10 h-auto" />
                <span className="font-display text-xl font-bold text-white hidden md:block">SPRP</span>
            </Link>

            {/* Physics Hero Section */}
            <PhysicsHero />

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
