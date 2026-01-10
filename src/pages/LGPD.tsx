import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Trash2, Download, UserCheck } from 'lucide-react';

const LGPD = () => {
    return (
        <div className="min-h-screen bg-sprp-dark">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sprp-neon-blue hover:underline mb-8"
                >
                    <ArrowLeft size={20} />
                    Voltar ao início
                </Link>

                <h1 className="font-display text-4xl font-bold text-white mb-4">
                    <span className="text-sprp-neon-blue">LGPD</span> - Lei Geral de Proteção de Dados
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                    Seus direitos garantidos pela Lei nº 13.709/2018
                </p>

                <div className="prose prose-invert max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">Compromisso com a LGPD</h2>
                        <p className="text-gray-400 mb-4">
                            O SPRP está em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD).
                            Esta página detalha como tratamos seus dados e como você pode exercer seus direitos
                            como titular.
                        </p>
                    </section>

                    {/* Rights Cards */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-white mb-6">Seus Direitos como Titular</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-xl glass">
                                <Eye className="w-8 h-8 text-sprp-neon-blue mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Acesso</h3>
                                <p className="text-gray-400 text-sm">
                                    Você pode solicitar acesso a todos os dados pessoais que mantemos sobre você.
                                </p>
                            </div>

                            <div className="p-6 rounded-xl glass">
                                <UserCheck className="w-8 h-8 text-sprp-neon-blue mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Correção</h3>
                                <p className="text-gray-400 text-sm">
                                    Solicite a correção de dados incompletos, inexatos ou desatualizados.
                                </p>
                            </div>

                            <div className="p-6 rounded-xl glass">
                                <Trash2 className="w-8 h-8 text-sprp-neon-blue mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Eliminação</h3>
                                <p className="text-gray-400 text-sm">
                                    Peça a exclusão de dados tratados com base no seu consentimento.
                                </p>
                            </div>

                            <div className="p-6 rounded-xl glass">
                                <Download className="w-8 h-8 text-sprp-neon-blue mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Portabilidade</h3>
                                <p className="text-gray-400 text-sm">
                                    Receba seus dados em formato estruturado para transferência.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">Base Legal para Tratamento</h2>
                        <p className="text-gray-400 mb-4">
                            Tratamos seus dados pessoais com base nas seguintes hipóteses legais:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li><strong>Consentimento:</strong> Ao aceitar nossos termos e participar do servidor</li>
                            <li><strong>Execução de contrato:</strong> Para fornecer os serviços do SPRP</li>
                            <li><strong>Legítimo interesse:</strong> Para segurança, prevenção de fraudes e melhorias</li>
                            <li><strong>Cumprimento de obrigação legal:</strong> Quando exigido por lei</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">Dados que Coletamos</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-gray-400">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-3 px-4 text-white">Categoria</th>
                                        <th className="py-3 px-4 text-white">Dados</th>
                                        <th className="py-3 px-4 text-white">Finalidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/5">
                                        <td className="py-3 px-4">Identificação</td>
                                        <td className="py-3 px-4">Discord ID, nome de usuário</td>
                                        <td className="py-3 px-4">Autenticação e comunicação</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-3 px-4">Técnicos</td>
                                        <td className="py-3 px-4">IP, identificador FiveM</td>
                                        <td className="py-3 px-4">Segurança e anti-cheat</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-3 px-4">Uso</td>
                                        <td className="py-3 px-4">Logs de conexão, tempo de jogo</td>
                                        <td className="py-3 px-4">Moderação e suporte</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-3 px-4">Jogo</td>
                                        <td className="py-3 px-4">Dados de personagens, inventário</td>
                                        <td className="py-3 px-4">Funcionamento do roleplay</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">Medidas de Segurança</h2>
                        <p className="text-gray-400 mb-4">
                            Adotamos medidas técnicas e administrativas para proteger seus dados:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Servidores com criptografia e acesso restrito</li>
                            <li>Backups regulares em ambientes seguros</li>
                            <li>Controle de acesso baseado em funções</li>
                            <li>Treinamento da equipe em proteção de dados</li>
                            <li>Monitoramento contínuo de segurança</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">Como Exercer seus Direitos</h2>
                        <p className="text-gray-400 mb-4">
                            Para exercer qualquer direito previsto na LGPD, você pode:
                        </p>
                        <div className="p-6 rounded-xl glass neon-border">
                            <ol className="list-decimal pl-6 text-gray-400 space-y-3">
                                <li>
                                    Abrir um ticket no nosso Discord oficial:{' '}
                                    <a href="https://discord.gg/sprp" target="_blank" rel="noopener noreferrer" className="text-sprp-neon-blue hover:underline">
                                        discord.gg/sprp
                                    </a>
                                </li>
                                <li>
                                    Enviar e-mail para nosso Encarregado de Dados:{' '}
                                    <a href="mailto:lgpd@sprp.gg" className="text-sprp-neon-blue hover:underline">
                                        lgpd@sprp.gg
                                    </a>
                                </li>
                            </ol>
                            <p className="text-gray-400 mt-4">
                                <strong>Prazo de resposta:</strong> Até 15 dias corridos conforme Art. 18 da LGPD.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">Encarregado de Dados (DPO)</h2>
                        <p className="text-gray-400 mb-4">
                            Nosso Encarregado pelo Tratamento de Dados Pessoais pode ser contatado para
                            dúvidas sobre privacidade e proteção de dados:
                        </p>
                        <div className="p-4 rounded-lg bg-white/5">
                            <p className="text-gray-300">
                                <strong>E-mail:</strong>{' '}
                                <a href="mailto:lgpd@sprp.gg" className="text-sprp-neon-blue hover:underline">
                                    lgpd@sprp.gg
                                </a>
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <div className="p-6 rounded-xl bg-sprp-neon-blue/10 border border-sprp-neon-blue/30">
                            <div className="flex items-start gap-4">
                                <Shield className="w-8 h-8 text-sprp-neon-blue flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Autoridade Nacional</h3>
                                    <p className="text-gray-400">
                                        Se considerar que o tratamento de seus dados viola a LGPD, você pode
                                        apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD):{' '}
                                        <a
                                            href="https://www.gov.br/anpd"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sprp-neon-blue hover:underline"
                                        >
                                            www.gov.br/anpd
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LGPD;
