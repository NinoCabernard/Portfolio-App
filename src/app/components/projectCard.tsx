import React from "react";
import type { Project } from "~/model/project";

export default function ProjectCard(project: Project) {
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

      {project.skills && project.skills.length > 0 && (
        <p className="text-sm">
          <b>Skills:</b>{" "}
          {project.skills
            .map((skill) => (typeof skill === "string" ? skill : skill.name))
            .join(", ")}
        </p>
      )}
    </div>
  );
}
