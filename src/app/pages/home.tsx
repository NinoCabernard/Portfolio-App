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
import Typewriter from "~/components/typewriter/typewriter";

export default function Home() {
  const experienceService: ExperienceService =
    useContext<ExperienceService>(ServiceContext);

  const [experiences, setExperiences] = useState<Experience[] | null>(null);
  const [titleCompleted, setTitleCompleted] = useState(false);

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

  function onTitleCompleted(): void {
    setTitleCompleted(true);
  }

  return (
    <section>
      <Typewriter onWritingCompleted={onTitleCompleted}></Typewriter>
      <div>
        <div>
          <img
            className="timeline-header-image"
            src="..\images\home\work_icon.svg"
          />
          <h2>Work experience</h2>
        </div>
      </div>
      <Timeline
        startDate={undefined}
        endDate={undefined}
        events={
          experiences?.map((experience) => {
            const event = new TimelineEvent();
            event.name = experience.name;
            event.startDate = new Date(experience.startDate ?? 0);
            event.endDate = new Date(experience.endDate ?? Date.now());
            event.description = experience.description;
            event.position =
              experience instanceof Work
                ? TimelineItemPosition.Left
                : TimelineItemPosition.Right;
            event.children = (
              <div>
                <h4>{experience.name}</h4>
                <p>{experience.startDate?.toLocaleString()}</p>
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
