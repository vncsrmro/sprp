import { Download, Monitor, UserPlus, Play } from 'lucide-react';

const Step = ({ icon: Icon, number, title, desc }: any) => (
    <div className="relative p-8 rounded-2xl bg-[#1a1a24] border border-white/5 hover:border-sprp-neon-blue/50 transition-colors group">
        <div className="absolute -top-6 -right-6 text-9xl font-black text-white/5 group-hover:text-sprp-neon-blue/10 transition-colors select-none">
            {number}
        </div>
        <div className="w-16 h-16 rounded-xl bg-sprp-neon-blue/10 flex items-center justify-center mb-6 text-sprp-neon-blue group-hover:bg-sprp-neon-blue group-hover:text-black transition-all duration-300">
            <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default function HomeSteps() {
    return (
        <section id="play" className="py-32 bg-[#0a0a0f] border-t border-white/5 mx-6 rounded-[3rem]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase mb-4">
                        COMECE A <span className="text-sprp-neon-blue">JOGAR</span>
                    </h2>
                    <p className="text-gray-400">Entre na cidade em menos de 5 minutos seguindo os passos abaixo.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Step
                        number="01"
                        icon={Download}
                        title="Instale o GTA V"
                        desc="Você precisa ter uma cópia original do GTA V instalada no seu PC (Steam, Epic ou Social Club)."
                    />
                    <Step
                        number="02"
                        icon={Monitor}
                        title="Baixe o FiveM"
                        desc="Faça o download do FiveM, o cliente que permite jogar em servidores dedicados."
                    />
                    <Step
                        number="03"
                        icon={UserPlus}
                        title="Faça a Whitelist"
                        desc="Entre no nosso Discord e faça sua entrevista para ser aprovado na cidade."
                    />
                    <Step
                        number="04"
                        icon={Play}
                        title="Conecte-se"
                        desc="Procure por 'SPRP' na lista de servidores ou use o botão 'Conectar' no topo do site."
                    />
                </div>
            </div>
        </section>
    );
}
