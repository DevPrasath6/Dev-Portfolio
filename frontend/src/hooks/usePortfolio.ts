import { useState, useEffect } from 'react';
import { portfolioApi } from '@/lib/api';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  description?: string;
  order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  expiryDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'recognition' | 'publication' | 'other';
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
  };
  about: {
    bio: string;
    image?: string;
  };
  skills: Skill[];
  experiences: ExperienceItem[];
  projects: Project[];
  testimonials: Testimonial[];
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
  };
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
}

const defaultData: PortfolioData = {
  hero: {
    name: "Dev Prasath",
    title: "Full Stack Developer",
    subtitle: "I craft beautiful digital experiences with code and creativity, turning ideas into powerful web applications",
  },
  about: {
    bio: "I'm a passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in React, TypeScript, and Node.js, with a keen eye for design and user experience. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
  },
  skills: [
    { name: "React", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Frontend" },
    { name: "Tailwind CSS", level: 92, category: "Frontend" },
    { name: "Node.js", level: 88, category: "Backend" },
    { name: "PostgreSQL", level: 85, category: "Backend" },
    { name: "MongoDB", level: 82, category: "Backend" },
    { name: "Figma", level: 78, category: "Design" },
    { name: "UI/UX Design", level: 75, category: "Design" },
    { name: "Adobe XD", level: 70, category: "Design" },
  ],
  experiences: [],
  projects: [],
  testimonials: [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechStart Inc.",
      content: "Working with this developer was an absolute pleasure. They delivered our project on time and exceeded all expectations. Their attention to detail is remarkable.",
      rating: 5,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateCo",
      content: "Exceptional technical skills combined with great communication. They understood our vision and transformed it into a beautiful, functional product.",
      rating: 5,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Founder",
      company: "DesignHub",
      content: "The best developer I've worked with. They brought creative solutions to complex problems and were always available when we needed them.",
      rating: 5,
    },
  ],
  contact: {
    email: "devprasatha9@gmail.com",
    linkedin: "https://linkedin.com/in/devprasatha9",
    github: "https://github.com/DevPrasath6",
  },
  education: [],
  certifications: [],
  achievements: [],
};

const STORAGE_KEY = 'portfolio-data';

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolio data from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const portfolioData = await portfolioApi.getAll();

        // Transform backend data to match frontend structure
        const transformedData: PortfolioData = {
          hero: portfolioData.hero || defaultData.hero,
          about: {
            bio: portfolioData.hero?.bio || defaultData.about.bio,
            image: portfolioData.hero?.image || defaultData.about.image,
          },
          skills: portfolioData.skills || defaultData.skills,
          experiences: portfolioData.experiences || defaultData.experiences,
          projects: portfolioData.projects || defaultData.projects,
          testimonials: portfolioData.testimonials || defaultData.testimonials,
          contact: portfolioData.contact || defaultData.contact,
          education: portfolioData.education?.map(e => ({ ...e, id: e._id })) || defaultData.education,
          certifications: portfolioData.certifications?.map(c => ({ ...c, id: c._id })) || defaultData.certifications,
          achievements: portfolioData.achievements?.map(a => ({ ...a, id: a._id })) || defaultData.achievements,
        };

        setData(transformedData);
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        // Fall back to localStorage if available
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setData({ ...defaultData, ...parsed });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Also save to localStorage as backup
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, loading]);

  const updateHero = async (hero: PortfolioData['hero']) => {
    try {
      await portfolioApi.admin.updateHero(hero);
      setData(prev => ({ ...prev, hero }));
    } catch (err) {
      console.error('Failed to update hero:', err);
      throw err;
    }
  };

  const updateAbout = async (about: PortfolioData['about']) => {
    try {
      // About data is stored in hero on backend
      await portfolioApi.admin.updateHero({ ...data.hero, bio: about.bio, image: about.image });
      setData(prev => ({ ...prev, about }));
    } catch (err) {
      console.error('Failed to update about:', err);
      throw err;
    }
  };

  const updateSkills = async (skills: Skill[]) => {
    try {
      // Update all skills - this might need backend adjustment
      setData(prev => ({ ...prev, skills }));
    } catch (err) {
      console.error('Failed to update skills:', err);
      throw err;
    }
  };

  const updateExperiences = async (experiences: ExperienceItem[]) => {
    try {
      setData(prev => ({ ...prev, experiences }));
    } catch (err) {
      console.error('Failed to update experiences:', err);
      throw err;
    }
  };

    // Update a single experience by ID
    const updateExperience = async (id: string, updates: Partial<ExperienceItem>) => {
      try {
        const updated = await portfolioApi.admin.updateExperience(id, updates);
        setData(prev => ({
          ...prev,
          experiences: prev.experiences.map(e => e.id === id ? { ...e, ...updated } : e),
        }));
        return updated;
      } catch (err) {
        console.error('Failed to update experience:', err);
        throw err;
      }
    };

  const updateTestimonials = async (testimonials: Testimonial[]) => {
    try {
      setData(prev => ({ ...prev, testimonials }));
    } catch (err) {
      console.error('Failed to update testimonials:', err);
      throw err;
    }
  };

  const updateContact = async (contact: PortfolioData['contact']) => {
    try {
      await portfolioApi.admin.updateContact(contact);
      setData(prev => ({ ...prev, contact }));
    } catch (err) {
      console.error('Failed to update contact:', err);
      throw err;
    }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      const newProject = await portfolioApi.admin.createProject(project);
      setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
      return newProject;
    } catch (err) {
      console.error('Failed to add project:', err);
      throw err;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      await portfolioApi.admin.updateProject(id, updates);
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p),
      }));
    } catch (err) {
      console.error('Failed to update project:', err);
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await portfolioApi.admin.deleteProject(id);
      setData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete project:', err);
      throw err;
    }
  };

  const addExperience = async (experience: Omit<ExperienceItem, 'id'>) => {
    try {
      const newExperience = await portfolioApi.admin.createExperience(experience);
      setData(prev => ({ ...prev, experiences: [...prev.experiences, newExperience] }));
      return newExperience;
    } catch (err) {
      console.error('Failed to add experience:', err);
      throw err;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await portfolioApi.admin.deleteExperience(id);
      setData(prev => ({
        ...prev,
        experiences: prev.experiences.filter(e => e.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete experience:', err);
      throw err;
    }
  };

  const addSkill = async (skill: Skill) => {
    try {
      const newSkill = await portfolioApi.admin.createSkill(skill);
      setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      return newSkill;
    } catch (err) {
      console.error('Failed to add skill:', err);
      throw err;
    }
  };

  const deleteSkill = async (name: string) => {
    try {
      // Find the skill ID first (backend uses ID, not name)
      const skill = data.skills.find(s => s.name === name);
      if (skill && 'id' in skill) {
        await portfolioApi.admin.deleteSkill((skill as any).id);
      }
      setData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s.name !== name),
      }));
    } catch (err) {
      console.error('Failed to delete skill:', err);
      throw err;
    }
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    try {
      const newTestimonial = await portfolioApi.admin.createTestimonial(testimonial);
      setData(prev => ({ ...prev, testimonials: [...prev.testimonials, newTestimonial] }));
      return newTestimonial;
    } catch (err) {
      console.error('Failed to add testimonial:', err);
      throw err;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await portfolioApi.admin.deleteTestimonial(id);
      setData(prev => ({
        ...prev,
        testimonials: prev.testimonials.filter(t => t.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
      throw err;
    }
  };

  // Education CRUD
  const addEducation = async (education: Omit<Education, 'id'>) => {
    try {
      const newEducation = await portfolioApi.admin.createEducation(education);
      setData(prev => ({ ...prev, education: [...prev.education, newEducation] }));
      return newEducation;
    } catch (err) {
      console.error('Failed to add education:', err);
      throw err;
    }
  };

  const updateEducation = async (id: string, education: Partial<Education>) => {
    try {
      const updatedEducation = await portfolioApi.admin.updateEducation(id, education);
      setData(prev => ({
        ...prev,
        education: prev.education.map(e => e.id === id ? updatedEducation : e),
      }));
      return updatedEducation;
    } catch (err) {
      console.error('Failed to update education:', err);
      throw err;
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      await portfolioApi.admin.deleteEducation(id);
      setData(prev => ({
        ...prev,
        education: prev.education.filter(e => e.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete education:', err);
      throw err;
    }
  };

  // Certifications CRUD
  const addCertification = async (certification: Omit<Certification, 'id'>) => {
    try {
      const newCertification = await portfolioApi.admin.createCertification(certification);
      setData(prev => ({ ...prev, certifications: [...prev.certifications, newCertification] }));
      return newCertification;
    } catch (err) {
      console.error('Failed to add certification:', err);
      throw err;
    }
  };

  const updateCertification = async (id: string, certification: Partial<Certification>) => {
    try {
      const updatedCertification = await portfolioApi.admin.updateCertification(id, certification);
      setData(prev => ({
        ...prev,
        certifications: prev.certifications.map(c => c.id === id ? updatedCertification : c),
      }));
      return updatedCertification;
    } catch (err) {
      console.error('Failed to update certification:', err);
      throw err;
    }
  };

  const deleteCertification = async (id: string) => {
    try {
      await portfolioApi.admin.deleteCertification(id);
      setData(prev => ({
        ...prev,
        certifications: prev.certifications.filter(c => c.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete certification:', err);
      throw err;
    }
  };

  // Achievements CRUD
  const addAchievement = async (achievement: Omit<Achievement, 'id'>) => {
    try {
      const newAchievement = await portfolioApi.admin.createAchievement(achievement);
      setData(prev => ({ ...prev, achievements: [...prev.achievements, newAchievement] }));
      return newAchievement;
    } catch (err) {
      console.error('Failed to add achievement:', err);
      throw err;
    }
  };

  const updateAchievement = async (id: string, achievement: Partial<Achievement>) => {
    try {
      const updatedAchievement = await portfolioApi.admin.updateAchievement(id, achievement);
      setData(prev => ({
        ...prev,
        achievements: prev.achievements.map(a => a.id === id ? updatedAchievement : a),
      }));
      return updatedAchievement;
    } catch (err) {
      console.error('Failed to update achievement:', err);
      throw err;
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      await portfolioApi.admin.deleteAchievement(id);
      setData(prev => ({
        ...prev,
        achievements: prev.achievements.filter(a => a.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete achievement:', err);
      throw err;
    }
  };

  const setExperiences = (experiences: ExperienceItem[]) => {
    setData(prev => ({ ...prev, experiences }));
  };

  const setProjects = (projects: Project[]) => {
    setData(prev => ({ ...prev, projects }));
  };

  return {
    data,
    loading,
    error,
    updateHero,
    updateAbout,
    updateSkills,
    updateExperience,
    updateTestimonials,
    updateContact,
    addProject,
    updateProject,
    deleteProject,
    setProjects,
    addExperience,
    deleteExperience,
    setExperiences,
    addSkill,
    deleteSkill,
    addTestimonial,
    deleteTestimonial,
    addEducation,
    updateEducation,
    deleteEducation,
    addCertification,
    updateCertification,
    deleteCertification,
    addAchievement,
    updateAchievement,
    deleteAchievement,
  };
}
