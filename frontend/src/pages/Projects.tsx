import { useEffect, useState } from "react";
import api from "../services/api";
import { Project } from "../types/Project";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10 text-blue-500">My Projects</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900 p-6 rounded-xl border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-3">{project.title}</h2>

            <p className="text-gray-300 mb-3">{project.description}</p>

            <p className="text-blue-400">{project.techStack}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
