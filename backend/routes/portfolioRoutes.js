import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getPortfolio,
  getHero, updateHero,
  getProjects, createProject, updateProject, deleteProject,
  getExperiences, createExperience, updateExperience, deleteExperience,
  getSkills, createSkill, updateSkill, deleteSkill,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getContact, updateContact,
  getEducation, createEducation, updateEducation, deleteEducation,
  getCertifications, createCertification, updateCertification, deleteCertification
} from '../controllers/portfolioController.js';

const router = express.Router();

// ==================== PUBLIC ROUTES ====================
router.get('/', getPortfolio);

// ==================== PROTECTED ADMIN ROUTES ====================

// Hero
router.route('/admin/hero')
  .get(protect, adminOnly, getHero)
  .put(protect, adminOnly, updateHero);

// Projects
router.route('/admin/projects')
  .get(protect, adminOnly, getProjects)
  .post(protect, adminOnly, createProject);

router.route('/admin/projects/:id')
  .put(protect, adminOnly, updateProject)
  .delete(protect, adminOnly, deleteProject);

// Experiences
router.route('/admin/experiences')
  .get(protect, adminOnly, getExperiences)
  .post(protect, adminOnly, createExperience);

router.route('/admin/experiences/:id')
  .put(protect, adminOnly, updateExperience)
  .delete(protect, adminOnly, deleteExperience);

// Skills
router.route('/admin/skills')
  .get(protect, adminOnly, getSkills)
  .post(protect, adminOnly, createSkill);

router.route('/admin/skills/:id')
  .put(protect, adminOnly, updateSkill)
  .delete(protect, adminOnly, deleteSkill);

// Testimonials
router.route('/admin/testimonials')
  .get(protect, adminOnly, getTestimonials)
  .post(protect, adminOnly, createTestimonial);

router.route('/admin/testimonials/:id')
  .put(protect, adminOnly, updateTestimonial)
  .delete(protect, adminOnly, deleteTestimonial);

// Contact
router.route('/admin/contact')
  .get(protect, adminOnly, getContact)
  .put(protect, adminOnly, updateContact);

// Education
router.route('/admin/education')
  .get(protect, adminOnly, getEducation)
  .post(protect, adminOnly, createEducation);

router.route('/admin/education/:id')
  .put(protect, adminOnly, updateEducation)
  .delete(protect, adminOnly, deleteEducation);

// Certifications
router.route('/admin/certifications')
  .get(protect, adminOnly, getCertifications)
  .post(protect, adminOnly, createCertification);

router.route('/admin/certifications/:id')
  .put(protect, adminOnly, updateCertification)
  .delete(protect, adminOnly, deleteCertification);

export default router;
