import { useState, useCallback } from 'react';
import { Copy, Check, ExternalLink, Gamepad2, Users, Shield, Zap } from 'lucide-react';

const HeroSection = () => {
    const [copied, setCopied] = useState(false);

    const SERVER_IP = 'connect cfx.re/join/sprp';
    const DISCORD_URL = 'https://discord.gg/sprp';

    const copyIP = useCallback(() => {
        navigator.clipboard.writeText(SERVER_IP);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    const openDiscord = useCallback(() => {
        window.open(DISCORD_URL, '_blank');
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-sprp-dark">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-sprp-neon-blue/10 via-transparent to-sprp-neon-purple/10" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sprp-neon-blue/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sprp-neon-purple/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-sprp-neon-gold/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <img
                        src="/sprp-logo.png"
                        alt="SPRP Logo"
                        className="w-32 h-auto md:w-40 drop-shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Servidor Online • 500+ Jogadores
                </div>

                {/* Main Title */}
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight">
                    <span className="block">O MELHOR RP</span>
                    <span className="block bg-gradient-to-r from-sprp-neon-blue via-sprp-neon-purple to-sprp-neon-gold bg-clip-text text-transparent">
                        DE SÃO PAULO
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                    Viva experiências únicas no servidor de roleplay mais imersivo do Brasil.
                    Economia realista, mapa customizado e comunidade ativa.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <button
                        onClick={openDiscord}
                        className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sprp-neon-blue to-sprp-neon-purple text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.6)]"
                    >
                        <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        JOGAR AGORA
                        <ExternalLink className="w-4 h-4 opacity-50" />
                    </button>

                    <button
                        onClick={copyIP}
                        className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-sprp-neon-blue/50 transition-all duration-300 backdrop-blur-sm"
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5 text-green-400" />
                                IP Copiado!
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5 text-sprp-neon-blue" />
                                Copiar IP do Servidor
                            </>
                        )}
                    </button>
                </div>

                {/* Server IP Display */}
                <div className="inline-block px-6 py-3 rounded-lg bg-black/30 border border-white/10 backdrop-blur-sm mb-16">
                    <code className="text-sprp-neon-gold font-mono text-lg">
                        {SERVER_IP}
                    </code>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-sprp-neon-blue/30 transition-colors">
                        <Users className="w-8 h-8 text-sprp-neon-blue mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">5K+</div>
                        <div className="text-sm text-gray-400">Jogadores</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-sprp-neon-purple/30 transition-colors">
                        <Shield className="w-8 h-8 text-sprp-neon-purple mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">24/7</div>
                        <div className="text-sm text-gray-400">Staff Ativo</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-sprp-neon-gold/30 transition-colors">
                        <Zap className="w-8 h-8 text-sprp-neon-gold mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">60+</div>
                        <div className="text-sm text-gray-400">FPS Garantido</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-green-500/30 transition-colors">
                        <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                            <span className="text-2xl">🏆</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                        <div className="text-sm text-gray-400">Uptime</div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
                <span className="text-sm">Role para baixo</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
