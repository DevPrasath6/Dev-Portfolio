import { motion } from "framer-motion";
import { TechLogos, TechName } from "./TechLogos";

const allTechs: TechName[] = [
  "React", "TypeScript", "NextJS", "Vue", "TailwindCSS", "NodeJS", 
  "Express", "Python", "PostgreSQL", "MongoDB", "Docker", "AWS", 
  "Git", "Redux", "GraphQL", "Firebase", "Vercel", "Supabase", 
  "Figma", "FramerMotion", "Redis"
];

export function InfiniteCarousel() {
  // Duplicate for seamless loop
  const duplicatedTechs = [...allTechs, ...allTechs];

  return (
    <section className="py-16 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-5 py-2 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4"
          >
            Tech Stack
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Technologies I <span className="text-gradient">Master</span>
          </h2>
        </motion.div>
      </div>

      {/* First row - left to right */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-8"
        >
          {duplicatedTechs.map((tech, index) => {
            const LogoComponent = TechLogos[tech];
            return (
              <div
                key={`${tech}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass flex items-center justify-center p-3 hover:bg-purple-500/10 transition-all duration-300 hover:scale-110">
                  <div className="w-full h-full text-muted-foreground group-hover:text-purple-400 transition-colors">
                    <LogoComponent />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Second row - right to left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex gap-8"
        >
          {[...duplicatedTechs].reverse().map((tech, index) => {
            const LogoComponent = TechLogos[tech];
            return (
              <div
                key={`${tech}-rev-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass flex items-center justify-center p-3 hover:bg-purple-500/10 transition-all duration-300 hover:scale-110">
                  <div className="w-full h-full text-muted-foreground group-hover:text-purple-400 transition-colors">
                    <LogoComponent />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
