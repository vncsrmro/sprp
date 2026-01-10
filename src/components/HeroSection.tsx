import { useState, useCallback, useEffect } from 'react';
import { Copy, Check, ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
    const [copied, setCopied] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const SERVER_IP = 'jogar.sprp.lat';
    const DISCORD_URL = 'https://discord.gg/pj2fQNqU';

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const copyIP = useCallback(() => {
        navigator.clipboard.writeText(SERVER_IP);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    const openDiscord = useCallback(() => {
        window.open(DISCORD_URL, '_blank');
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Gradient Mesh Background */}
            <div className="absolute inset-0">
                {/* Primary gradient orb */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />

                {/* Secondary accent orbs */}
                <div
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20 float"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,212,255,0.5) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        animationDelay: '0s',
                    }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-20 float"
                    style={{
                        background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        animationDelay: '2s',
                    }}
                />

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: '100px 100px',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Logo with glow */}
                <div
                    className={`mb-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <div className="relative inline-block">
                        <div className="absolute inset-0 blur-3xl opacity-50">
                            <img src="/sprp-logo.png" alt="" className="w-28 h-auto" />
                        </div>
                        <img
                            src="/sprp-logo.png"
                            alt="SPRP Logo"
                            className="relative w-28 h-auto mx-auto hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Status Pill */}
                <div
                    className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-8 transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm text-white/70 font-medium">Servidor Online</span>
                    <span className="w-px h-4 bg-white/10"></span>
                    <span className="text-sm text-white/50">500+ jogadores ativos</span>
                </div>

                {/* Main Headline */}
                <h1
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <span className="block text-white">Seu roleplay</span>
                    <span className="block gradient-text">começa aqui.</span>
                </h1>

                {/* Subtitle */}
                <p
                    className={`text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    O servidor de GTA RP mais imersivo de São Paulo.
                    Economia real, mapa exclusivo e comunidade ativa.
                </p>

                {/* CTA Buttons */}
                <div
                    className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {/* Primary CTA */}
                    <button
                        onClick={openDiscord}
                        className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                    >
                        <Sparkles className="w-5 h-5" />
                        Começar a jogar
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    {/* Secondary CTA */}
                    <button
                        onClick={copyIP}
                        className="flex items-center gap-3 px-8 py-4 rounded-full glass hover:bg-white/10 transition-all duration-300 font-medium text-white/80 hover:text-white"
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5 text-emerald-400" />
                                <span className="text-emerald-400">Copiado!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5" />
                                Copiar IP
                            </>
                        )}
                    </button>
                </div>

                {/* Server IP */}
                <div
                    className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="w-2 h-2 rounded-full bg-sprp-neon-blue animate-pulse"></div>
                        <code className="text-white/60 font-mono text-sm">
                            {SERVER_IP}
                        </code>
                    </div>
                </div>

                {/* Stats Row */}
                <div
                    className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-[600ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {[
                        { value: '5K+', label: 'Jogadores', delay: '0ms' },
                        { value: '24/7', label: 'Suporte', delay: '50ms' },
                        { value: '60+', label: 'FPS', delay: '100ms' },
                        { value: '99.9%', label: 'Uptime', delay: '150ms' },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-2xl glass card-hover cursor-default"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:gradient-text transition-all duration-300">
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/40">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
