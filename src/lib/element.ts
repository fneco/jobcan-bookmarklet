import { pipe } from "remeda";

export type Document = { querySelector: (selectors: string) => Element | null };
export type ToDocument = (html: string) => Document;
export type EnvUtils = {
  getHtml: () => Promise<string>;
  toDocument: ToDocument;
};

const tableElement =
  (selectors: string) =>
  (doc: Document): Element | null =>
    doc.querySelector(selectors);

export const getDocument: (env: EnvUtils) => Promise<Document> = async ({
  getHtml,
  toDocument,
}) => pipe(await getHtml(), toDocument);

export const getTableElement: (
  tableSelector: string
) => (env: EnvUtils) => Promise<Element | null> =
  (tableSelector) => async (env) =>
    pipe(await getDocument(env), tableElement(tableSelector));

export function parseTableHeads(table: Element): string[] {
  return Array.from(table.querySelectorAll("thead th")).reduce<string[]>(
    (keys, th, index) => {
      keys.push(th.textContent?.trim() || `Column${index + 1}`);
      return keys;
    },
    []
  );
}

export function parseTableRows(
  table: Element
): Record<string, string | undefined>[] {
  const keys = parseTableHeads(table);
  const rows: Record<string, string | undefined>[] = [];

  table.querySelectorAll("tbody tr").forEach((tr) => {
    const row: Record<string, string | undefined> = {};

    tr.querySelectorAll("td").forEach((td, index) => {
      const key = keys[index] || `Column${index + 1}`;
      row[key] = td.textContent?.trim();
    });

    rows.push(row);
  });

  return rows;
}
