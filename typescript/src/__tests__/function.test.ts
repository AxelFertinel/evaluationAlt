import { getDataFile, parsingData } from "../function";
import * as path from "path";

describe("getDataFile", () => {
  it("returns the correct joined path", () => {
    const file = "customers.csv";
    const result = getDataFile(file);
    const expectedResult = path.join(file);
    expect(result.endsWith(expectedResult)).toBe(true);
  });
});

describe("parsingData", () => {
  it("parses data file into an array of objects", () => {
    const dataFilePath = getDataFile("customers.csv");
    const result = parsingData(dataFilePath);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
