import { JSDOM } from "jsdom";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { workHours } from "../src/domain/work-hours";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getHtml = () => readFile(resolve(__dirname, "demo.html"), "utf-8");
const toDocument = (html: string) => new JSDOM(html).window.document;
const workHoursNode = workHours({ getHtml, toDocument });
{
  const today = "2025/4/1";
  const hours = await workHoursNode(new Date(today));

  console.log(`${today} は約${hours}時間働きました。`);
}
{
  const today = "2025/4/2";
  const hours = await workHoursNode(new Date(today));

  console.log(`${today} は約${hours}時間働きました。`);
}
{
  const hours = await workHoursNode(new Date("2025/4/3"));
  if (hours instanceof Error) {
    console.error(hours.message);
  }
}
{
  const hours = await workHoursNode(new Date("2025/4/4"));
  if (hours instanceof Error) {
    console.error(hours.message);
  }
}
