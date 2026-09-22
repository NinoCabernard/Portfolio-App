import { Link } from "react-router";
import type { Project } from "../../model/project";
import "./project-card.css";

export default function ProjectCard(project: Project) {
  return (
    <Link
      to={`/project/${project.name}`}
      className="project-card-link">
      <div className="project-card">
        <div className="project-card-front">
          <div className="project-card-icon-container">
            <img
              src={project.thumbnailPath}
              alt=""
              loading="lazy"
            />
          </div>
          <h2 className="project-card-title">{project.name}</h2>
          <p className="project-card-subtitle">{project.subtitle}</p>
        </div>
        <div className="project-card-back">
          <p className="project-card-description">{project.description}</p>
        </div>
      </div>
    </Link>
  );
}
