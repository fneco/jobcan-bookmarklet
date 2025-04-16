import { isEmpty } from "remeda";
import {
  aboutHours,
  copyToClipboard,
  EnvUtils,
  getTableElement,
  parseTableRows,
  today,
  toDocument,
  toMMSlashDD,
} from "../lib";

export const getAttendanceHtml = () =>
  fetch("/employee/attendance").then((res) => res.text());

const getAttendanceTableElement = getTableElement(
  ".table-responsive table.jbc-table"
);

export const workHours = (env: EnvUtils) => async (date: Date) => {
  const table = await getAttendanceTableElement(env);
  if (table == null) {
    return new Error("出勤簿のテーブルが見つかりません。");
  }

  const todayRecord = parseTableRows(table).find((row) =>
    row["日付"]?.includes(toMMSlashDD(date))
  );
  if (todayRecord == null) {
    return new Error("出勤簿に本日日付の行が存在しません。");
  }
  if (isEmpty(todayRecord["労働時間"])) {
    return new Error("出勤簿の本日分に「労働時間」が記載されていません。");
  }

  const hours = aboutHours(todayRecord["労働時間"]);
  if (hours == null) {
    return new Error("出勤簿の「労働時間」に予期せぬデータが存在しました。");
  }

  return hours;
};

const workHoursWeb = workHours({
  getHtml: getAttendanceHtml,
  toDocument,
});

export async function getWorkHours() {
  const hours = await workHoursWeb(today());

  if (hours instanceof Error) {
    alert(hours.message);
    return;
  }

  alert(`今日は約${hours}時間働きました。`);
  copyToClipboard(String(hours));
}
