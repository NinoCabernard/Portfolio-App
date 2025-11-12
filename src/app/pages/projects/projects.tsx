import { useContext, useEffect, useState } from "react";
import ProjectCard from "~/components/project-card/project-card";
import type { Project } from "~/model/project";
import ServiceContext from "~/serviceContext";
import { ExperienceService } from "~/services/experienceService";
import "./projects.css";

export default function Projects() {
  const experienceService: ExperienceService =
    useContext<ExperienceService>(ServiceContext);

  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    console.log("Runs after every render");
    experienceService
      .getProjects()
      .then((loadedProjects) => {
        console.log("Projects found: " + loadedProjects);
        setProjects(loadedProjects);
      })
      .catch((error) => {
        console.error("Error while loading projects: " + error);

        setProjects([]);
      })
      .finally(() => console.log("Finally finished"));
  }, [experienceService]);

  return (
    <section className="projects-container">
      {projects != null &&
        projects.map((project) => (
          <div key={project.name} className="project-item">
            <ProjectCard {...project} />
          </div>
        ))}
    </section>
  );
}
