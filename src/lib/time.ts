import { piped } from "remeda";
import { throwError } from "./util";

export const now = (): Date => new Date();
export const today = now;

export function toMMSlashDD(now: Date): string {
  const [month, day] = [now.getMonth() + 1, now.getDate()].map((n) =>
    String(n).padStart(2, "0")
  );

  return `${month}/${day}`;
}

function extractHoursAndMinutes(time: string): [number, number] {
  const [hours, minutes] = time.split(":").map((part) => parseInt(part, 10));
  if (isNaN(hours) || isNaN(minutes)) {
    throwError("Invalid time format");
  }
  return [hours, minutes];
}

export const getAdjustedHours = ([hours, minutes]: [number, number]): number =>
  minutes <= 30 ? hours : hours + 1;

export const aboutHours = piped(extractHoursAndMinutes, getAdjustedHours);
