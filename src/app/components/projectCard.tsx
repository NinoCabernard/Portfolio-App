import React, { useContext, useEffect, useState } from "react";
import type { Project } from "~/model/project";
import SkillsList from "./skill/skill-list";
import { ExperienceService } from "~/services/experienceService";
import ServiceContext from "~/serviceContext";
import type { Skill } from "~/model/skill";

export default function ProjectCard(project: Project) {


  const experienceService: ExperienceService = useContext<ExperienceService>(ServiceContext);

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
    <div className="border rounded-md p-4 shadow-md  mb-4">
      <h2 className="text-xl font-bold mb-2">{project.name}</h2>
      <p className="mb-2">{project.description}</p>

      {project.startDate || project.endDate ? (
        <p className="text-sm text-gray-600 mb-2">
          {project.startDate || "?"} - {project.endDate || "Present"}
        </p>
      ) : null}

      {project.technologies && project.technologies.length > 0 && (
        <p className="text-sm mb-1">
          <b>Technologies:</b>{" "}
          {project.technologies
            .map((tech) => (typeof tech === "string" ? tech : tech.name))
            .join(", ")}
        </p>
      )}

      <SkillsList skills={skills} />
    </div>
  );
}
