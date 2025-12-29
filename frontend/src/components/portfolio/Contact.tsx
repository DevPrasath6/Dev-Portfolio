import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, MapPin, Clock, ArrowUpRight } from "lucide-react";

interface ContactProps {
    email: string;
    linkedin?: string;
    github?: string;
}

export function Contact({ email, linkedin, github }: ContactProps) {
    const contactMethods = [
        {
            icon: Mail,
            label: "Email",
            value: email,
            href: `mailto:${email}`,
            description: "Send me an email anytime",
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            value: "Connect with me",
            href: linkedin || "#",
            description: "Let's connect professionally",
        },
        {
            icon: Github,
            label: "GitHub",
            value: "View my code",
            href: github || "#",
            description: "Check out my repositories",
        },
    ];

    return (
        <section className="min-h-screen py-20 px-6 pt-24 relative">
            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4"
                    >
                        Get In Touch
                    </motion.span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                        Let's Work <span className="text-gradient">Together</span>
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                        Have a project in mind? Let's discuss how we can bring your ideas to life
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Quick info */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-lg font-display font-semibold mb-4">Contact Information</h2>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Location</p>
                                        <p className="text-sm font-medium text-foreground">Available Worldwide (Remote)</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Response Time</p>
                                        <p className="text-sm font-medium text-foreground">Within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact methods */}
                        <div className="space-y-3">
                            {contactMethods.map((method, index) => (
                                <motion.a
                                    key={method.label}
                                    href={method.href}
                                    target={method.label !== "Email" ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    className="glass rounded-xl p-4 flex items-center gap-3 group hover:bg-purple-500/5 transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-violet-500/30 transition-all">
                                        <method.icon className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-muted-foreground">{method.label}</p>
                                        <p className="text-sm font-medium text-foreground group-hover:text-purple-400 transition-colors">
                                            {method.value}
                                        </p>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-lg font-display font-semibold mb-4">Send a Message</h2>

                            <form className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-3 py-2.5 text-sm rounded-lg bg-background/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-3 py-2.5 text-sm rounded-lg bg-background/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Project Inquiry"
                                        className="w-full px-3 py-2.5 text-sm rounded-lg bg-background/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell me about your project..."
                                        className="w-full px-3 py-2.5 text-sm rounded-lg bg-background/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
