import type { Project } from "./project";
import type { Skill } from "./skill";
import type { Technology } from "./technology";

export interface Experience {
  name: string | undefined;
  institution: string | undefined;
  location: string | undefined;
  description: string | undefined;
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  skills: Skill[] | undefined;
  projects: Project[] | undefined;
  technologies: Technology[] | undefined;
}
