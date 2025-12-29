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
  getCertifications, createCertification, updateCertification, deleteCertification,
  getAchievements, createAchievement, updateAchievement, deleteAchievement
} from '../controllers/portfolioController.js';

const router = express.Router();

// ==================== PUBLIC ROUTES ====================
router.get('/', getPortfolio);

// ==================== PROTECTED ADMIN ROUTES ====================

// Hero
router.route('/admin/hero')
  .get(protect, getHero)
  .put(protect, updateHero);

// Projects
router.route('/admin/projects')
  .get(protect, getProjects)
  .post(protect, createProject);

router.route('/admin/projects/:id')
  .put(protect, updateProject)
  .delete(protect, adminOnly, deleteProject);

// Experiences
router.route('/admin/experiences')
  .get(protect, getExperiences)
  .post(protect, createExperience);

router.route('/admin/experiences/:id')
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

// Skills
router.route('/admin/skills')
  .get(protect, getSkills)
  .post(protect, createSkill);

router.route('/admin/skills/:id')
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

// Testimonials
router.route('/admin/testimonials')
  .get(protect, getTestimonials)
  .post(protect, createTestimonial);

router.route('/admin/testimonials/:id')
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

// Contact
router.route('/admin/contact')
  .get(protect, getContact)
  .put(protect, updateContact);

// Education
router.route('/admin/education')
  .get(protect, getEducation)
  .post(protect, createEducation);

router.route('/admin/education/:id')
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

// Certifications
router.route('/admin/certifications')
  .get(protect, getCertifications)
  .post(protect, createCertification);

router.route('/admin/certifications/:id')
  .put(protect, updateCertification)
  .delete(protect, deleteCertification);

// Achievements
router.route('/admin/achievements')
  .get(protect, getAchievements)
  .post(protect, createAchievement);

router.route('/admin/achievements/:id')
  .put(protect, updateAchievement)
  .delete(protect, deleteAchievement);

export default router;
