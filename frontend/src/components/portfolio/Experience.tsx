import { motion } from "framer-motion";
import { Briefcase, Calendar, ExternalLink, ArrowRight, Building2, Users, Code2, Zap } from "lucide-react";

interface ExperienceItem {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    current?: boolean;
}

interface ExperienceProps {
    experiences: ExperienceItem[];
}

export function Experience({ experiences }: ExperienceProps) {
    return (
        <section className="min-h-screen py-20 px-6 pt-24 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto relative z-10">
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
                        Career Journey
                    </motion.span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                        Work <span className="text-gradient">Experience</span>
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                        Building innovative solutions and leading high-performing teams
                    </p>
                </motion.div>

                {/* Experience Cards - Modern Grid Layout */}
                <div className="space-y-6">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500">
                                {/* Gradient border on hover */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-[1px] rounded-2xl bg-background" />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-violet-500/20" />
                                </div>

                                <div className="relative">
                                    {/* Top section */}
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 mb-4">
                                        {/* Company icon */}
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/25">
                                            <Building2 className="w-7 h-7 text-white" />
                                        </div>

                                        {/* Title and company */}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
                                                    {exp.title}
                                                </h3>
                                                {exp.current && (
                                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-purple-400 font-medium text-sm">{exp.company}</p>
                                        </div>

                                        {/* Period badge */}
                                        <div className="flex items-center gap-2 text-muted-foreground text-xs bg-background/50 px-3 py-2 rounded-lg shrink-0">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{exp.period}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                                        {exp.description}
                                    </p>

                                    {/* Skills/Responsibilities */}
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { icon: Code2, label: "Technical Leadership" },
                                            { icon: Users, label: "Team Management" },
                                            { icon: Zap, label: "System Architecture" },
                                        ].map((item) => (
                                            <div
                                                key={item.label}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-medium"
                                            >
                                                <item.icon className="w-3.5 h-3.5" />
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12"
                >
                    <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5" />

                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2">
                                Open for Opportunities
                            </h3>
                            <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                                Interested in collaborating or have a project in mind? Let's connect and create something amazing together.
                            </p>
                            <motion.a
                                href="https://drive.google.com/file/d/1hC_nFTpNjzJQzeTAvioZkKYfRajS9cSh/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl font-medium text-sm text-white shadow-lg shadow-purple-500/25 inline-flex items-center gap-2 group"
                            >
                                View Full Resume
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
