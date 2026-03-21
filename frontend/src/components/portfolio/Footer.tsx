import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code } from "lucide-react";

interface FooterProps {
    email?: string;
    linkedin?: string;
    github?: string;
}

export function Footer({ email, linkedin, github }: FooterProps) {
    const socialLinks = [
        { icon: Github, href: github || "#", label: "GitHub" },
        { icon: Linkedin, href: linkedin || "#", label: "LinkedIn" },
        { icon: Mail, href: `mailto:${email}`, label: "Email" },
    ];

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="py-6 px-6 border-t border-border/50 bg-gradient-to-b from-background to-background/80"
        >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                        <Code className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-sm sm:text-base font-display font-bold">
                        <span className="text-foreground">If it exists here, </span>
                        <span className="text-gradient">I built it.</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    {socialLinks.map((social) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg glass border border-purple-500/20 hover:border-purple-500/50 text-muted-foreground hover:text-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                            aria-label={social.label}
                        >
                            <social.icon className="w-4 h-4" />
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </motion.footer>
    );
}
