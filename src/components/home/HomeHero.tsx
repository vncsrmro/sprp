import { ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function HomeHero() {
    const [copied, setCopied] = useState(false);
    const SERVER_IP = 'jogar.sprp.lat';

    const copyIP = () => {
        navigator.clipboard.writeText(SERVER_IP);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
            {/* Background Image / Video Placeholder */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
                {/* Replace with actual game screenshot or video */}
                <img
                    src="https://images.unsplash.com/photo-1596727147705-407887d159a4?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover grayscale"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                    <h2 className="text-sprp-neon-blue font-bold tracking-widest mb-4 animate-slide-in-right">BEM-VINDO AO SPRP</h2>
                    <h1 className="text-6xl md:text-8xl font-black italic text-white leading-[0.9] mb-8 uppercase animate-fade-up">
                        O Maior <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sprp-neon-blue to-purple-600">Servidor</span> <br />
                        de RP
                    </h1>

                    <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                        Uma experiência imersiva na maior metrópole da América Latina.
                        Economia balanceada, facções ativas e roleplay sério.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => window.open('https://discord.gg/pj2fQNqU', '_blank')}
                            className="px-8 py-4 bg-sprp-neon-blue hover:bg-cyan-400 text-black font-black uppercase italic text-lg tracking-wider skew-x-[-10deg] transition-all hover:scale-105"
                        >
                            <span className="skew-x-[10deg] flex items-center gap-2">
                                CONECTAR AGORA <ArrowRight className="w-5 h-5" />
                            </span>
                        </button>

                        <button
                            onClick={copyIP}
                            className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold uppercase italic tracking-wider skew-x-[-10deg] transition-all"
                        >
                            <span className="skew-x-[10deg] flex items-center gap-2">
                                {copied ? <><Check className="w-5 h-5 text-green-500" /> COPIADO!</> : <><Copy className="w-5 h-5" /> COPIAR IP</>}
                            </span>
                        </button>
                    </div>

                    <div className="mt-12 flex items-center gap-8">
                        <div className="text-center">
                            <p className="text-3xl font-black text-white">5K+</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Jogadores</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                            <p className="text-3xl font-black text-white">60FPS</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Otimizado</p>
                        </div>
                    </div>
                </div>

                {/* Right Image/Character */}
                <div className="hidden lg:block relative h-[800px]">
                    {/* Placeholder for character art */}
                    <img
                        src="/sprp-logo.png"
                        alt="Character"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-auto object-contain drop-shadow-[0_0_100px_rgba(0,212,255,0.2)] animate-float"
                    />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <ArrowRight className="w-6 h-6 text-white/30 rotate-90" />
            </div>
        </section>
    );
}
