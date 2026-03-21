import { useEffect, useState } from "react";
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

    useEffect(() => {
        const metaDescription = document.querySelector('meta[name="description"]');

        const seoByPage: Record<ActivePage, { title: string; description: string }> = {
            home: {
                title: `${data.hero.name} | ${data.hero.title}`,
                description: data.hero.subtitle,
            },
            cv: {
                title: `${data.hero.name} | CV & Certifications`,
                description: "Education, achievements, and professional certifications.",
            },
            experience: {
                title: `${data.hero.name} | Work Experience`,
                description: "Career journey, roles, and impact across projects and teams.",
            },
            projects: {
                title: `${data.hero.name} | Projects Portfolio`,
                description: "Selected full stack projects with modern technologies and real-world impact.",
            },
            contact: {
                title: `${data.hero.name} | Contact`,
                description: "Get in touch for freelance work, collaborations, and project opportunities.",
            },
        };

        document.title = seoByPage[activePage].title;
        if (metaDescription) {
            metaDescription.setAttribute("content", seoByPage[activePage].description);
        }
    }, [activePage, data.hero.name, data.hero.title, data.hero.subtitle]);

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
                        <Contact
                            email={data.contact.email}
                            location={data.contact.location}
                            linkedin={data.contact.linkedin}
                            github={data.contact.github}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Index;
