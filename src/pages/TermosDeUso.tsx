import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermosDeUso = () => {
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

                <h1 className="font-display text-4xl font-bold text-white mb-8">
                    Termos de <span className="text-sprp-neon-blue">Uso</span>
                </h1>

                <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-6">
                        <strong>Última atualização:</strong> Janeiro de 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
                        <p className="text-gray-400 mb-4">
                            Ao acessar e utilizar os serviços do SPRP (São Paulo Roleplay), incluindo nosso servidor de GTA RP,
                            website, Discord e demais plataformas associadas, você concorda em cumprir e estar vinculado a estes
                            Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Descrição do Serviço</h2>
                        <p className="text-gray-400 mb-4">
                            O SPRP oferece um servidor de roleplay para o jogo Grand Theft Auto V, proporcionando uma experiência
                            de interpretação de personagens em um ambiente virtual baseado na cidade de São Paulo. Nossos serviços incluem:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Acesso ao servidor de jogo mediante aprovação de whitelist</li>
                            <li>Participação na comunidade via Discord</li>
                            <li>Acesso a sistemas de economia, empregos e interações virtuais</li>
                            <li>Suporte técnico e moderação</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Requisitos de Elegibilidade</h2>
                        <p className="text-gray-400 mb-4">
                            Para utilizar nossos serviços, você deve:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Ter pelo menos 16 anos de idade</li>
                            <li>Possuir uma cópia legítima do Grand Theft Auto V</li>
                            <li>Ter o FiveM instalado corretamente</li>
                            <li>Passar pelo processo de whitelist, quando aplicável</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Regras de Conduta</h2>
                        <p className="text-gray-400 mb-4">
                            Ao utilizar nossos serviços, você concorda em:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Respeitar as regras do servidor disponíveis no Discord</li>
                            <li>Não utilizar cheats, hacks ou qualquer software de terceiros que proporcione vantagens indevidas</li>
                            <li>Não praticar assédio, discriminação ou qualquer forma de abuso contra outros jogadores</li>
                            <li>Manter o roleplay de qualidade e respeitar a imersão dos demais</li>
                            <li>Não compartilhar conteúdo ilegal ou impróprio</li>
                            <li>Reportar bugs e exploits à administração</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Propriedade Intelectual</h2>
                        <p className="text-gray-400 mb-4">
                            Todo o conteúdo original criado pelo SPRP, incluindo scripts, mapas customizados, sistemas e identidade
                            visual, são de propriedade exclusiva do SPRP. Grand Theft Auto V e FiveM são marcas registradas de seus
                            respectivos proprietários.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Modificações dos Termos</h2>
                        <p className="text-gray-400 mb-4">
                            O SPRP reserva-se o direito de modificar estes termos a qualquer momento. Alterações significativas
                            serão comunicadas através do Discord oficial. O uso continuado dos serviços após as modificações
                            constitui aceitação dos novos termos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Rescisão</h2>
                        <p className="text-gray-400 mb-4">
                            O SPRP pode suspender ou encerrar seu acesso aos serviços a qualquer momento, por qualquer motivo,
                            incluindo violação destes Termos de Uso. Você também pode encerrar sua conta a qualquer momento
                            através do Discord.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Limitação de Responsabilidade</h2>
                        <p className="text-gray-400 mb-4">
                            O SPRP é fornecido "como está", sem garantias de qualquer tipo. Não nos responsabilizamos por
                            perdas de dados, interrupções de serviço ou quaisquer danos diretos ou indiretos decorrentes
                            do uso de nossos serviços.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Contato</h2>
                        <p className="text-gray-400 mb-4">
                            Para dúvidas sobre estes Termos de Uso, entre em contato através do nosso Discord oficial
                            ou pelo e-mail: <a href="mailto:contato@sprp.gg" className="text-sprp-neon-blue hover:underline">contato@sprp.gg</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermosDeUso;
