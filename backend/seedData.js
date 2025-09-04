import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import TeamMember from './models/TeamMember.js';
import Project from './models/Project.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await TeamMember.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@velocity.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Seed team members
    const teamMembers = [
      {
        name: 'John Smith',
        role: 'Club Lead',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        description: 'Visionary leader driving innovation and community growth',
        skills: ['Leadership', 'Strategy', 'Community Building', 'Innovation'],
        linkedin: 'https://linkedin.com/in/johnsmith',
        github: 'https://github.com/johnsmith',
        category: 'Leads',
        order: 1
      },
      {
        name: 'Emily Brown',
        role: 'Club Co-Lead',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        description: 'Passionate about fostering collaboration and technical excellence',
        skills: ['Team Management', 'Project Planning', 'Technical Leadership', 'Mentoring'],
        linkedin: 'https://linkedin.com/in/emilybrown',
        github: 'https://github.com/emilybrown',
        category: 'Leads',
        order: 2
      },
      {
        name: 'Sarah Kim',
        role: 'Senior Frontend Developer',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        description: 'React specialist with 5+ years building beautiful user interfaces',
        skills: ['React', 'TypeScript', 'CSS3', 'UI/UX'],
        linkedin: 'https://linkedin.com/in/sarahkim',
        github: 'https://github.com/sarahkim',
        category: 'Frontend Development',
        order: 1
      }
    ];

    for (const member of teamMembers) {
      const teamMember = new TeamMember(member);
      await teamMember.save();
    }
    console.log('Team members seeded');

    // Seed projects
    const projects = [
      {
        title: "TokeNova",
        category: "Blockchain",
        description: "A comprehensive blockchain-based platform for token management and decentralized applications",
        image: "https://picsum.photos/400/300?random=1",
        tech: ["React", "Web3.js", "Solidity"],
        status: "Completed",
        link: "https://github.com/Team-Parashuram/TokeNova",
        hostedLink: "https://tokenova.vercel.app/",
        order: 1
      },
      {
        title: "IIIT Dharwad Official Website",
        category: "Full-Stack",
        description: "Core platform and infrastructure for IIIT Dharwad websites with PHP and Node.js backend",
        image: "https://picsum.photos/400/300?random=2",
        tech: ["PHP", "Node.js", "pnpm"],
        status: "In Progress",
        link: "https://github.com/Velocity-IIITDWD/iiitdwd",
        hostedLink: "https://iiitdwd.ac.in/",
        order: 2
      },
      {
        title: "Hack2Future - Hackathon Platform",
        category: "Web Development",
        description: "Complete hackathon management platform with registration, submissions, and judging system",
        image: "https://picsum.photos/400/300?random=3",
        tech: ["Next.js", "React", "TypeScript"],
        status: "Completed",
        link: "https://github.com/Velocity-IIITDWD/hackathon-website",
        hostedLink: "https://www.hack2future.tech/",
        order: 3
      }
    ];

    for (const project of projects) {
      const newProject = new Project(project);
      await newProject.save();
    }
    console.log('Projects seeded');

    console.log('Database seeded successfully!');
    console.log('Admin credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
