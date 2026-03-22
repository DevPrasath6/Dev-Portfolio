import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Hero from '../models/Hero.js';
import Contact from '../models/Contact.js';
import Education from '../models/Education.js';
import Experience from '../models/Experience.js';
import Project from '../models/Project.js';
import Certification from '../models/Certification.js';
import Skill from '../models/Skill.js';
import Achievement from '../models/Achievement.js';
import Stats from '../models/Stats.js';

dotenv.config();

const email = 'devprasatha9@gmail.com';

const projects = [
  {
    title: 'AI Agent Framework',
    description:
      'A modular AI agent framework built from scratch to orchestrate agentic workflows from input to output without relying on existing frameworks. Supports defining task flows (DAG/state machines), memory, guardrails, and observability with audit logs and metrics. Optimized and benchmarked on Intel DevCloud with Intel OpenVINO for accelerated ML model performance.',
    tags: [
      'Django',
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Apache Kafka',
      'Apache Airflow',
      'Apache Camel',
      'OpenVINO',
      'WebSockets',
    ],
    order: 0,
  },
  {
    title: 'ClearPass – Digital No Due Clearance System',
    description:
      'A web-based system that streamlines the no due clearance process for students by automating department approvals and generating clearance certificates digitally.',
    tags: ['React.js', 'Vite', 'Django', 'MongoDB', 'TypeScript', 'Python'],
    order: 1,
  },
  {
    title: 'Pharmalytics – AI-Driven Pharmaceutical Analytics Platform',
    description:
      'An intelligent analytics platform that leverages AI and data science to optimize pharmaceutical research, drug performance monitoring, and patient outcome analysis. Features predictive modeling, real-time dashboards, and anomaly detection for drug efficacy and safety.',
    tags: ['Django', 'React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'TensorFlow', 'Scikit-learn'],
    order: 2,
  },
  {
    title: 'MetalliSense - Alloy Alchemy Advisor',
    description:
      'An intelligent Industrial IoT analytics platform designed to optimize metal manufacturing using real-time sensor data, AI-driven anomaly detection, and predictive maintenance models. Includes data ingestion, processing, visualization pipelines, edge computing, digital twin simulation, and adaptive learning modules.',
    tags: ['Django', 'MongoDB', 'React.js', 'Python', 'Machine Learning', 'TypeScript'],
    order: 3,
  },
];

const certifications = [
  { name: 'Python for Data Science, AI & Development', issuer: 'Coursera', date: '2024-01-01' },
  { name: 'Advanced Software Engineering Job Simulation', issuer: 'Forage', date: '2024-01-01' },
  { name: 'Google AI Essentials', issuer: 'Coursera', date: '2024-01-01' },
  { name: 'Excel, PowerBI', issuer: 'Forage', date: '2024-01-01' },
  { name: 'Project Management Job Simulation', issuer: 'Forage', date: '2025-01-01' },
  { name: 'Mastering Data Structures & Algorithms using C and C++', issuer: 'Udemy', date: '2025-01-01' },
  { name: 'MERN Stack & GenAI', issuer: 'Udemy', date: '2025-01-01' },
];

const skills = [
  { name: 'C', level: 80, category: 'other' },
  { name: 'C++', level: 82, category: 'other' },
  { name: 'Python', level: 92, category: 'backend' },
  { name: 'Java', level: 78, category: 'backend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'MongoDB', level: 88, category: 'database' },
  { name: 'SQL', level: 80, category: 'database' },
  { name: 'PostgreSQL', level: 85, category: 'database' },
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Django', level: 92, category: 'backend' },
  { name: 'FastAPI', level: 86, category: 'backend' },
  { name: 'REST APIs', level: 90, category: 'backend' },
  { name: 'WebSockets', level: 80, category: 'backend' },
  { name: 'Apache Kafka', level: 84, category: 'devops' },
  { name: 'Apache Airflow', level: 82, category: 'devops' },
  { name: 'Apache Camel', level: 75, category: 'devops' },
  { name: 'Docker', level: 78, category: 'devops' },
  { name: 'Git', level: 88, category: 'tools' },
  { name: 'GitHub', level: 88, category: 'tools' },
  { name: 'PowerBI', level: 80, category: 'tools' },
  { name: 'Excel', level: 83, category: 'tools' },
  { name: 'Jupyter Notebook', level: 78, category: 'tools' },
  { name: 'OpenVINO Optimization', level: 76, category: 'other' },
  { name: 'LLM Integration', level: 78, category: 'other' },
  { name: 'DSA', level: 86, category: 'other' },
  { name: 'DBMS', level: 84, category: 'other' },
  { name: 'Distributed Systems', level: 76, category: 'other' },
  { name: 'Workflow Orchestration', level: 82, category: 'other' },
  { name: 'State Machines', level: 80, category: 'other' },
];

const achievements = [
  {
    title: 'LeetCode Milestone',
    description: 'Solved 270+ problems with max rating 1457 and global rank 409,394.',
    date: '2025-01-01',
    type: 'recognition',
    order: 0,
  },
  {
    title: 'SkillRack Milestone',
    description: 'Solved 1450+ problems, earned 17 certificates, and 400+ bronze badges.',
    date: '2025-01-01',
    type: 'recognition',
    order: 1,
  },
];

const educations = [
  {
    degree: 'B.E',
    institution: 'Sri Eshwar College of Engineering',
    location: '',
    period: '2024-2028',
    description: 'Computer Science and Engineering',
    gpa: '8.64',
    order: 0,
  },
  {
    degree: 'CBSE (Senior Secondary)',
    institution: 'Orison Academy Senior Secondary School',
    location: '',
    period: '2022-2024',
    description: '',
    gpa: '82.2%',
    order: 1,
  },
  {
    degree: 'CBSE',
    institution: 'Orison Academy Senior Secondary School',
    location: '',
    period: '2021-2022',
    description: '',
    gpa: '82.8%',
    order: 2,
  },
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(`User not found for email: ${email}`);
  }

  const userId = user._id;

  await Promise.all([
    Hero.findOneAndUpdate(
      { userId },
      {
        name: 'DEV PRASATH A',
        title: 'Full Stack Developer | AI Engineer',
        subtitle: 'Building intelligent, scalable web platforms with AI, analytics, and workflow orchestration.',
        description: 'Open to internships and software engineering opportunities',
        userId,
      },
      { upsert: true, new: true }
    ),
    Contact.findOneAndUpdate(
      { userId },
      {
        email: 'devprasatha9@gmail.com',
        phone: '9080736108',
        location: '',
        linkedin: 'https://www.linkedin.com/in/devprasatha9/',
        github: 'https://github.com/DevPrasath6/',
        userId,
      },
      { upsert: true, new: true }
    ),
    Stats.findOneAndUpdate(
      { userId },
      {
        heroYearsExperience: '1+',
        heroProjectsDelivered: '4',
        heroHappyClients: '0',
        cvYearsExperience: '1+',
        cvProjects: '4',
        cvCertifications: '7',
        cvClients: '0',
        userId,
      },
      { upsert: true, new: true }
    ),
  ]);

  await Promise.all([
    Education.deleteMany({ userId }),
    Experience.deleteMany({ userId }),
    Project.deleteMany({ userId }),
    Certification.deleteMany({ userId }),
    Skill.deleteMany({ userId }),
    Achievement.deleteMany({ userId }),
  ]);

  await Education.insertMany(educations.map((e) => ({ ...e, userId })));
  await Project.insertMany(projects.map((p) => ({ ...p, userId })));
  await Certification.insertMany(certifications.map((c) => ({ ...c, userId })));
  await Skill.insertMany(skills.map((s) => ({ ...s, userId })));
  await Achievement.insertMany(achievements.map((a) => ({ ...a, userId })));

  const [educationCount, projectCount, certCount, skillCount, achievementCount] = await Promise.all([
    Education.countDocuments({ userId }),
    Project.countDocuments({ userId }),
    Certification.countDocuments({ userId }),
    Skill.countDocuments({ userId }),
    Achievement.countDocuments({ userId }),
  ]);

  console.log('Resume import complete for', email);
  console.log({ educationCount, projectCount, certCount, skillCount, achievementCount });

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Import failed:', err.message);
  await mongoose.disconnect();
  process.exit(1);
});
