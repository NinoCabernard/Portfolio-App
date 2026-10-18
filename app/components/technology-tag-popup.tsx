import type { Technology } from "../model/technology";

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

function formatExperience(years: number) {
  const fullYears = Math.floor(years);
  if (fullYears < 1) return "Less than a year of experience";
  return `${fullYears} ${fullYears === 1 ? "year" : "years"} of experience`;
}

function TechnologyTagPopup(technology: Technology) {
  return (
    <div>
      <h4>{technology.name}</h4>
      {technology.experience != null && (
        <p
          style={{
            color: `var(${getColorFromYearsOfExperience(technology.experience)})`,
          }}>
          {formatExperience(technology.experience)}
        </p>
      )}
      <p>{technology.description}</p>
    </div>
  );
}

export default TechnologyTagPopup;
