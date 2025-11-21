import * as path from "path";

export default function getDataFile(filePath: string, file: string): string {
  const base = __dirname;
  return path.join(base, filePath, file);
}
