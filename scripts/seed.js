// Simple seed script to populate the database with sample data
// Run with: node scripts/seed.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Project = require('../models/Project')
const Skill = require('../models/Skill')
const TimelineItem = require('../models/TimelineItem')
const Achievement = require('../models/Achievement')
const User = require('../models/User')

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  // Clear existing data
  await Promise.all([
    Project.deleteMany({}),
    Skill.deleteMany({}),
    TimelineItem.deleteMany({}),
    Achievement.deleteMany({}),
    User.deleteMany({})
  ])
  console.log('Cleared existing data')

  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 10)
  await User.create({
    email: 'admin@sahil.com',
    passwordHash,
    role: 'admin'
  })
  console.log('Created admin user: admin@sahil.com / admin123')

  // Seed projects
  await Project.insertMany([
    {
      title: '3D Portfolio Website',
      description: 'Interactive 3D portfolio built with React Three Fiber and Next.js',
      tech: ['React', 'Three.js', 'Next.js', 'MongoDB'],
      github: 'https://github.com/sahil/3d-portfolio',
      live: 'https://sahil-portfolio.com',
      featured: true
    },
    {
      title: 'AI Chatbot Platform',
      description: 'Full-stack chatbot platform with OpenAI integration',
      tech: ['Node.js', 'Express', 'OpenAI', 'PostgreSQL'],
      github: 'https://github.com/sahil/ai-chatbot',
      featured: true
    },
    {
      title: 'E-commerce Dashboard',
      description: 'Admin dashboard for managing products and orders',
      tech: ['React', 'TypeScript', 'Tailwind', 'Firebase'],
      github: 'https://github.com/sahil/ecommerce-dash'
    }
  ])
  console.log('Seeded projects')

  // Seed skills
  await Skill.insertMany([
    { name: 'React', category: 'Frontend', level: 'Advanced' },
    { name: 'Next.js', category: 'Frontend', level: 'Advanced' },
    { name: 'Three.js', category: '3D/WebGL', level: 'Intermediate' },
    { name: 'TypeScript', category: 'Frontend', level: 'Advanced' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced' },
    { name: 'Node.js', category: 'Backend', level: 'Advanced' },
    { name: 'Express', category: 'Backend', level: 'Advanced' },
    { name: 'MongoDB', category: 'Backend', level: 'Intermediate' },
    { name: 'PostgreSQL', category: 'Backend', level: 'Intermediate' },
    { name: 'Docker', category: 'DevOps', level: 'Intermediate' },
    { name: 'OpenAI API', category: 'AI/ML', level: 'Intermediate' },
    { name: 'React Three Fiber', category: '3D/WebGL', level: 'Intermediate' }
  ])
  console.log('Seeded skills')

  // Seed timeline
  await TimelineItem.insertMany([
    {
      title: 'Bachelor of Computer Science',
      institution: 'University of Tech',
      startDate: new Date('2020-09-01'),
      endDate: new Date('2024-05-15'),
      description: 'Focused on web development, algorithms, and AI',
      type: 'education'
    },
    {
      title: 'Full Stack Developer Internship',
      institution: 'TechCorp Inc.',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-08-31'),
      description: 'Built React dashboards and Node.js APIs',
      type: 'work'
    },
    {
      title: 'AWS Certified Developer',
      institution: 'Amazon Web Services',
      startDate: new Date('2024-03-15'),
      description: 'Certified in AWS cloud services and serverless architecture',
      type: 'certification'
    }
  ])
  console.log('Seeded timeline')

  // Seed achievements
  await Achievement.insertMany([
    {
      title: 'Hackathon Winner',
      date: new Date('2023-11-20'),
      issuer: 'TechFest 2023',
      description: 'First place for building an AI-powered study assistant'
    },
    {
      title: 'Open Source Contributor',
      date: new Date('2024-01-10'),
      issuer: 'GitHub',
      description: 'Contributed to React Three Fiber and Next.js documentation'
    },
    {
      title: 'Dean\'s List',
      date: new Date('2023-05-30'),
      issuer: 'University of Tech',
      description: 'Achieved Dean\'s List honors for academic excellence'
    }
  ])
  console.log('Seeded achievements')

  await mongoose.disconnect()
  console.log('Seed complete!')
}

seed().catch(console.error)
