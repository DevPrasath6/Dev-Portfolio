import { useState } from "react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { CV } from "@/components/portfolio/CV";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { usePortfolio } from "@/hooks/usePortfolio";
import { AnimatePresence, motion } from "framer-motion";
import { Footer } from "@/components/portfolio/Footer";

export type ActivePage = "home" | "cv" | "experience" | "projects" | "contact";

const Index = () => {
    const { data } = usePortfolio();
    const [activePage, setActivePage] = useState<ActivePage>("home");

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <AnimatedBackground />
            <Navbar activePage={activePage} setActivePage={setActivePage} />

            <AnimatePresence mode="wait">
                {activePage === "home" && (
                    <motion.div key="home" variants={pageVariants} initial="initial" animate="enter" exit="exit">
                        <Hero
                            name={data.hero.name}
                            title={data.hero.title}
                            subtitle={data.hero.subtitle}
                            badgeText={data.hero.description}
                            setActivePage={setActivePage}
                            certifications={data.certifications}
                            email={data.contact.email}
                            linkedin={data.contact.linkedin}
                            github={data.contact.github}
                            stats={data.stats}
                        />
                        <Footer
                            email={data.contact.email}
                            linkedin={data.contact.linkedin}
                            github={data.contact.github}
                        />
                    </motion.div>
                )}

                {activePage === "cv" && (
                    <motion.div key="cv" variants={pageVariants} initial="initial" animate="enter" exit="exit">
                        <CV
                            education={data.education}
                            certifications={data.certifications}
                            achievements={data.achievements}
                            stats={data.stats}
                        />
                    </motion.div>
                )}

                {activePage === "experience" && (
                    <motion.div key="experience" variants={pageVariants} initial="initial" animate="enter" exit="exit">
                        <Experience experiences={data.experiences} />
                    </motion.div>
                )}

                {activePage === "projects" && (
                    <motion.div key="projects" variants={pageVariants} initial="initial" animate="enter" exit="exit">
                        <Projects projects={data.projects} />
                    </motion.div>
                )}

                {activePage === "contact" && (
                    <motion.div key="contact" variants={pageVariants} initial="initial" animate="enter" exit="exit">
                        <Contact email={data.contact.email} linkedin={data.contact.linkedin} github={data.contact.github} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Index;
