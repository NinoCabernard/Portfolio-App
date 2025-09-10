import type { Project } from "./project";
import type { Skill } from "./skill";
import type { Technology } from "./technology";

export class Education {
  institution!: string;
  description: string | undefined;
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  technologies: Technology[] | undefined; //how to resolve
  skills: Skill[] | undefined; //how to resolve
  projects: Project[] | undefined; //how to resolve
}
