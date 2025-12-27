import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Folder } from "lucide-react";
import type { Project } from "@/hooks/usePortfolio";

interface ProjectsProps {
  projects: Project[];
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    className="group relative"
  >
    <div className="glass rounded-2xl overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
        
        {/* Overlay links */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/90 text-background flex items-center justify-center shadow-lg"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/90 text-background flex items-center justify-center shadow-lg"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-display font-bold text-foreground group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </div>
        
        <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-3 border-t border-border/50">
          <motion.a
            href={project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2 rounded-lg glass flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-purple-500/10 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </motion.a>
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white flex items-center justify-center gap-1.5 text-xs font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </motion.a>
          )}
        </div>
      </div>
    </div>

    {/* Hover glow */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
  </motion.div>
);

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="min-h-screen py-20 px-6 pt-24 relative">
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
            Portfolio
          </motion.span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            A showcase of my work in building modern web applications
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View more */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl font-medium text-sm hover:bg-purple-500/10 transition-colors group"
          >
            <Folder className="w-4 h-4" />
            View More on GitHub
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
