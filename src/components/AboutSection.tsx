import { Shield, Users, MapPin, Zap, Server, Headphones } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'RP Sério',
        description: 'Staff ativo 24/7 garantindo imersão total e regras claras.',
    },
    {
        icon: Users,
        title: 'Comunidade',
        description: '+5.000 jogadores registrados com eventos semanais.',
    },
    {
        icon: MapPin,
        title: 'Mapa Exclusivo',
        description: 'São Paulo recriada: Paulista, Pinheiros, Centro e mais.',
    },
    {
        icon: Zap,
        title: 'Performance',
        description: 'Servidor otimizado para 60+ FPS constantes.',
    },
    {
        icon: Server,
        title: 'Infraestrutura',
        description: '99.9% uptime com backups diários automáticos.',
    },
    {
        icon: Headphones,
        title: 'Suporte',
        description: 'Equipe dedicada para ajudar a qualquer momento.',
    },
];

const AboutSection = () => {
    return (
        <section id="sobre" className="relative py-32 px-6 bg-black">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sprp-neon-blue/[0.02] to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/50 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-sprp-neon-blue"></span>
                        Sobre o servidor
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        Por que escolher o <span className="gradient-text">SPRP</span>?
                    </h2>

                    <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
                        O servidor de roleplay mais completo de São Paulo,
                        com sistemas exclusivos e uma comunidade acolhedora.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group p-8 rounded-3xl glass card-hover"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6 group-hover:border-sprp-neon-blue/30 transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-white/60 group-hover:text-sprp-neon-blue transition-colors duration-300" />
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-white/40 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* IP Card */}
                <div className="mt-20 text-center">
                    <div className="inline-block p-10 rounded-3xl glass-strong glow-blue">
                        <p className="text-white/40 text-sm uppercase tracking-widest mb-4">IP do Servidor</p>
                        <code className="text-2xl md:text-3xl font-mono text-white font-medium">
                            jogar.sprp.lat
                        </code>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
