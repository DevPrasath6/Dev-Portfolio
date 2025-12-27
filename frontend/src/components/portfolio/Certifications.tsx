import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

interface CertificationsProps {
  certifications: Certification[];
}

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="group relative"
  >
    <div className="glass rounded-2xl p-6 h-full hover:bg-purple-500/5 transition-all duration-300">
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-violet-500/30 transition-all">
        <Award className="w-7 h-7 text-purple-400" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-purple-400 transition-colors">
        {cert.name}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <Calendar className="w-3.5 h-3.5" />
        <span>{cert.date}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {cert.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full flex items-center gap-1"
          >
            <CheckCircle className="w-3 h-3" />
            {skill}
          </span>
        ))}
      </div>

      {/* Credential link */}
      {cert.credentialUrl && (
        <motion.a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 3 }}
          className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          View Credential
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      )}
    </div>

    {/* Hover glow */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
  </motion.div>
);

export function Certifications({ certifications }: CertificationsProps) {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
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
            className="inline-block px-5 py-2 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4"
          >
            Certifications
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Professional <span className="text-gradient">Credentials</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
