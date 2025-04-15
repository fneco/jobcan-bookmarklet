import { pipe } from "remeda";
import { throwError } from "./util";

export type Document = { querySelector: (selectors: string) => Element | null };
export type ToDocument = (html: string) => Document;
export type EnvUtils = {
  getHtml: () => Promise<string>;
  toDocument: ToDocument;
};

const tableElement =
  (selectors: string) =>
  (doc: Document): Element =>
    doc.querySelector(selectors) ?? throwError("Table element not found");

export const getTableElement =
  (tableSelector: string) =>
  async ({ getHtml, toDocument }: EnvUtils) =>
    pipe(await getHtml(), toDocument, tableElement(tableSelector));

export function parseTableHeads(table: Element): string[] {
  return Array.from(table.querySelectorAll("thead th")).reduce<string[]>(
    (keys, th, index) => {
      keys.push(th.textContent?.trim() || `Column${index + 1}`);
      return keys;
    },
    []
  );
}

export function parseTableRows(table: Element): Record<string, string>[] {
  const keys = parseTableHeads(table);
  const rows: Record<string, string>[] = [];

  table.querySelectorAll("tbody tr").forEach((tr) => {
    const row: Record<string, string> = {};

    tr.querySelectorAll("td").forEach((td, index) => {
      const key = keys[index] || `Column${index + 1}`;
      row[key] = td.textContent?.trim() || "";
    });

    rows.push(row);
  });

  return rows;
}
