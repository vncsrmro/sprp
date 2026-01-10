import HomeNav from '../components/home/HomeNav';
import HomeHero from '../components/home/HomeHero';
import HomeStore from '../components/home/HomeStore';
import HomeNews from '../components/home/HomeNews';
import HomeSteps from '../components/home/HomeSteps';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-sprp-neon-blue selection:text-black">
            {/* Nav */}
            <HomeNav />

            {/* Hero */}
            <HomeHero />

            {/* Store (Starter Packs & VIP) */}
            <HomeStore />

            {/* News */}
            <HomeNews />

            {/* How to Play */}
            <HomeSteps />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
