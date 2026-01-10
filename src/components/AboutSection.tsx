import { Shield, Users, MapPin, Zap, Server, Clock } from 'lucide-react';

const features = [
    {
        icon: <Shield className="w-8 h-8" />,
        title: 'Roleplay Sério',
        description: 'Sistema avançado de regras e staff ativo 24/7 para garantir imersão total.',
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: 'Comunidade Ativa',
        description: 'Mais de 5.000 jogadores registrados com eventos semanais e comunidade Discord.',
    },
    {
        icon: <MapPin className="w-8 h-8" />,
        title: 'Mapa Customizado',
        description: 'São Paulo recriada com detalhes únicos: Paulista, Pinheiros, Centro e muito mais.',
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: 'Economia Realista',
        description: 'Sistema econômico balanceado com empregos, empresas e mercado negro.',
    },
    {
        icon: <Server className="w-8 h-8" />,
        title: 'Alta Performance',
        description: 'Servidor otimizado rodando a 60+ FPS com anti-cheat robusto.',
    },
    {
        icon: <Clock className="w-8 h-8" />,
        title: 'Uptime 99.9%',
        description: 'Infraestrutura profissional com backups diários e suporte técnico.',
    },
];

const AboutSection = () => {
    return (
        <section id="sobre" className="relative bg-sprp-darker py-20 px-4 md:px-8">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sprp-accent to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                        Sobre a <span className="text-sprp-neon-blue text-neon-blue">Cidade</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Bem-vindo ao SPRP, o servidor de GTA RP mais imersivo ambientado em São Paulo.
                        Viva a vida que você sempre quis na maior metrópole da América Latina.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl glass hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-neon-blue"
                        >
                            <div className="text-sprp-neon-blue mb-4 group-hover:text-sprp-neon-gold transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2 font-display">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Server IP Card */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-8 rounded-2xl glass neon-border">
                        <p className="text-gray-400 mb-2">IP do Servidor</p>
                        <code className="font-display text-2xl md:text-3xl text-sprp-neon-gold text-neon-gold">
                            connect cfx.re/join/sprp
                        </code>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
