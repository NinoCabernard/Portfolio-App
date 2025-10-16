import { ExpertiseLevel } from "./technology";

export class Skill {
  name!: string;
  description: string | undefined;
  iconPath: string | undefined;
  expertiseLevel: ExpertiseLevel = ExpertiseLevel.Beginner;
}
