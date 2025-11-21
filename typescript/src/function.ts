import * as path from "path";
import * as fs from "fs";
import { Order, Promotion } from "./type";
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
    const obj: Record<string, any> = {}; 

    for (let i = 0; i < headers.length; i++) {
      const value = parts[i] ?? "";

      if (value === "true") {
        obj[headers[i]] = true;
      } else if (value === "false") {
        obj[headers[i]] = false;
      } else if (!isNaN(Number(value)) && value !== "") {
        obj[headers[i]] = Number(value);
      } else {
        obj[headers[i]] = value;
      }
    }
    return obj;
  });

  return rows;
}

export function loyaltyPoints(orders: Order[]): number {
  let loyaltyPoints = 0;
  for (const order of orders) {
    loyaltyPoints = order.qty * order.unit_price * LOYALTY_RATIO;
  }
  return loyaltyPoints;
}

export function totalsByCustomer(orders: Order[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const order of orders) {
    if (!totals[order.customer_id]) {
      totals[order.customer_id] = 0;
    }
    totals[order.customer_id] += order.qty * order.unit_price;
  }
  return totals;
}

export function promoCodeDiscount(orders: Order[]): number {
  const promotionCode = parsingData("promotions.csv");
  const totals = totalsByCustomer(orders); // Calcul une seule fois
  let totalDiscount = 0;

  for (const order of orders) {
    if (!order.promo_code) continue;

    const promo = promotionCode.find(
      (p) => p.active && p.code === order.promo_code
    );

    if (!promo) continue;

    const orderTotal = order.qty * order.unit_price;

    if (promo.type === "PERCENTAGE") {
      totalDiscount += (orderTotal * promo.value) / 100;
    } else if (promo.type === "FIXED") {
      totalDiscount += promo.value;
    }
  }

  return totalDiscount;
}
