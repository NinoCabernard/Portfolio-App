export class DateUtils {
  static toDateRange(
    input:
      | Date
      | string
      | { start: Date | string; end: Date | string | undefined }
  ): DateRange {
    if (input instanceof Date || typeof input === "string") {
      const date = input instanceof Date ? input : new Date(input);
      return { start: date, end: date };
    }

    const start =
      input.start instanceof Date ? input.start : new Date(input.start);
    const end =
      input.end instanceof Date ? input.end : new Date(input.end ?? new Date());

    return { start, end };
  }
}

const MILLISECONDS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

export function getYearsBetween(start: Date, end: Date): number {
  return Math.max(0, end.getTime() - start.getTime()) / MILLISECONDS_PER_YEAR;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export function isDateRangeInside(
  rangeToCheck: DateRange,
  containerRange: DateRange
): boolean {
  return (
    rangeToCheck.start >= containerRange.start &&
    rangeToCheck.end <= containerRange.end
  );
}

export function isDateInside(
  dateToCheck: Date,
  containerRange: DateRange
): boolean {
  return (
    dateToCheck >= containerRange.start && dateToCheck <= containerRange.end
  );
}
