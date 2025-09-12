import { Education } from "../model/education";
import educationsJson from "../../data/education.json";
import skillsJson from "../../data/skill.json";
import projectsJson from "../../data/project.json";
import type { Work } from "~/model/work";
import type { Skill } from "~/model/skill";
import type { Technology } from "~/model/technology";
import { Project } from "~/model/project";
import type { promises } from "dns";
import type { Experience } from "~/model/experience";

export class ExperienceService {
  async getWorkExperience(): Promise<Work[]> {
    return new Promise(async (resolve) => {});
  }

  async getExperiences(): Promise<Experience[]> {
    const education = await this.getEducations();
    const work = await this.getWorkExperience();
    return [...education, ...work];
  }

  async getProjects(): Promise<Project[]> {
    return (projectsJson as any[]).map((item) => {
      const project = new Project();
      project.name = item.name;
      project.description = item.description;
      return project;
    });
  }

  async getSkills(): Promise<Skill[]> {
    return new Promise(async (resolve) => {
      skillsJson as Skill[];
    });
  }

  async getTechnologies(): Promise<Technology[]> {
    return new Promise(async (resolve) => {});
  }

  async getEducations(): Promise<Education[]> {
    return new Promise(async (resolve) => {
      const allTechnologies = await this.getTechnologies();

      return (educationsJson as any[]).map((item) => {
        const edu = new Education();
        edu.institution = item.institution;
        edu.description = item.description;
        edu.startDate = item.startDate ? new Date(item.startDate) : undefined;
        edu.endDate = item.endDate ? new Date(item.endDate) : undefined;

        if (allTechnologies) {
          edu.technologies = item.technologies?.map((name: string) =>
            allTechnologies.find((tech) => tech.name === name)
          );
        }
        return edu;
      });
    });
  }
}
