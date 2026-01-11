import { useState } from 'react';
import { User, Crown, ShoppingCart, Search, CreditCard, Clock, CheckCircle } from 'lucide-react';

interface PainelTabsProps {
    userData: any;
}

export default function PainelTabs({ userData }: PainelTabsProps) {
    const [activeTab, setActiveTab] = useState('data');

    const tabs = [
        { id: 'data', label: 'Seus Dados', icon: User },
        { id: 'history', label: 'Histórico de VIPs', icon: Crown },
        { id: 'diamonds', label: 'Comprar Diamantes', icon: ShoppingCart },
    ];

    // Detect VIPs from groups array (Mock logic for display based on backend strings)
    // In vRP groups are usually strings like "VipOuro", "VipDiamante"
    const vipHistory = (userData?.groups || []).filter((g: string) => g.toLowerCase().includes('vip')).map((g: string, i: number) => ({
        id: i + 1,
        item: g,
        date: new Date().toLocaleDateString(), // We don't have date in group list, this is a limitation
        status: 'Ativo',
        price: '-'
    }));

    if (vipHistory.length === 0) {
        // Add a mock 'Free VIP' or similar if empty, just for UI demo as requested in screenshot
        vipHistory.push({
            id: 1001,
            item: 'VIP Free (Cidadão)',
            date: '2026-01-01',
            status: 'Ativo',
            price: 'R$ 0,00'
        })
    }

    return (
        <div className="bg-[#10101a] rounded-3xl border border-white/5 overflow-hidden min-h-[600px]">
            {/* Tabs Header */}
            <div className="flex border-b border-white/5 bg-[#0a0a10]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-3 py-6 text-sm font-bold uppercase tracking-wider transition-all relative
                            ${activeTab === tab.id ? 'text-[#00d4ff]' : 'text-gray-500 hover:text-white'}
                        `}
                    >
                        <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#00d4ff]' : 'text-gray-600'}`} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] shadow-[0_-2px_10px_rgba(0,212,255,0.5)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-8">
                {activeTab === 'data' && (
                    <div className="animate-fade-in-up">
                        <div className="mb-8">
                            <div className="space-y-2">
                                <label className="text-gray-500 text-xs font-bold uppercase tracking-widest pl-1">Nome</label>
                                <div className="bg-[#0a0a10] border border-white/10 rounded-xl p-4 text-white font-medium">
                                    {userData?.name}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0a0a10] border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-[#FFD700]" />
                                Histórico de Pagamentos Recentes
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 text-gray-500 uppercase text-xs tracking-wider">
                                            <th className="py-3 px-4">#ID</th>
                                            <th className="py-3 px-4">Qtd</th>
                                            <th className="py-3 px-4">Produto</th>
                                            <th className="py-3 px-4">Data/Hora</th>
                                            <th className="py-3 px-4">Status</th>
                                            <th className="py-3 px-4 text-right">Valor Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {vipHistory.map((item: any) => (
                                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                                <td className="py-4 px-4 text-gray-400">#{item.id}</td>
                                                <td className="py-4 px-4 text-white">1</td>
                                                <td className="py-4 px-4 text-white font-medium">{item.item}</td>
                                                <td className="py-4 px-4 text-gray-400">{item.date}</td>
                                                <td className="py-4 px-4">
                                                    <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-bold uppercase">
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-right text-[#FFD700] font-bold">{item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="animate-fade-in-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Detailed VIP Cards could go here */}
                            {vipHistory.map((item: any) => (
                                <div key={item.id} className="p-6 rounded-2xl bg-[#0a0a10] border border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700]">
                                        <Crown className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{item.item}</h4>
                                        <p className="text-gray-500 text-sm flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> Ativo desde {item.date}
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="px-3 py-1 rounded bg-green-500/10 text-green-500 text-xs font-bold uppercase flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" /> Ativo
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'diamonds' && (
                    <div className="animate-fade-in-up text-center py-12">
                        <div className="w-20 h-20 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FFD700]">
                            <ShoppingCart className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Loja de Diamantes</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Adquira diamantes para comprar itens exclusivos, VIPs e melhorias na cidade.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { amount: 1000, price: 'R$ 10,00', bonus: null },
                                { amount: 3000, price: 'R$ 25,00', bonus: '+10%' },
                                { amount: 6500, price: 'R$ 50,00', bonus: '+15%' },
                                { amount: 15000, price: 'R$ 100,00', bonus: '+30%' },
                            ].map((pkg, i) => (
                                <div key={i} className="group p-6 rounded-2xl bg-[#0a0a10] border border-white/10 hover:border-[#FFD700] hover:bg-[#FFD700]/5 cursor-pointer transition-all">
                                    {pkg.bonus && (
                                        <div className="inline-block px-2 py-1 bg-green-500 text-white text-[10px] font-bold uppercase rounded mb-3">
                                            Bônus {pkg.bonus}
                                        </div>
                                    )}
                                    <div className="text-2xl font-black text-white group-hover:text-[#FFD700] mb-1">
                                        {pkg.amount}
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">Diamantes</div>
                                    <button className="w-full py-2 bg-white/10 group-hover:bg-[#FFD700] group-hover:text-black rounded-lg font-bold text-sm transition-colors">
                                        {pkg.price}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
