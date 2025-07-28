// src/app/page.tsx

import Codingprofile from "@/components/Codingprofile";
import Projects from "@/components/Projects";
import ProjectsShowcase from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-1000 p-3">
      <Codingprofile 
        githubUsername="abhishekck31" 
        leetcodeUsername="Gk8PxPysf4" 
        tufUsername="theabhishek" 
        tufSolved={50} 
      />
       
      <ProjectsShowcase /> 
    </main>
  );
}

