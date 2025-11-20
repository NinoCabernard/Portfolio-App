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
    experienceService
      .getProjects()
      .then((loadedProjects) => {
        setProjects(loadedProjects);
      })
      .catch((error) => {
        console.error("Error while loading projects: " + error);
        setProjects([]);
      })
      .finally(() => console.log("loading projects finished..."));
  }, [experienceService]);

  return (
    <section className="projects-container">
      <div className="projects-header-container ">
        <img
          className="projects-header-image"
          src="..\images\home\work_icon.svg"
        />
        <h2 className="projects-header-title">Software Projects</h2>
      </div>
      <div className="projects-list">
        {projects != null &&
          projects.map((project) => (
            <div key={project.name} className="project-item">
              <ProjectCard {...project} />
            </div>
          ))}
      </div>
    </section>
  );
}
