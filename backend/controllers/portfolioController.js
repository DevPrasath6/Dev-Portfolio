import Hero from '../models/Hero.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import Testimonial from '../models/Testimonial.js';
import Contact from '../models/Contact.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';

// ==================== PUBLIC ROUTES ====================

// @desc    Get all portfolio data (public)
// @route   GET /api/portfolio
// @access  Public
export const getPortfolio = async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 });
    const projectsRaw = await Project.find().sort({ order: 1, createdAt: -1 });
    const projects = projectsRaw.map(p => ({
      id: p._id,
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      tags: Array.isArray(p.tags) ? p.tags : [],
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl
    }));
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    const skills = await Skill.find();
    const testimonials = await Testimonial.find();
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    const certifications = await Certification.find().sort({ createdAt: -1 });

    res.json({
      hero,
      projects,
      experiences,
      skills,
      testimonials,
      contact,
      education,
      certifications
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================== HERO ====================

export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne({ userId: req.user._id });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateHero = async (req, res) => {
  try {
    let hero = await Hero.findOne({ userId: req.user._id });

    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, req.body, { new: true });
    } else {
      hero = await Hero.create({ ...req.body, userId: req.user._id });
    }

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================== PROJECTS ====================

export const getProjects = async (req, res) => {
  try {
    const projectsRaw = await Project.find({ userId: req.user._id }).sort({ order: 1 });
    const projects = projectsRaw.map(p => ({
      id: p._id,
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      tags: Array.isArray(p.tags) ? p.tags : [],
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl
    }));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, userId: req.user._id });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================== EXPERIENCES ====================

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ userId: req.user._id }).sort({ order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create({ ...req.body, userId: req.user._id });
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================== SKILLS ====================

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.user._id });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create({ ...req.body, userId: req.user._id });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================== TESTIMONIALS ====================

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ userId: req.user._id });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create({ ...req.body, userId: req.user._id });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================== CONTACT ====================

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ userId: req.user._id });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    let contact = await Contact.findOne({ userId: req.user._id });

    if (contact) {
      contact = await Contact.findByIdAndUpdate(contact._id, req.body, { new: true });
    } else {
      contact = await Contact.create({ ...req.body, userId: req.user._id });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================== EDUCATION ====================

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find({ userId: req.user._id }).sort({ order: 1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const education = await Education.create({ ...req.body, userId: req.user._id });
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.json({ message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================== CERTIFICATIONS ====================

export const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find({ userId: req.user._id });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createCertification = async (req, res) => {
  try {
    const certification = await Certification.create({ ...req.body, userId: req.user._id });
    res.status(201).json(certification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateCertification = async (req, res) => {
  try {
    const certification = await Certification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json(certification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json({ message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
