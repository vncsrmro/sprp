import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-sprp-darker border-t border-white/10 py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/sprp-logo.png" alt="SPRP" className="w-12 h-auto" />
                            <span className="font-display text-2xl font-bold text-white">SPRP</span>
                        </div>
                        <p className="text-gray-400 max-w-md">
                            O melhor servidor de GTA RP do Brasil. Junte-se a milhares de jogadores
                            e viva experiências únicas em São Paulo.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Links Úteis</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="https://discord.gg/sprp" target="_blank" rel="noopener noreferrer" className="hover:text-sprp-neon-blue transition-colors">
                                    Discord
                                </a>
                            </li>
                            <li>
                                <a href="#sobre" className="hover:text-sprp-neon-blue transition-colors">
                                    Sobre
                                </a>
                            </li>
                            <li>
                                <a href="https://discord.gg/sprp" target="_blank" rel="noopener noreferrer" className="hover:text-sprp-neon-blue transition-colors">
                                    Whitelist
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link to="/termosdeuso" className="hover:text-sprp-neon-blue transition-colors">
                                    Termos de Uso
                                </Link>
                            </li>
                            <li>
                                <Link to="/politicadeprivacidade" className="hover:text-sprp-neon-blue transition-colors">
                                    Política de Privacidade
                                </Link>
                            </li>
                            <li>
                                <Link to="/lgpd" className="hover:text-sprp-neon-blue transition-colors">
                                    LGPD
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social & Copyright */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <a
                                href="https://discord.gg/sprp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-sprp-neon-blue hover:shadow-neon-blue transition-all"
                            >
                                <MessageCircle size={20} />
                            </a>
                            <a
                                href="https://instagram.com/sprp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-sprp-neon-blue hover:shadow-neon-blue transition-all"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://youtube.com/sprp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-sprp-neon-blue hover:shadow-neon-blue transition-all"
                            >
                                <Youtube size={20} />
                            </a>
                        </div>

                        <div className="text-center md:text-right text-gray-400 text-sm">
                            <p>© {currentYear} SPRP - São Paulo Roleplay. Todos os direitos reservados.</p>
                            <p className="mt-1 flex items-center justify-center md:justify-end gap-1">
                                Desenvolvido com <Heart size={14} className="text-red-500" /> pela{' '}
                                <a
                                    href="https://inovasys.digital"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sprp-neon-blue hover:underline"
                                >
                                    InovaSys
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
