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
import { Certification } from "@/components/portfolio/Certifications";
import { Footer } from "@/components/portfolio/Footer";

export type ActivePage = "home" | "cv" | "experience" | "projects" | "contact";

// Default data
const defaultCertifications: Certification[] = [
    { id: "1", name: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2023", skills: ["Cloud Architecture", "AWS", "DevOps"], credentialUrl: "#" },
    { id: "2", name: "Google Cloud Professional", issuer: "Google Cloud", date: "2023", skills: ["GCP", "Kubernetes", "Cloud"], credentialUrl: "#" },
    { id: "3", name: "Meta Frontend Developer", issuer: "Meta", date: "2022", skills: ["React", "JavaScript", "UI/UX"], credentialUrl: "#" },
    { id: "4", name: "MongoDB Developer", issuer: "MongoDB University", date: "2022", skills: ["MongoDB", "NoSQL", "Database"], credentialUrl: "#" },
];

const defaultEducation: Education[] = [
    { id: "1", degree: "Master of Computer Science", field: "Software Engineering & AI", institution: "Stanford University", location: "California, USA", period: "2016 - 2018", gpa: "3.9/4.0", description: "Dean's List, Research Assistant", order: 1 },
    { id: "2", degree: "Bachelor of Computer Science", field: "Computer Science", institution: "MIT", location: "Massachusetts, USA", period: "2012 - 2016", gpa: "3.8/4.0", description: "Honors Graduate, Hackathon Winner", order: 2 },
];

const defaultAchievements: Achievement[] = [
    { id: "1", title: "Best Innovation Award", description: "Recognized for developing an AI-powered code review system", date: "2023", type: "award", order: 1 },
    { id: "2", title: "Open Source Contributor", description: "Top contributor to major React ecosystem libraries", date: "2022", type: "recognition", order: 2 },
    { id: "3", title: "Tech Conference Speaker", description: "Keynote speaker at ReactConf and NodeConf", date: "2023", type: "recognition", order: 3 },
    { id: "4", title: "Patent Holder", description: "Patent for real-time collaborative editing algorithm", date: "2021", type: "other", order: 4 },
];

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
                            setActivePage={setActivePage}
                            certifications={defaultCertifications}
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
