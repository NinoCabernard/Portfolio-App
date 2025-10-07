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
  position: TimelineItemPosition | undefined;
  children: ReactElement | undefined;
}

export default function Timeline(timelineProps: TimelineProps) {
  const events = timelineProps.events ?? [];
  if (events.length === 0) return <div>No events</div>;

  // --- AUTO-DETERMINE start & end ---
  const allStartTimes = events
    .map((e) => (e.startDate ? toTimestamp(e.startDate).getTime() : undefined))
    .filter((t): t is number => !!t);
  const allEndTimes = events
    .map((e) => (e.endDate ? toTimestamp(e.endDate).getTime() : undefined))
    .filter((t): t is number => !!t);

  const timelineStartTime = Math.min(...allStartTimes);

  const timelineEndTime = Math.max(...allEndTimes);

  const totalDuration = timelineEndTime - timelineStartTime;

  // --- position events ---
  const positionedChildren = events.map((timelineEvent, index) => {
    if (!timelineEvent.startDate || !timelineEvent.endDate) return null;

    const childStartDate = toTimestamp(timelineEvent.startDate);
    const childStart = childStartDate.getTime();
    const childEndDate = toTimestamp(timelineEvent.endDate);
    const childEnd = childStartDate.getTime();

    const startPercent =
      ((childStart - timelineStartTime) / totalDuration) * 100;
    const endPercent = ((childEnd - timelineStartTime) / totalDuration) * 100;

    return (
      <TimelineItem
        startDate={childStartDate}
        position={timelineEvent.position}
        startPercent={startPercent}
        endPercent={endPercent}
        endDate={childEndDate}
      >
        <div>
          <p>
            {childStartDate.toLocaleDateString()} -{" "}
            {childEndDate.toLocaleDateString()}
          </p>
          <div>{timelineEvent.children}</div>
        </div>
      </TimelineItem>
    );
  });

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 -translate-x-1/2" />
      <div className="timeline">{positionedChildren}</div>
    </div>
  );
}
