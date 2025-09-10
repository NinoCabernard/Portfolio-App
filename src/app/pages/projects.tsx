import { useContext, useEffect, useState } from "react";
import type { Project } from "~/model/project";
import ServiceContext from "~/serviceContext";
import { ExperienceService } from "~/services/experienceService";

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
    <div>
      <h1>Checkout the projects I have been working on!</h1>
      {projects && (
        <ul>
          {projects.map((project) => (
            <li>
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProjectCard(project: Project) {
  return (
    <div>
      <h2>
        <b>{project.name}</b>
      </h2>
      <p>{project.description}</p>
    </div>
  );
}
