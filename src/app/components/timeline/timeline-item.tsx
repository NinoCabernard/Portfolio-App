import "./timeline-item.css";
import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { format } from "date-fns";
import { AnimatePresence, motion } from "motion/react";

export interface TimelineItemProps {
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  title: string | undefined;
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
  title,
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

  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    setExpanded(!expanded);
  }

  return (
    <div className="timeline-item" onClick={toggleExpand}>
      <div className="timeline-item-title-container">
        <h2 className="timeline-item-title">
          <b>{title ?? "no title provided"}</b>
        </h2>
        <b className="timeline-item-date">
          {startDateString + " - " + endDateString}
        </b>
      </div>
      <p>{description}</p>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="timeline-item-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
