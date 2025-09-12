import { useContext, useEffect, useState } from "react";
import ProjectCard from "~/components/projectCard";
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
    <section>
      <h1>Look at all the cool stuff I've been working on!</h1>
      {projects != null && (
        <ul className="project-list">
          {projects.map((project) => (
            <li>
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
