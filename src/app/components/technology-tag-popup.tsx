import type { Technology } from "~/model/technology";

function getColorFromYearsOfExperience(yearsOfExperience: number) {
  if (yearsOfExperience > 0 && yearsOfExperience < 3) {
    return "--ratingColor1";
  } else if (yearsOfExperience >= 3 && yearsOfExperience < 5) {
    return "--ratingColor2";
  } else if (yearsOfExperience >= 5 && yearsOfExperience < 7) {
    return "--ratingColor3";
  } else {
    return "--ratingColor4";
  }
}

function TechnologyTagPopup(technology: Technology) {
  return (
    <div>
      <h4>{technology.name}</h4>
      <p
        style={{
          color: `var(${getColorFromYearsOfExperience(technology.experience ?? 0)})`,
        }}
      >
        {technology.experience} years of experience
      </p>
      <p>{technology.description}</p>
    </div>
  );
}

export default TechnologyTagPopup;
