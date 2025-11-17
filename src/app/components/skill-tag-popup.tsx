import type { Skill } from "~/model/skill";

function SkillTagPopup(skill: Skill) {
  return (
    <div>
      <h4>{skill.name}</h4>
      <p>{skill.expertiseLevel} level</p>
      <p>{skill.description}</p>
    </div>
  );
}

export default SkillTagPopup;
