import "./timeline-item.css";
import { type ReactElement, type ReactNode } from "react";
import { format } from "date-fns";

export interface TimelineItemProps {
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  name: string | undefined;
  description: string | undefined;

  children?: ReactNode;
}

export enum TimelineItemPosition {
  Left,
  Right,
}

export default function TimelineItem({
  startDate,
  endDate,
  name,
  description,
  children,
}: TimelineItemProps): ReactElement {
  const dateFormat = "MMM. yyyy";
  const startDateString = startDate
    ? format(new Date(startDate), dateFormat)
    : "unknown";
  const endDateString = endDate
    ? format(new Date(endDate), dateFormat)
    : "present";

  return (
    <div className={`timeline-item`}>
      <div className="timeline-item-title-container">
        <h2 className="timeline-item-title">
          <b>{name ?? "no title provided"}</b>
        </h2>
        <b className="timeline-item-date">
          {startDateString + " - " + endDateString}
        </b>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
