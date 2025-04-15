import { getAttendanceHtml, workHours } from "./jobcan";
import { copyToClipboard, today, toDocument } from "./lib";

async function main() {
  const hours = await workHours(today(), {
    getHtml: getAttendanceHtml,
    toDocument,
  });

  alert(`今日は約${hours}時間働きました。`);
  copyToClipboard(String(hours));
}

main();
