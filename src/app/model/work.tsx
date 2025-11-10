import type { Experience } from "./experience";
import type { Project } from "./project";
import type { Skill } from "./skill";
import type { Technology } from "./technology";

export class Work implements Experience {
  company!: string;
  role!: string;
  description: string | undefined;
  startDate!: Date | string | undefined;
  endDate: Date | string | undefined;
  occupation: number | string | undefined; //percentage
  technologies: Technology[] | undefined;
  skills: Skill[] | undefined;
  projects: Project[] | undefined;

  get name(): string {
    return this.role;
  }
  get institution(): string {
    return this.company;
  }
}
