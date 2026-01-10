import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black border-t border-white/[0.04] py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-5">
                            <img src="/sprp-logo.png" alt="SPRP" className="w-10 h-auto" />
                            <span className="text-xl font-bold text-white">SPRP</span>
                        </div>
                        <p className="text-white/40 max-w-sm leading-relaxed">
                            O servidor de GTA RP mais imersivo de São Paulo.
                            Viva experiências únicas na maior metrópole do Brasil.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-5">Navegação</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Discord', href: 'https://discord.gg/pj2fQNqU', external: true },
                                { label: 'Whitelist', href: 'https://discord.gg/pj2fQNqU', external: true },
                                { label: 'Sobre', href: '#sobre', external: false },
                            ].map((link, i) => (
                                <li key={i}>
                                    {link.external ? (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/40 hover:text-white transition-colors duration-300"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <a
                                            href={link.href}
                                            className="text-white/40 hover:text-white transition-colors duration-300"
                                        >
                                            {link.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-5">Legal</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Termos de Uso', to: '/termosdeuso' },
                                { label: 'Privacidade', to: '/politicadeprivacidade' },
                                { label: 'LGPD', to: '/lgpd' },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.to}
                                        className="text-white/40 hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/[0.04]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-white/30">
                            © {currentYear} SPRP. Todos os direitos reservados.
                        </p>

                        <p className="text-sm text-white/30 flex items-center gap-1.5">
                            Desenvolvido com
                            <Heart size={14} className="text-red-500 fill-current" />
                            pela
                            <a
                                href="https://inovasys.digital"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/50 hover:text-white transition-colors duration-300 underline underline-offset-2"
                            >
                                InovaSys
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
