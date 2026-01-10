import { ShoppingBag } from 'lucide-react';

const StarterPackCard = ({ title, price, items, discount, color }: any) => (
    <div className="relative group min-w-[300px] bg-[#0f0f1a] border border-white/5 p-1 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
        {discount && (
            <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                {discount}% OFF
            </div>
        )}
        <div className={`h-40 ${color} opacity-20 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f0f1a]" />
            {/* Icon/Image Placeholder */}
            <div className="absolute center inset-0 flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-white opacity-50" />
            </div>
        </div>

        <div className="p-6 relative -mt-12">
            <h3 className="text-2xl font-black italic text-white uppercase mb-2">{title}</h3>
            <div className="flex items-end gap-2 mb-6">
                <span className="text-3xl font-bold text-sprp-neon-blue">R$ {price}</span>
                <span className="text-sm text-gray-500 line-through mb-1">R$ {(price * 1.5).toFixed(2)}</span>
            </div>

            <ul className="space-y-3 mb-8">
                {items.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckIcon className="w-4 h-4 text-green-500" />
                        {item}
                    </li>
                ))}
            </ul>

            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-bold uppercase text-sm transition-colors">
                Ver Detalhes
            </button>
        </div>
    </div>
);

const PlanCard = ({ tier, price, features, recommended }: any) => (
    <div className={`relative p-8 rounded-3xl border ${recommended ? 'border-sprp-neon-blue bg-sprp-neon-blue/5' : 'border-white/5 bg-[#0f0f1a]'} hover:transform hover:-translate-y-2 transition-all duration-300`}>
        {recommended && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-sprp-neon-blue text-black text-xs font-bold uppercase tracking-widest rounded-full">
                Mais Vendido
            </div>
        )}

        <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">{tier}</h3>
        <div className="text-4xl font-black text-white mb-8">
            R$ {price}<span className="text-lg text-gray-500 font-normal">/mês</span>
        </div>

        <ul className="space-y-4 mb-8">
            {features.map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckIcon className={`w-5 h-5 flex-shrink-0 ${recommended ? 'text-sprp-neon-blue' : 'text-gray-500'}`} />
                    <span className="text-sm">{f}</span>
                </li>
            ))}
        </ul>

        <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all ${recommended ? 'bg-sprp-neon-blue text-black hover:bg-cyan-400' : 'bg-white text-black hover:bg-gray-200'}`}>
            Assinar Agora
        </button>
    </div>
);

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    );
}

export default function HomeStore() {
    return (
        <section className="py-32 bg-[#05050a] relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Horizontal Scrolling Section: Starter Packs */}
                <div id="store" className="mb-32">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase mb-4">
                                Starter <span className="text-sprp-neon-blue">PACKS</span>
                            </h2>
                            <p className="text-gray-400 max-w-xl">
                                Comece sua jornada com o pé direito. Veículos, dinheiro e itens exclusivos para novos jogadores.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 bg-white/5 rounded-full hover:bg-white/10"><ArrowIcon direction="left" /></button>
                            <button className="p-3 bg-white/5 rounded-full hover:bg-white/10"><ArrowIcon direction="right" /></button>
                        </div>
                    </div>

                    <div className="flex gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar">
                        <StarterPackCard
                            title="INICIANTE"
                            price="49,90"
                            color="bg-blue-500"
                            items={['Carro Popular', 'R$ 50.000', 'Celular VIP']}
                            discount={20}
                        />
                        <StarterPackCard
                            title="CRIMINOSO"
                            price="89,90"
                            color="bg-red-500"
                            items={['Carro Esportivo', 'Pistola MK2', 'R$ 100.000']}
                            discount={15}
                        />
                        <StarterPackCard
                            title="EMPRESÁRIO"
                            price="149,90"
                            color="bg-amber-500"
                            items={['Carro de Luxo', 'Mansão', 'R$ 500.000']}
                        />
                        <StarterPackCard
                            title="CARTEL"
                            price="299,90"
                            color="bg-purple-500"
                            items={['Helicóptero', 'Bunker', 'R$ 2.000.000']}
                            discount={30}
                        />
                    </div>
                </div>

                {/* Vertical Grid: VIP Plans */}
                <div id="plans" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <PlanCard
                        tier="SILVER VIP"
                        price="29,90"
                        features={['Fura fila na Whitelist', 'Salário extra de R$ 2.000', 'Carro exclusivo: BMW M3', 'Tag no Discord']}
                    />
                    <PlanCard
                        tier="GOLD VIP"
                        price="59,90"
                        recommended={true}
                        features={['Prioridade Alta na Fila', 'Salário extra de R$ 5.000', 'Carro exclusivo: Porsche 911', 'Mansão Customizada', 'Tag Gold no Discord']}
                    />
                    <PlanCard
                        tier="DIAMOND VIP"
                        price="99,90"
                        features={['Prioridade Máxima', 'Salário extra de R$ 10.000', 'Helicóptero Volatus', 'Bunker Privado', 'Acesso ao Black Market']}
                    />
                </div>
            </div>
        </section>
    );
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
    return (
        <svg className={`w-5 h-5 text-white ${direction === 'left' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    )
}
