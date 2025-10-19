import { Education } from "../model/education";
import educationsJson from "../../data/education.json";
import workJson from "../../data/work.json";
import skillsJson from "../../data/skill.json";
import projectsJson from "../../data/project.json";
import technologiesJSon from "../../data/technology.json";
import { Work } from "~/model/work";
import type { Skill } from "~/model/skill";
import type { Technology } from "~/model/technology";
import { Project } from "~/model/project";
import type { Experience } from "~/model/experience";

export class ExperienceService {
  async getWorkExperience(): Promise<Work[]> {
    const allTechnologies = await this.getTechnologies();
    const allSkills = await this.getSkills();
    const allProjects = await this.getProjects();

    return (workJson as any[]).map((workExperience) => {
      const work = new Work();
      work.company = workExperience.company;
      work.role = workExperience.role;
      work.description = workExperience.description;
      work.occupation = workExperience.occupation;
      work.description = workExperience.description;
      work.startDate = workExperience.startDate
        ? new Date(workExperience.startDate)
        : undefined;
      work.endDate = workExperience.endDate
        ? new Date(workExperience.endDate)
        : undefined;

      if (allTechnologies) {
        work.technologies = workExperience.technologies?.map((name: string) =>
          allTechnologies.find((technology) => technology.name === name)
        );
      }
      if (allSkills) {
        work.skills = workExperience.skills?.map((name: string) =>
          allSkills.find((skill) => skill.name === name)
        );
      }
      if (allProjects) {
        work.projects = workExperience.projects?.map((name: string) =>
          allProjects.find((project) => project.name === name)
        );
      }
      return work;
    });
  }

  async getExperiences(): Promise<Experience[]> {
    const educations = await this.getEducations();
    const workExperience = await this.getWorkExperience();
    return [...educations, ...workExperience];
  }

  async getProjects(): Promise<Project[]> {
    return (projectsJson as any[]).map((item) => {
      const project = new Project();
      project.name = item.name;
      project.description = item.description;
      project.shortDescription = item.shortDescription;
      return project;
    });
  }

  async getProject(projectName: string): Promise<Project | undefined> {
    return (await this.getProjects()).find(
      (x) => x.name.toLowerCase() === projectName.toLowerCase()
    );
  }

  async getSkills(): Promise<Skill[]> {
    return skillsJson as Skill[];
  }

  async getTechnologies(): Promise<Technology[]> {
    return technologiesJSon as Technology[];
  }

  async getEducations(): Promise<Education[]> {
    const allTechnologies = await this.getTechnologies();

    return (educationsJson as any[]).map((item) => {
      const edu = new Education();
      edu.institution = item.institution;
      edu.degree = item.degree;
      edu.major = item.major;
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
  }
}
