import "./project-list.css";
import { useState } from "react";
import type { Project } from "~/model/project";
import type { Skill } from "~/model/skill";

interface SkillsListProps {
  projects: Project[] | undefined;
}

export default function ProjectList(props: SkillsListProps) {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  const [skills, setSkills] = useState<Project[]>(props.projects ?? []);
  const defaultIconPath = "../images/skills/code-solid-full.svg";

  return (
    <div className="skill-container">
      <div className="skill-list-container">
        <span className="skill-title">Projects</span>
        {skills.map((skill, index) => (
          <div
            className="skill-item"
            onMouseEnter={() => setShowPopup(index)}
            onMouseLeave={() => setShowPopup(undefined)}
          >
            {showPopup == index && (
              <div className="skill-popup">
                <h4>{skill.name}</h4>
                <p>{skill.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
