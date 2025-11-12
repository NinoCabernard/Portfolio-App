import "./project-list.css";
import { useState } from "react";
import type { Project } from "~/model/project";
import type { Skill } from "~/model/skill";

interface SkillsListProps {
  projects: Project[] | undefined;
}

export default function ProjectList(props: SkillsListProps) {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  const [projects, setSkills] = useState<Project[]>(props.projects ?? []);
  const defaultIconPath = "../images/skills/code-solid-full.svg";

  return (
    <div className="project-container">
      <span className="project-title">Projects</span>
      {projects.map((project, index) => (
        <div
          className="project-item"
          onMouseEnter={() => setShowPopup(index)}
          onMouseLeave={() => setShowPopup(undefined)}
        >
          <span className="project-title">
            <a href={"project/" + project.name}>{project.name}</a>
          </span>
          <span className="project-description">{project.description}</span>
        </div>
      ))}
    </div>
  );
}
