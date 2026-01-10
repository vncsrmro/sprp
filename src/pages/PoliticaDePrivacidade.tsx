import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PoliticaDePrivacidade = () => {
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
                    Política de <span className="text-sprp-neon-blue">Privacidade</span>
                </h1>

                <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-6">
                        <strong>Última atualização:</strong> Janeiro de 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Introdução</h2>
                        <p className="text-gray-400 mb-4">
                            O SPRP (São Paulo Roleplay) está comprometido em proteger sua privacidade. Esta Política de
                            Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais
                            quando você utiliza nossos serviços.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Informações que Coletamos</h2>
                        <p className="text-gray-400 mb-4">
                            Podemos coletar os seguintes tipos de informações:
                        </p>
                        <h3 className="text-xl font-semibold text-white mb-3">2.1 Informações fornecidas por você:</h3>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2 mb-4">
                            <li>Nome de usuário e identificadores do Discord</li>
                            <li>Informações de personagem no jogo</li>
                            <li>Respostas do formulário de whitelist</li>
                            <li>Comunicações com nossa equipe de suporte</li>
                        </ul>
                        <h3 className="text-xl font-semibold text-white mb-3">2.2 Informações coletadas automaticamente:</h3>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Endereço IP e identificadores do FiveM</li>
                            <li>Logs de conexão e tempo de jogo</li>
                            <li>Dados de performance e relatórios de erro</li>
                            <li>Informações do dispositivo e navegador (ao acessar o website)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Como Usamos suas Informações</h2>
                        <p className="text-gray-400 mb-4">
                            Utilizamos suas informações para:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Fornecer e manter nossos serviços</li>
                            <li>Processar e aprovar solicitações de whitelist</li>
                            <li>Moderar o servidor e aplicar as regras</li>
                            <li>Detectar e prevenir fraudes, cheats e abusos</li>
                            <li>Enviar comunicações importantes sobre o servidor</li>
                            <li>Melhorar nossos serviços e experiência do usuário</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Compartilhamento de Informações</h2>
                        <p className="text-gray-400 mb-4">
                            Não vendemos suas informações pessoais. Podemos compartilhar informações limitadas:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Com a equipe de administração e moderação do SPRP</li>
                            <li>Com provedores de serviço (hospedagem, Discord) conforme necessário</li>
                            <li>Quando exigido por lei ou para proteger direitos legais</li>
                            <li>Com seu consentimento explícito</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Segurança dos Dados</h2>
                        <p className="text-gray-400 mb-4">
                            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações,
                            incluindo:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Criptografia de dados sensíveis</li>
                            <li>Acesso restrito a informações pessoais</li>
                            <li>Backups regulares e seguros</li>
                            <li>Monitoramento de segurança contínuo</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Retenção de Dados</h2>
                        <p className="text-gray-400 mb-4">
                            Mantemos suas informações pelo tempo necessário para fornecer nossos serviços ou conforme
                            exigido por lei. Dados de jogadores inativos por mais de 12 meses podem ser arquivados ou
                            removidos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Seus Direitos</h2>
                        <p className="text-gray-400 mb-4">
                            Você tem direito a:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li>Acessar suas informações pessoais</li>
                            <li>Corrigir informações incorretas</li>
                            <li>Solicitar exclusão de seus dados</li>
                            <li>Retirar seu consentimento</li>
                            <li>Receber seus dados em formato portável</li>
                        </ul>
                        <p className="text-gray-400 mt-4">
                            Para exercer esses direitos, entre em contato conosco através do Discord ou e-mail.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Cookies e Tecnologias Similares</h2>
                        <p className="text-gray-400 mb-4">
                            Nosso website pode utilizar cookies para melhorar sua experiência. Você pode configurar
                            seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Menores de Idade</h2>
                        <p className="text-gray-400 mb-4">
                            Nossos serviços são destinados a maiores de 16 anos. Não coletamos intencionalmente
                            informações de menores de 16 anos sem consentimento dos responsáveis.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">10. Alterações nesta Política</h2>
                        <p className="text-gray-400 mb-4">
                            Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas
                            através do Discord. A data de "última atualização" no topo indica quando a política foi
                            revisada pela última vez.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">11. Contato</h2>
                        <p className="text-gray-400 mb-4">
                            Para questões sobre privacidade, entre em contato:
                        </p>
                        <ul className="list-none text-gray-400 space-y-2">
                            <li><strong>E-mail:</strong> <a href="mailto:privacidade@sprp.gg" className="text-sprp-neon-blue hover:underline">privacidade@sprp.gg</a></li>
                            <li><strong>Discord:</strong> <a href="https://discord.gg/pj2fQNqU" target="_blank" rel="noopener noreferrer" className="text-sprp-neon-blue hover:underline">discord.gg/pj2fQNqU</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PoliticaDePrivacidade;
