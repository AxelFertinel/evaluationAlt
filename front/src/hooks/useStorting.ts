
import { useState, useCallback } from "react";

export const useSorting = <T>() => {
  const [sortField, setSortField] = useState<keyof T | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const sort = useCallback(
    (data: T[]) => {
      if (!sortField) return [...data];

      return [...data].sort((a, b) => {
       
        const aVal = a[sortField as keyof T];
        const bVal = b[sortField as keyof T];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortOrder === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        const aStr = String(aVal ?? "");
        const bStr = String(bVal ?? "");
        return sortOrder === "asc"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    },
    [sortField, sortOrder]
  );

  return {
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    sort,
  } as const;
};
