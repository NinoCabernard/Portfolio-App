import { motion } from "framer-motion";
import "./timeline.css";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import TimelineItem from "./timeline-item";

const toTimestamp = (date: string | Date): Date => new Date(date);

interface TimelineProps {
  startDate: string | Date;
  endDate: string | Date;
  events: TimelineEvent[] | undefined;
}

export class TimelineEvent {
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  children: ReactElement | undefined;
}

export default function Timeline(timelineProps: TimelineProps) {
  const startTime = toTimestamp(timelineProps.startDate);
  const endTime = toTimestamp(timelineProps.endDate);
  const totalDuration = endTime.getTime() - startTime.getTime();

  const positionedChildren =
    timelineProps.events !== undefined
      ? timelineProps.events!.map((timelineEvent, index) => {
          if (!timelineEvent.startDate || !timelineEvent.endDate) return null;

          const childStart = toTimestamp(timelineEvent.startDate);
          const childEnd = toTimestamp(timelineEvent.endDate);
          // const left = ((childStart - startTime) / totalDuration) * 100;
          // const width = ((childEnd - childStart) / totalDuration) * 100;

          return (
            <TimelineItem
              startDate={childStart}
              position={0}
              endDate={childEnd}
            >
              <div>
                <p className="text-gray-600">
                  {timelineEvent.startDate.toLocaleString()}
                </p>

                <div>{timelineEvent.children}</div>
              </div>
            </TimelineItem>
          );
        })
      : undefined;

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 -translate-x-1/2" />
      <div className="timeline">{positionedChildren}</div>
    </div>
  );
}
