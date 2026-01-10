import { ArrowRight, Calendar } from 'lucide-react';

const NewsCard = ({ image, date, title, category }: any) => (
    <div className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
            <div className="flex items-center gap-4 mb-3">
                <span className="px-3 py-1 bg-sprp-neon-blue text-black text-xs font-bold uppercase rounded">{category}</span>
                <span className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                    <Calendar className="w-3 h-3" /> {date}
                </span>
            </div>
            <h3 className="text-2xl font-bold text-white leading-tight mb-4 group-hover:text-sprp-neon-blue transition-colors">
                {title}
            </h3>
            <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Ler Mais <ArrowRight className="w-4 h-4" />
            </div>
        </div>
    </div>
);

export default function HomeNews() {
    return (
        <section id="news" className="py-32 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase mb-2">
                            ÚLTIMAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">NOTÍCIAS</span>
                        </h2>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        Ver todas <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NewsCard
                        image="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                        date="10 JAN 2026"
                        category="ATUALIZAÇÃO"
                        title="Nova DLC de Carros Esportivos e Sistema de Tuning Avançado"
                    />
                    <NewsCard
                        image="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
                        date="08 JAN 2026"
                        category="EVENTO"
                        title="Corrida de Rua: O Rei do Drift (Prêmios em Diamantes)"
                    />
                    <div className="md:col-span-2 lg:col-span-1">
                        <NewsCard
                            image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
                            date="05 JAN 2026"
                            category="COMUNIDADE"
                            title="Vencedores do Concurso de Fotografia da Cidade"
                        />
                    </div>
                </div>

                <button className="md:hidden w-full mt-8 py-4 border border-white/10 rounded-xl text-white font-bold uppercase flex items-center justify-center gap-2">
                    Ver todas <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </section>
    );
}
