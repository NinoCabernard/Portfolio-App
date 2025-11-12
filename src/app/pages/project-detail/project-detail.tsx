import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project } from "~/model/project";
import ServiceContext from "~/serviceContext";
import { ExperienceService } from "~/services/experienceService";

export default function ProjectDetail() {
  const experienceService: ExperienceService =
    useContext<ExperienceService>(ServiceContext);

  const { projectName } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectName) {
      experienceService
        .getProject(projectName)
        .then((loadedProject) => {
          if (loadedProject) {
            setProject(loadedProject);
          }
        })
        .catch((error) => {
          console.error("Error while loading projects: " + error);
          setProject(null);
        })
        .finally(() => console.log("Finally finished"));
    }
  }, [experienceService]);

  return (
    <section>
      {project != null && (
        <div>
          <h1>{project.name}</h1>
          <p>{project.shortDescription}</p>
          <p>{project.description}</p>
        </div>
      )}
    </section>
  );
}
