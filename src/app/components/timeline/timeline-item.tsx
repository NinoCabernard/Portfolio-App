import type { ReactElement, ReactNode } from "react";

export interface TimelineItemProps {
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  position: TimelineItemPosition;

  children?: ReactNode;
}
enum TimelineItemPosition {
  Left,
  Right,
}

export default function TimelineItem({
  startDate,
  endDate,
  children,
}: TimelineItemProps): ReactElement {
  return <div className="bg-gray-500 flex-1">{children} </div>;
}
