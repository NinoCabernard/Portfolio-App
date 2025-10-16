import "./skill-list.css";
import { useState } from "react";
import type { Skill } from "~/model/skill";

interface SkillsListProps {
  skills: Skill[] | undefined;
}

export default function SkillsList(props: SkillsListProps) {

  
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [skills, setSkills] = useState<Skill[]>(props.skills ?? [])
  
  return (
    <div className="skill-container">
      <div className="skill-list-container">
        <span className="skill-title">Used Skills</span>
        {skills.map((skill) => (

          <div className='skill-item'
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <img src={skill.iconPath} alt={skill.name} className="skill-icon" />

            {showPopup && (
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