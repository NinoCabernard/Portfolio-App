import "./timeline-item.css";
import type { ReactElement, ReactNode } from "react";

export interface TimelineItemProps {
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  startPercent: number;
  endPercent: number;
  position: TimelineItemPosition | undefined;

  children?: ReactNode;
}
export enum TimelineItemPosition {
  Left,
  Right,
}

export default function TimelineItem({
  startDate,
  endDate,
  startPercent,
  endPercent,
  children,
  position = TimelineItemPosition.Left,
}: TimelineItemProps): ReactElement {
  const height = endPercent - startPercent;

  const isLeft = position === TimelineItemPosition.Left;
  const containerClass = `absolute ${isLeft ? "left-0" : "right-0"} w-1/2`;
  const justifyClass = isLeft ? "justify-start" : "justify-end";

  console.log(startPercent);
  return (
    <div
      className={containerClass}
      style={{
        top: `${startPercent}%`,
        height: `${height}%`,
      }}
    >
      <div className={`flex ${justifyClass}`}>
        <div className="relative border rounded-lg shadow p-4">{children}</div>
      </div>
    </div>
  );
}
