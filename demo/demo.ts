import { JSDOM } from "jsdom";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { workHours } from "../src/jobcan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getHtml = () => readFile(resolve(__dirname, "demo.html"), "utf-8");
const toDocument = (html: string) => new JSDOM(html).window.document;

const hours = await workHours(new Date("2025/4/2"), { getHtml, toDocument });

console.log(`2025/4/2 は約${hours}時間働きました。`);
