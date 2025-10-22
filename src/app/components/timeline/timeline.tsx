import "./timeline.css";
import type { ReactElement } from "react";
import TimelineItem, { TimelineItemPosition } from "./timeline-item";
import { DateUtils, isDateInside, isDateRangeInside } from "~/utils/DateUtils";

interface TimelineProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  events: TimelineEvent[] | undefined;
}

export class TimelineEvent {
  startDate!: Date;
  endDate: Date | undefined;
  name: string | undefined;
  description: string | undefined;
  position!: TimelineItemPosition;
  children: ReactElement | undefined;
}

function getEventsDuringEvent(events: TimelineEvent[], event: TimelineEvent) {
  let dateRange = DateUtils.toDateRange({
    start: event.startDate!,
    end: event.endDate,
  });

  return events.filter(
    (x) =>
      isDateInside(x.startDate, dateRange) ||
      (x.endDate != undefined && isDateInside(x.endDate, dateRange))
  );
}

function getMaxEntriesInSamePosition(events: TimelineEvent[]): number {
  const counts: Record<number, number> = {};

  for (const event of events) {
    counts[event.position] = (counts[event.position] || 0) + 1;
  }

  return Math.max(...Object.values(counts));
}

function createDomFromEvent(
  event: TimelineEvent,
  gridRow: number,
  gridRowSpan: number
) {
  const gridColumn = event.position == TimelineItemPosition.Left ? 1 : 3;
  const timeLineItemStyle = {
    gridRow: `${gridRow} / span ${gridRowSpan}`,
    gridColumn: gridColumn,
  };
  return (
    <div className={`timeline-item-container`} style={timeLineItemStyle}>
      <TimelineItem
        startDate={event.startDate}
        endDate={event.endDate}
        title={event.name}
        description={event.description}
      >
        {event.children}
      </TimelineItem>
    </div>
  );
}

export default function Timeline(timelineProps: TimelineProps) {
  const events = timelineProps.events ?? [];
  if (events.length === 0) return <div>No events</div>;

  const orderedEvents = [...events].sort((a, b) => {
    const startA = a.endDate ? new Date(a.endDate).getTime() : 0;
    const startB = b.endDate ? new Date(b.endDate).getTime() : 0;
    return startB - startA;
  });

  const gridRowPositionMap = new Map();
  gridRowPositionMap.set(TimelineItemPosition.Left, 1);
  gridRowPositionMap.set(TimelineItemPosition.Right, 1);
  let timelineItems: any[] = [];
  let currentRow = 1;
  const finishedEvents: TimelineEvent[] = [];
  orderedEvents.forEach((timelineEvent) => {
    if (finishedEvents.find((x) => x === timelineEvent)) {
      return;
    }
    var eventsInEvent = getEventsDuringEvent(orderedEvents, timelineEvent);

    const maxLength = getMaxEntriesInSamePosition(eventsInEvent);
    const items = eventsInEvent.map((eventWithin, index) => {
      currentRow = gridRowPositionMap.get(eventWithin.position);
      const rowSpan =
        maxLength +
        1 -
        eventsInEvent.filter((x) => x.position == eventWithin.position).length;
      const dom = createDomFromEvent(eventWithin, currentRow, rowSpan);
      currentRow++;
      gridRowPositionMap.set(eventWithin.position, currentRow);
      finishedEvents.push(eventWithin);
      return dom;
    });
    timelineItems = timelineItems.concat(items);
    gridRowPositionMap.forEach((value, position) => {
      gridRowPositionMap.set(position, currentRow);
    });
  });

  const amountOfRows = Math.max(...gridRowPositionMap.values());

  const timelineLineStyle = {
    gridRow: `1 / span ${amountOfRows}`,
  };
  return (
    <div className="timeline">
      <div className="timeline-items-container">
        <div className="timeline-line" style={timelineLineStyle} />
        {timelineItems}
      </div>
    </div>
  );
}
