import { useContext, useEffect, useState } from "react";
import ProjectList from "~/components/project/project-list";
import SkillsList from "~/components/skill/skill-list";
import Timeline, { TimelineEvent } from "~/components/timeline/timeline";
import { TimelineItemPosition } from "~/components/timeline/timeline-item";
import type { Experience } from "~/model/experience";
import { Work } from "~/model/work";
import ServiceContext from "~/serviceContext";
import type { ExperienceService } from "~/services/experienceService";

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
      <h2>Work experience</h2>
      <Timeline
        startDate={undefined}
        endDate={undefined}
        events={
          experiences?.map((experience) => {
            const event = new TimelineEvent();
            event.name = experience.name;
            event.startDate = experience.startDate;
            event.endDate = experience.endDate;
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
