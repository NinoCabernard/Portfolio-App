import type { Project } from "~/model/project";

function ProjectTagPopup(project: Project) {
  return (
    <div>
      <h4>{project.name}</h4>
      <p>{project.description}</p>
      <a className="link" href={`/project/${project.name}`}>
        read more
      </a>
    </div>
  );
}

export default ProjectTagPopup;
