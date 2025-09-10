import type { Skill } from "./skill";
import type { Technology } from "./technology";

export class Project {
  name!: string;
  description: string = "";
  startDate: string | undefined;
  endDate: string | undefined | null;

  technologies: Technology[] | string[] | undefined;
  skills: Skill[] | string[] | undefined;
}
