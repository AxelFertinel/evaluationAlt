import { parsingData } from "../function";



describe("parsingData", () => {
  it("parses data file into an array of objects", () => {
    const dataFilePath = "customers.csv";
    const result = parsingData(dataFilePath);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
