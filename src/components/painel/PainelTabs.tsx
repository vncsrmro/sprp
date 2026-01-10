import { useState } from 'react';
import { Eye, EyeOff, ShoppingCart, Crown, User, CreditCard, Package } from 'lucide-react';

interface PainelTabsProps {
    userData: {
        name: string;
        email: string;
    } | null;
}

type TabType = 'dados' | 'vips' | 'diamantes';

interface Purchase {
    id: string;
    quantity: number;
    product: string;
    date: string;
    status: 'completed' | 'pending' | 'cancelled';
    total: string;
}

interface VipHistory {
    id: string;
    type: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'expired';
}

// Mock data
const mockPurchases: Purchase[] = [
    { id: '1001', quantity: 1, product: 'VIP Gold', date: '2026-01-05', status: 'completed', total: 'R$ 49,90' },
    { id: '1002', quantity: 500, product: 'Diamantes', date: '2026-01-03', status: 'completed', total: 'R$ 25,00' },
];

const mockVips: VipHistory[] = [
    { id: '1', type: 'VIP Gold', startDate: '2026-01-05', endDate: '2026-02-05', status: 'active' },
];

const diamondPackages = [
    { amount: 100, price: 'R$ 5,00', popular: false },
    { amount: 500, price: 'R$ 25,00', popular: true },
    { amount: 1000, price: 'R$ 45,00', popular: false },
    { amount: 5000, price: 'R$ 200,00', popular: false },
];

export default function PainelTabs({ userData }: PainelTabsProps) {
    const [activeTab, setActiveTab] = useState<TabType>('dados');
    const [showEmail, setShowEmail] = useState(false);

    const tabs = [
        { id: 'dados' as TabType, label: 'Seus Dados', icon: User },
        { id: 'vips' as TabType, label: 'Histórico de VIPs', icon: Crown },
        { id: 'diamantes' as TabType, label: 'Comprar Diamantes', icon: ShoppingCart },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
            case 'active':
                return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Ativo</span>;
            case 'pending':
                return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Pendente</span>;
            case 'cancelled':
            case 'expired':
                return <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/30">Expirado</span>;
            default:
                return null;
        }
    };

    const handleBuyDiamonds = (amount: number) => {
        // Redirect to Mercado Pago checkout
        window.open(`https://mpago.la/sprp-diamonds-${amount}`, '_blank');
    };

    return (
        <div className="bg-gradient-to-b from-[#1a1a2e] to-[#16162a] rounded-2xl border border-white/5 overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-white/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-amber-500 text-black'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {/* Seus Dados */}
                {activeTab === 'dados' && (
                    <div className="space-y-6">
                        {/* User Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/50 text-sm mb-2">Nome</label>
                                <div className="px-4 py-3 bg-[#252540] rounded-lg border border-white/10">
                                    <span className="text-white">{userData?.name || 'N/A'}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-white/50 text-sm mb-2">Email</label>
                                <div className="flex items-center gap-2 px-4 py-3 bg-[#252540] rounded-lg border border-white/10">
                                    <span className="text-white flex-1">
                                        {showEmail ? userData?.email : '••••••••••••••••'}
                                    </span>
                                    <button
                                        onClick={() => setShowEmail(!showEmail)}
                                        className="text-white/50 hover:text-white transition-colors"
                                    >
                                        {showEmail ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Purchase History */}
                        <div>
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-amber-500" />
                                Histórico de Pagamentos
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">#ID</th>
                                            <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Qtde</th>
                                            <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Produto</th>
                                            <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Data/Hora</th>
                                            <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Status</th>
                                            <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Valor Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockPurchases.length > 0 ? (
                                            mockPurchases.map((purchase) => (
                                                <tr key={purchase.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="py-3 px-4 text-white/80 text-sm">{purchase.id}</td>
                                                    <td className="py-3 px-4 text-white/80 text-sm">{purchase.quantity}</td>
                                                    <td className="py-3 px-4 text-white/80 text-sm">{purchase.product}</td>
                                                    <td className="py-3 px-4 text-white/80 text-sm">{purchase.date}</td>
                                                    <td className="py-3 px-4">{getStatusBadge(purchase.status)}</td>
                                                    <td className="py-3 px-4 text-amber-400 text-sm font-medium">{purchase.total}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="py-8 text-center text-white/30">
                                                    Nenhum dado encontrado
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Histórico de VIPs */}
                {activeTab === 'vips' && (
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Crown className="w-5 h-5 text-amber-500" />
                            Seus VIPs
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Tipo</th>
                                        <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Início</th>
                                        <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Término</th>
                                        <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockVips.length > 0 ? (
                                        mockVips.map((vip) => (
                                            <tr key={vip.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-3 px-4 text-white/80 text-sm flex items-center gap-2">
                                                    <Crown className="w-4 h-4 text-amber-500" />
                                                    {vip.type}
                                                </td>
                                                <td className="py-3 px-4 text-white/80 text-sm">{vip.startDate}</td>
                                                <td className="py-3 px-4 text-white/80 text-sm">{vip.endDate}</td>
                                                <td className="py-3 px-4">{getStatusBadge(vip.status)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-white/30">
                                                Nenhum VIP encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Comprar Diamantes */}
                {activeTab === 'diamantes' && (
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-amber-500" />
                            Pacotes de Diamantes
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {diamondPackages.map((pkg) => (
                                <div
                                    key={pkg.amount}
                                    className={`relative p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${pkg.popular
                                            ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500/50'
                                            : 'bg-[#252540] border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 rounded-full text-xs font-bold text-black">
                                            POPULAR
                                        </div>
                                    )}

                                    <div className="text-center">
                                        <div className="text-3xl mb-2">💎</div>
                                        <div className="text-2xl font-bold text-white mb-1">{pkg.amount.toLocaleString()}</div>
                                        <div className="text-white/50 text-sm mb-4">Diamantes</div>
                                        <div className="text-amber-400 font-bold text-lg mb-4">{pkg.price}</div>
                                        <button
                                            onClick={() => handleBuyDiamonds(pkg.amount)}
                                            className="w-full py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-black text-sm font-semibold transition-all duration-300"
                                        >
                                            COMPRAR
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="mt-4 text-white/30 text-xs text-center">
                            * Pagamento processado via Mercado Pago. Os diamantes serão creditados automaticamente.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
