import { parsingData, loyaltyPoints } from "../function";

describe("parsingData", () => {
  it("parses data file into an array of objects", () => {
    const dataFilePath = "orders.csv";
    const result = parsingData(dataFilePath);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("loyaltyPoints", () => {
  it("calculates loyalty points correctly", () => {
    const orders = [
      {
        id: "O005",
        customer_id: "C002",
        product_id: "P007",
        qty: "3",
        unit_price: "8.99",
        date: "2025-01-16",
        promo_code: "",
        time: "09:15",
      },
    ] as any[];
    const points = loyaltyPoints(orders);
    console.log(points);
    expect(points).toBeCloseTo(0.2697, 4);
  });
});
