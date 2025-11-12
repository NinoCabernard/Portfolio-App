import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project } from "~/model/project";
import ServiceContext from "~/serviceContext";
import { ExperienceService } from "~/services/experienceService";
import "./project-detail.css";
import type { Experience } from "~/model/experience";
import Tags from "~/components/tags/tags";
import type { Technology } from "~/model/technology";
import type { Skill } from "~/model/skill";

export default function ProjectDetail() {
  const experienceService: ExperienceService =
    useContext<ExperienceService>(ServiceContext);

  const { projectName } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);

  useEffect(() => {
    if (projectName) {
      experienceService
        .getProject(projectName)
        .then(async (loadedProject) => {
          if (loadedProject) {
            setProject(loadedProject);
            if (loadedProject.name) {
              try {
                const loadedExperience =
                  await experienceService.getExperienceFromProject(
                    loadedProject.name
                  );
                setExperience(loadedExperience ?? null);
              } catch (err) {
                console.error("Error loading experience from project:", err);
                setExperience(null);
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error while loading projects: " + error);
          setExperience(null);
          setProject(null);
        });
    }
  }, [experienceService]);

  return (
    <section className="project-container">
      {project != null && (
        <div>
          <h1 className="project-title">{project.name}</h1>
          <div className="project-subtitle">
            <p>{experience?.name}</p>
            <p>{`${experience?.institution}, ${experience?.location}`} </p>
          </div>
          <p className="project-short-description">{project.description}</p>
          {project.url && (
            <a
              className="link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check it out on Github!
            </a>
          )}
          {project.html && (
            <div
              className="project-inner-html"
              dangerouslySetInnerHTML={{ __html: project.html }}
            />
          )}
          <Tags<Technology>
            tags={project.technologies}
            title="Used technologies"
          />
          <Tags<Skill> tags={project.skills} title="Refined Skills" />
        </div>
      )}
    </section>
  );
}
