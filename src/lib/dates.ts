import type { YearMonth } from "../content/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

interface Parsed {
  year: number;
  month: number;
}

function parse(value: YearMonth): Parsed {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month || month < 1 || month > 12) {
    throw new Error(`Invalid YearMonth: "${value}". Expected "YYYY-MM".`);
  }
  return { year, month };
}

function toIndex({ year, month }: Parsed): number {
  return year * 12 + (month - 1);
}

function nowIndex(): number {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

export function formatMonth(value: YearMonth): string {
  const { year, month } = parse(value);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatRange(start: YearMonth, end: YearMonth | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

export function monthsBetween(start: YearMonth, end: YearMonth | null): number {
  const from = toIndex(parse(start));
  const to = end ? toIndex(parse(end)) : nowIndex();
  return Math.max(1, to - from + 1);
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (rest > 0) parts.push(`${rest} ${rest === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

export function totalMonths(
  entries: { start: YearMonth; end: YearMonth | null }[],
): number {
  if (entries.length === 0) return 0;
  const from = Math.min(...entries.map((e) => toIndex(parse(e.start))));
  const to = Math.max(
    ...entries.map((e) => (e.end ? toIndex(parse(e.end)) : nowIndex())),
  );
  return to - from + 1;
}
