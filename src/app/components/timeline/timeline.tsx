import { motion } from "framer-motion";
import "./timeline.css";
import type { ReactElement } from "react";
import TimelineItem, { TimelineItemPosition } from "./timeline-item";

const toTimestamp = (date: string | Date): Date => new Date(date);

interface TimelineProps {
  startDate: string | Date | undefined;
  endDate: string | Date | undefined;
  events: TimelineEvent[] | undefined;
}

export class TimelineEvent {
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  name: string | undefined;
  description: string | undefined;
  position: TimelineItemPosition | undefined;
  children: ReactElement | undefined;
}

export default function Timeline(timelineProps: TimelineProps) {
  const events = timelineProps.events ?? [];
  if (events.length === 0) return <div>No events</div>;

  const allStartTimes = events
    .map((e) => (e.startDate ? toTimestamp(e.startDate).getTime() : undefined))
    .filter((t): t is number => !!t);
  const allEndTimes = events
    .map((e) => (e.endDate ? toTimestamp(e.endDate).getTime() : undefined))
    .filter((t): t is number => !!t);

  const timelineStartTime = Math.min(...allStartTimes);
  const timelineEndTime = Math.max(...allEndTimes);
  const totalDuration = timelineEndTime - timelineStartTime;

  const timelineItems = events
    .sort(
      (x, y) =>
        new Date(y.startDate!).getTime() - new Date(x.startDate!).getTime()
    )
    .map((timelineEvent, index) => {
      if (!timelineEvent.startDate || !timelineEvent.endDate) return null;

      const childStartDate = toTimestamp(timelineEvent.startDate);
      const childEndDate = toTimestamp(timelineEvent.endDate);

      return (
        <div
          className={`timeline-item-container ${timelineEvent.position == TimelineItemPosition.Right ? "left" : "right"} `}
        >
          <TimelineItem
            startDate={childStartDate}
            endDate={childEndDate}
            name={timelineEvent.name}
            description={timelineEvent.description}
          >
            {timelineEvent.children}
          </TimelineItem>
        </div>
      );
    });

  return (
    <div className="timeline">
      <div className="timeline-line" />
      <div className="timeline-items-container">{timelineItems}</div>
    </div>
  );
}
