import { useContext, useEffect, useState } from "react";
import Timeline, { TimelineEvent } from "~/components/timeline/timeline";
import { TimelineItemPosition } from "~/components/timeline/timeline-item";
import type { Experience } from "~/model/experience";
import { Work } from "~/model/work";
import ServiceContext from "~/serviceContext";
import type { ExperienceService } from "~/services/experienceService";
import "./home.css";
import Tags from "~/components/tags/tags";
import type { Technology } from "~/model/technology";
import type { Skill } from "~/model/skill";
import type { Project } from "~/model/project";
import TechnologyTagPopup from "~/components/technology-tag-popup";
import SkillTagPopup from "~/components/skill-tag-popup";
import ProjectTagPopup from "~/components/project-tag-popup";

export default function Home() {
  const experienceService: ExperienceService =
    useContext<ExperienceService>(ServiceContext);

  const [experiences, setExperiences] = useState<Experience[] | null>(null);

  useEffect(() => {
    console.log("Runs after every render");
    experienceService
      .getExperiences()
      .then((loadedExperiences) => {
        console.log("Experiences found: " + loadedExperiences);
        setExperiences(loadedExperiences);
      })
      .catch((error) => {
        console.error("Error while loading projects: " + error);

        setExperiences([]);
      })
      .finally(() => console.log("Finally finished"));
  }, [experienceService]);

  return (
    <section>
      <div className="timeline-header">
        <div className="timeline-header-item ">
          <img
            className="timeline-header-image"
            src="..\images\home\work_icon.svg"
          />
          <h2 className="timeline-header-title">WORK EXPERIENCE</h2>
        </div>
        <div className="timeline-header-item ">
          <img
            className="timeline-header-image"
            src="..\images\home\education_icon.svg"
          />
          <h2 className="timeline-header-title">EDUCATION</h2>
        </div>
      </div>
      <Timeline
        startDate={undefined}
        endDate={undefined}
        events={
          experiences?.map((experience) => {
            const event = new TimelineEvent();
            event.name = experience.name;
            event.institution = `${experience.institution}, ${experience.location}`;
            event.startDate = new Date(experience.startDate ?? 0);
            event.endDate = experience.endDate
              ? new Date(experience.endDate)
              : undefined;
            event.description = experience.description;
            event.position =
              experience instanceof Work
                ? TimelineItemPosition.Left
                : TimelineItemPosition.Right;
            event.children = (
              <div>
                {experience.projects && experience.projects.length > 0 && (
                  <Tags<Project>
                    tags={experience.projects}
                    title="Projects"
                    popupElement={ProjectTagPopup}
                  />
                )}
                {experience.skills && experience.skills.length > 0 && (
                  <Tags<Skill>
                    tags={experience.skills}
                    title="Skills"
                    initialShown={3}
                    popupElement={SkillTagPopup}
                  />
                )}
                {experience.technologies &&
                  experience.technologies.length > 0 && (
                    <Tags<Technology>
                      tags={experience.technologies}
                      title="Technologies"
                      initialShown={3}
                      popupElement={TechnologyTagPopup}
                    />
                  )}
              </div>
            );
            return event;
          }) ?? undefined
        }
      ></Timeline>
    </section>
  );
}
