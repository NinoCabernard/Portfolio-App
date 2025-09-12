import { motion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";
import React from "react";

// Helper: convert date to timestamp
const toTimestamp = (date: string | Date): number => new Date(date).getTime();

interface TimelineProps {
  start: string | Date;
  end: string | Date;
  children: ReactElement<TimelineItemProps>[] | ReactElement<TimelineItemProps>;
}

// Timeline component
export default function Timeline({ start, end, children }: TimelineProps) {
  const startTime = toTimestamp(start);
  const endTime = toTimestamp(end);
  const totalDuration = endTime - startTime;

  // Wrap children with positioning
  const positionedChildren = React.Children.map(children, (child) => {
    if (!child.props.startDate || !child.props.end) return null;

    const childStart = toTimestamp(child.props.startDate);
    const childEnd = toTimestamp(child.props.end);

    const left = ((childStart - startTime) / totalDuration) * 100;
    const width = ((childEnd - childStart) / totalDuration) * 100;

    return (
      <motion.div
        className="absolute top-0 h-full rounded-2xl shadow-md bg-blue-500 text-white flex items-center justify-center text-sm"
        style={{ left: `${left}%`, width: `${width}%` }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {child.props.children}
      </motion.div>
    );
  });

  return (
    <div className="relative w-full h-16 border rounded-2xl bg-gray-100 overflow-hidden">
      {positionedChildren}
    </div>
  );
}

// Types for child props
interface TimelineItemProps {
  startDate: Date | string | undefined;
  end: string | Date | undefined;

  children?: ReactNode;
}

export function TimelineItem({
  startDate,
  end,
  children,
}: TimelineItemProps): ReactElement {
  return <div className="bg-gray-500">{children} </div>;
}

// Example usage (tsx):
//
// <Timeline start="2023-01-01" end="2023-12-31">
//   <div start="
