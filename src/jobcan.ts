import {
  aboutHours,
  EnvUtils,
  getTableElement,
  parseTableRows,
  throwError,
  toMMSlashDD,
} from "./lib";

export const getAttendanceHtml = () =>
  fetch("/employee/attendance").then((res) => res.text());

const getAttendanceTableElement = getTableElement(
  ".table-responsive table.jbc-table"
);

export async function workHours(date: Date, env: EnvUtils): Promise<number> {
  const table = await getAttendanceTableElement(env);

  const todayRecord =
    parseTableRows(table).find((row) =>
      row["日付"].includes(toMMSlashDD(date))
    ) ?? throwError("Today record not found");

  const hours = aboutHours(
    todayRecord["労働時間"] ?? throwError("労働時間 is undefined")
  );

  return hours;
}
