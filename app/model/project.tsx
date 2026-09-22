import type { Skill } from "./skill";
import type { Technology } from "./technology";

export class Project {
  name!: string;
  subtitle: string = "";
  description: string = "";
  html: string | undefined;
  url: string | undefined;
  thumbnailPath: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined | null;

  technologies: Technology[] = [];
  skills: Skill[] = [];
}
