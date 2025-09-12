import { useContext, useEffect, useState } from "react";
import Timeline, { TimelineItem } from "~/components/timeline";
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
      <Timeline start={new Date()} end={new Date()}>
        {experiences?.map((experience, index) => (
          <TimelineItem
            startDate={experience.startDate}
            end={experience.endDate}
          >
            <strong>{experience.name}</strong>
            {experience && <p>{experience.startDate?.toLocaleString()}</p>}
          </TimelineItem>
        )) ?? <p></p>}
      </Timeline>
    </section>
  );
}
