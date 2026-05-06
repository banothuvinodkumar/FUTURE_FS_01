import { Project } from "./models/project";
import { Skill } from "./models/skill";
import { About } from "./models/about";
import { logger } from "./lib/logger";

export async function seedDatabase(): Promise<void> {
  await About.findOneAndUpdate(
    {},
    {
      name: "Vinod Kumar Banothu",
      title: "Full Stack Developer",
      bio: "Passionate full-stack developer with expertise in building modern web applications using React, Node.js, and MongoDB. I love solving complex problems with clean, efficient code and delivering impactful user experiences.",
      email: "itsvinodkumarcse@gmail.com",
      phone: "+91 9381428943",
      location: "India",
      githubUrl: "https://github.com/banothuvinodkumar",
      linkedinUrl: "https://www.linkedin.com/in/vinod-kumar-banothu-559a14325",
      yearsExperience: 2,
      availability: "Open to opportunities",
      photoUrl: null,
      resumeUrl: "http://localhost:4000/resume.pdf",
    },
    { upsert: true }
  );
  logger.info("Seeded about info");

  const existingProjects = await Project.countDocuments();
  if (existingProjects === 0) {
    await Project.insertMany([
      {
        title: "E-Commerce Platform",
        description:
          "A full-stack e-commerce web application with product listings, cart management, user authentication, and payment integration. Built with React, Node.js, Express, and MongoDB.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        githubUrl: "https://github.com/banothuvinodkumar/ecommerce",
        liveUrl: null,
        imageUrl: null,
        featured: true,
        category: "Full Stack",
      },
      {
        title: "Task Management App",
        description:
          "A collaborative task management application with real-time updates, drag-and-drop boards, team workspaces, and role-based access control.",
        techStack: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
        githubUrl: "https://github.com/banothuvinodkumar/taskmanager",
        liveUrl: null,
        imageUrl: null,
        featured: true,
        category: "Full Stack",
      },
      {
        title: "Blog Application",
        description:
          "A responsive full-stack blog platform featuring rich text editing, user authentication, and dynamic routing for creating and managing engaging articles.",
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        githubUrl: "https://github.com/banothuvinodkumar/blog-app",
        liveUrl: null,
        imageUrl: null,
        featured: true,
        category: "Full Stack",
      },
      {
        title: "REST API with Node.js",
        description:
          "A scalable RESTful API built with Node.js and Express, featuring JWT authentication, rate limiting, input validation, and comprehensive API documentation.",
        techStack: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
        githubUrl: "https://github.com/banothuvinodkumar/rest-api",
        liveUrl: null,
        imageUrl: null,
        featured: false,
        category: "Backend",
      },
    ]);
    logger.info("Seeded projects");
  }

  const existingSkills = await Skill.countDocuments();
  if (existingSkills === 0) {
    await Skill.insertMany([
      { name: "React.js", category: "Frontend", proficiency: 85 },
      { name: "JavaScript", category: "Frontend", proficiency: 90 },
      { name: "HTML/CSS", category: "Frontend", proficiency: 88 },
      { name: "TypeScript", category: "Frontend", proficiency: 75 },
      { name: "Node.js", category: "Backend", proficiency: 82 },
      { name: "Express.js", category: "Backend", proficiency: 80 },
      { name: "MongoDB", category: "Database", proficiency: 78 },
      { name: "SQL", category: "Database", proficiency: 70 },
      { name: "Git", category: "Tools", proficiency: 85 },
      { name: "REST APIs", category: "Backend", proficiency: 85 },
      { name: "Docker", category: "Tools", proficiency: 60 },
      { name: "Tailwind CSS", category: "Frontend", proficiency: 80 },
    ]);
    logger.info("Seeded skills");
  }

  logger.info("Database seeding complete");
}
