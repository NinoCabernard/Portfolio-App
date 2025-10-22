import "./skill-list.css";
import { useState } from "react";
import type { Skill } from "~/model/skill";

interface SkillsListProps {
  skills: Skill[] | undefined;
}

export default function SkillsList(props: SkillsListProps) {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  const [skills, setSkills] = useState<Skill[]>(props.skills ?? []);
  const defaultIconPath = "../images/skills/code-solid-full.svg";

  return (
    <div className="skill-container">
      <div className="skill-list-container">
        <span className="skill-title">Used Skills</span>
        {skills.map((skill, index) => {
          if (skill !== undefined) {
            return (
              <div
                className="skill-item"
                onMouseEnter={() => setShowPopup(index)}
                onMouseLeave={() => setShowPopup(undefined)}
              >
                <img src={skill.iconPath} className="skill-icon" />
                <p>{skill.name}</p>

                {showPopup == index && (
                  <div className="skill-popup">
                    <h4>{skill.name}</h4>
                    <p className="skill-expertise">
                      {skill.expertiseLevel} level
                    </p>
                    <p>{skill.description}</p>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
