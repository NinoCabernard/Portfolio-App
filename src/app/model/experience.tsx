import type { Project } from "./project";
import type { Skill } from "./skill";

export interface Experience {
  name: string | undefined;
  description: string | undefined;
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  skills: Skill[] | undefined;
  projects: Project[] | undefined;
}
