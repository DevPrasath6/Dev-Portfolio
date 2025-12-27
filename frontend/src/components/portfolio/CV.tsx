import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Trophy, 
  Download, 
  Calendar, 
  MapPin, 
  Award,
  Star,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import type { Certification } from "./Certifications";

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  achievements?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "award" | "recognition" | "publication" | "other";
}

interface CVProps {
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
}

export function CV({ education, certifications, achievements }: CVProps) {
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
            Curriculum Vitae
          </motion.span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            My <span className="text-gradient">Professional Journey</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            Education, achievements, and certifications
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl font-medium text-sm text-white shadow-lg shadow-purple-500/25"
          >
            <Download className="w-4 h-4" />
            Download Full CV
          </motion.button>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-display font-semibold">Education</h2>
          </div>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-5 hover:bg-purple-500/5 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-purple-400 text-sm font-medium">{edu.institution}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-lg">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-lg">
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{edu.field}</p>
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement) => (
                      <span key={achievement} className="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full">
                        {achievement}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-display font-semibold">Achievements</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const typeIcons = {
                award: Trophy,
                recognition: Star,
                publication: ExternalLink,
                other: Award,
              };
              const Icon = typeIcons[achievement.type];

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-4 hover:bg-purple-500/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground mb-1">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1.5">{achievement.description}</p>
                      <span className="text-xs text-muted-foreground/70">{achievement.date}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-display font-semibold">Certifications</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl p-4 hover:bg-purple-500/5 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground mb-1">{cert.name}</h4>
                    <p className="text-xs text-purple-400 mb-1">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground/70">{cert.date}</p>
                  </div>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-purple-400" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 glass rounded-2xl p-6"
        >
          <h3 className="text-base font-semibold mb-4 text-center">Career Highlights</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: "7+", label: "Years Experience" },
              { value: "100+", label: "Projects" },
              { value: "15+", label: "Certifications" },
              { value: "50+", label: "Clients" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl bg-background/50">
                <div className="text-xl font-display font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
