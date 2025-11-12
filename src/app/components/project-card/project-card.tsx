import React, { useContext, useEffect, useState } from "react";
import type { Project } from "~/model/project";
import { ExperienceService } from "~/services/experienceService";
import ServiceContext from "~/serviceContext";
import type { Skill } from "~/model/skill";
import "./project-card.css";

export default function ProjectCard(project: Project) {
  const experienceService: ExperienceService =
    useContext<ExperienceService>(ServiceContext);

  const [skills, setSkills] = useState<Skill[] | undefined>();

  useEffect(() => {
    experienceService
      .getSkills()
      .then((loadedProjects) => {
        console.log("Projects found: " + loadedProjects);
        setSkills(loadedProjects);
      })
      .catch((error) => {
        console.error("Error while loading projects: " + error);
        setSkills([]);
      })
      .finally(() => console.log("Finally finished"));
  }, [experienceService]);

  return (
    <div className="project-card">
      <h2 className="project-card-title">{project.name}</h2>
      <p className="project-card-description">{project.description}</p>

      <a className="link" href={`/project/${project.name}`}>
        read more
      </a>
      {project.startDate || project.endDate ? (
        <p className="text-sm text-gray-600 mb-2">
          {project.startDate || "?"} - {project.endDate || "Present"}
        </p>
      ) : null}
    </div>
  );
}
