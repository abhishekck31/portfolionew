// Step 1: Create a new file at src/components/ProjectsShowcase.tsx
// and paste the code below into it.

import React from 'react';

// --- Reusable GitHub Icon ---
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-gray-400 hover:text-white transition-colors"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// --- Project Card Component ---
// This component represents a single project in the showcase.
interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, githubUrl }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-lg text-gray-200">{title}</h3>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <GitHubIcon />
      </a>
    </div>
    <p className="text-gray-400 text-sm">{description}</p>
    <div className="mt-auto">
      <img 
        src={imageUrl} 
        alt={`${title} project preview`} 
        className="rounded-md w-full aspect-video object-cover border border-gray-600"
      />
    </div>
  </div>
);


// --- Main Projects Showcase Component ---
// This component holds the grid of all your projects.
const ProjectsShowcase = () => {
  // You can replace this with your actual project data.
  const projects = [
    {
      title: 'Bob',
      description: 'Crowdsourced Intelligence, Blockchain-Powered Rewards',
      imageUrl: 'https://placehold.co/600x400/000000/FFF?text=Bob+Project',
      githubUrl: '#',
    },
    {
      title: 'Ussop',
      description: 'Enterprise ready video conferencing web app',
      imageUrl: 'https://placehold.co/600x400/000000/FFF?text=Ussop+Project',
      githubUrl: '#',
    },
    {
      title: 'Sakhi',
      description: 'True independence starts with a sense of safety',
      imageUrl: 'https://placehold.co/600x400/000000/FFF?text=Sakhi+Project',
      githubUrl: '#',
    },
    {
      title: 'Test.ai',
      description: 'Personalized Test & Feedback Platform',
      imageUrl: 'https://placehold.co/600x400/000000/FFF?text=Test.ai+Project',
      githubUrl: '#',
    },
  ];

  return (
    <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-7xl mx-auto font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsShowcase;
