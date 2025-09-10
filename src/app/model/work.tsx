import type { Project } from "./project";
import type { Skill } from "./skill";
import type { Technology } from "./technology";

export class Work {
  company!: string;
  role!: string;
  description: string | undefined;
  startDate: string | undefined;
  endDate: Date | null | undefined;
  occupation: number | string | undefined; //percentage
  technologies: Technology[] | undefined;
  skills: Skill[] | undefined;
  projects: Project[] | undefined;
}
