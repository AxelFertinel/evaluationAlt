import * as path from "path";
import * as fs from "fs";

export function getDataFile(file: string): string {
  const base = "../typescript/legacy/data/";
  return path.join(base, file);
}

export function parsingData(data: string): any[] {
  const csv = fs.readFileSync(data, "utf-8");
  const lines = csv.split("\n").filter((l) => l.trim());
  if (lines.length === 0) return [];

  const headers = lines[0]
    .replace(/\r$/, "")
    .split(",")
    .map((h) => h.trim());

  const rows = lines.slice(1).map((line) => {
    const cleaned = line.replace(/\r$/, "");
    const parts = cleaned.split(",").map((p) => p.trim());
    const obj: Record<string, string> = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = parts[i] ?? "";
    }
    return obj;
  });

  return rows;
}
