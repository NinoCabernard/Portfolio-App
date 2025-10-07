import { useContext, useEffect, useState } from "react";
import Timeline, { TimelineEvent } from "~/components/timeline/timeline";
import type { Experience } from "~/model/experience";
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
        startDate={new Date()}
        endDate={new Date()}
        events={
          experiences?.map((experience) => {
            const evt = new TimelineEvent();
            evt.startDate = experience.startDate;
            evt.endDate = experience.endDate;
            evt.children = (
              <div>
                <h4>{experience.name}</h4>
                <p>{experience.startDate?.toLocaleString()}</p>
              </div>
            );
            return evt;
          }) ?? undefined
        }
      ></Timeline>
    </section>
  );
}
