import { useContext, useEffect, useState } from "react";
import ProjectList from "~/components/project/project-list";
import SkillsList from "~/components/skill/skill-list";
import Timeline, { TimelineEvent } from "~/components/timeline/timeline";
import { TimelineItemPosition } from "~/components/timeline/timeline-item";
import type { Experience } from "~/model/experience";
import { Work } from "~/model/work";
import ServiceContext from "~/serviceContext";
import type { ExperienceService } from "~/services/experienceService";
import "./home.css";

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
            event.institution = experience.institution;
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
                <ProjectList projects={experience.projects} />
                <SkillsList skills={experience.skills} />
              </div>
            );
            return event;
          }) ?? undefined
        }
      ></Timeline>
    </section>
  );
}
