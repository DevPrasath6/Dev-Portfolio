import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import type { ActivePage } from "@/pages/Index";
import { InfiniteCarousel } from "./InfiniteCarousel";
import { Certifications, Certification } from "./Certifications";

interface HeroProps {
  name: string;
  title: string;
  subtitle: string;
  setActivePage: (page: ActivePage) => void;
  certifications: Certification[];
}

export function Hero({ name, title, subtitle, setActivePage, certifications }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { value: "7+", label: "Years Experience" },
    { value: "100+", label: "Projects Delivered" },
    { value: "50+", label: "Happy Clients" },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
        {/* Floating shapes */}
        <motion.div
          animate={{ rotate: 360, x: mousePosition.x * 30, y: mousePosition.y * 30 }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
          className="absolute top-1/4 right-1/4 w-32 h-32 border border-purple-500/20 rounded-lg"
        />
        <motion.div
          animate={{ rotate: -360, x: mousePosition.x * -20, y: mousePosition.y * -20 }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" } }}
          className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-violet-500/20 rounded-full"
        />

        <div className="text-center max-w-6xl mx-auto relative z-10">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-muted-foreground">Available for Freelance Projects</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight">
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-gradient">{name}</span>
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-display font-semibold text-foreground/80 mb-6"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <motion.button
              onClick={() => setActivePage("projects")}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -15px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 flex items-center gap-3"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              onClick={() => setActivePage("contact")}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl font-semibold border-2 border-purple-500/30 hover:border-purple-500/50 transition-colors"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-purple-400 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Infinite Tech Carousel */}
      <InfiniteCarousel />

      {/* Certifications Section */}
      <Certifications certifications={certifications} />
    </div>
  );
}
