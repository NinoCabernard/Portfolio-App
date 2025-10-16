import "./skill-list.css";
import { useState } from "react";
import type { Skill } from "~/model/skill";

interface SkillsListProps {
  skills: Skill[] | undefined;
}

export default function SkillsList(props: SkillsListProps) {

  
  const [hovered, setHovered] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>(props.skills ?? [])
  
  return (
    <div className="skill-container">
    <div className="skill-list-container">
    <span className="skill-title">Used Skills</span>

      {skills.map((skill) => (

        <div
          className='skill-item'
        >
          <img src={skill.iconPath} alt={skill.name} className="skill-icon" />

          {/* {hovered === skill.name && (
            <div className="skill-info">
              <h3>{skill.name}</h3>
              <p>
                {skill.expertiseLevel} • 100 yrs
              </p>
            </div>
          )} */}
        </div>
      ))}
    </div>
    </div>
  );
}