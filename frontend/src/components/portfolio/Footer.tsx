import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

interface FooterProps {
  email?: string;
  linkedin?: string;
  github?: string;
}

export function Footer({ email, linkedin, github }: FooterProps) {
  const currentYear = new Date().getFullYear();

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
      className="py-8 px-6 border-t border-border/50"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          © {currentYear} Made with <Heart className="w-3 h-3 text-red-400" /> All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
