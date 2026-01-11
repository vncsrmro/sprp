import {
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Globe,
    Heart
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Footer link data adapted for SPRP
    const footerLinks = [
        {
            title: "Cidade",
            links: [
                { label: "Início", href: "/" },
                { label: "Sobre São Paulo", href: "#sobre" },
                { label: "Galeria de Fotos", href: "#galeria" },
                { label: "Comunidade", href: "https://discord.gg/pj2fQNqU" },
            ],
        },
        {
            title: "Suporte",
            links: [
                { label: "Discord", href: "https://discord.gg/pj2fQNqU" },
                { label: "Regras", href: "#" },
                {
                    label: "Tickets Open",
                    href: "#",
                    pulse: true,
                },
            ],
        },
    ];

    // Contact info data
    const contactInfo = [
        {
            icon: <Mail size={18} className="text-[#3ca2fa]" />,
            text: "contato@sprp.lat",
            href: "mailto:contato@sprp.lat",
        },
        {
            icon: <MapPin size={18} className="text-[#3ca2fa]" />,
            text: "São Paulo, Brasil",
        },
    ];

    // Social media icons
    const socialLinks = [
        { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
        { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
        { icon: <Globe size={20} />, label: "Globe", href: "#" },
    ];

    return (
        <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8 border border-white/[0.05]">
            <div className="max-w-7xl mx-auto p-14 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
                    {/* Brand section */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-3">
                            <img src="/sprp-logo.png" alt="SPRP" className="w-10 h-auto" />
                            <span className="text-white text-3xl font-bold">SPRP</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            O servidor de GTA RP mais imersivo de São Paulo.
                            Viva experiências únicas na maior metrópole do Brasil.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white text-lg font-semibold mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative">
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-[#3ca2fa] transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                        {link.pulse && (
                                            <span className="absolute top-1 right-[-14px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact section */}
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-6">
                            Contato
                        </h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-center space-x-3">
                                    {item.icon}
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-gray-400 hover:text-[#3ca2fa] transition-colors"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">
                                            {item.text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="border-t border-gray-800 my-8" />

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
                    {/* Social icons */}
                    <div className="flex space-x-6 text-gray-500">
                        {socialLinks.map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="hover:text-[#3ca2fa] transition-colors"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>

                    {/* Copyright & Branding */}
                    <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400">
                        <p>&copy; {currentYear} SPRP. Todos os direitos reservados.</p>
                        <span className="hidden md:inline text-gray-700">|</span>
                        <p className="flex items-center gap-1.5">
                            Desenvolvido com
                            <Heart size={14} className="text-red-500 fill-current" />
                            pela
                            <a
                                href="https://inovasys.digital"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors underline underline-offset-2"
                            >
                                InovaSys
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Text hover effect */}
            <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
                <TextHoverEffect text="SPRP" className="z-50" />
            </div>

            <FooterBackgroundGradient />
        </footer>
    );
}
