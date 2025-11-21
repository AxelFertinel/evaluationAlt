import * as path from "path";
import * as fs from "fs";
import { Order } from "./type";
import { LOYALTY_RATIO } from "./constants";

export function parsingData(file: string): any[] {
  const base = "../typescript/legacy/data/";
  const data = path.join(base, file);
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

export function loyaltyPoints(orders: Order[]): number {
  return orders.reduce(
    (total, order) => total + Math.floor(order.unit_price * order.qty * LOYALTY_RATIO),
    0
  );
}
