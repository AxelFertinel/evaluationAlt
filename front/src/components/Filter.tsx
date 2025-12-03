import type { FilterItem } from "@/interfaces/filter";

export const FilterRenderer = ({ filter }: { filter: FilterItem }) => {
  switch (filter.type) {
    case "select":
      return (
        <select
          value={filter.value}
          disabled={filter.disabled}
          onChange={(e) =>
            filter.onChange(
              isNaN(Number(e.target.value))
                ? e.target.value
                : Number(e.target.value)
            )
          }
          className="w-full border rounded-md px-3 py-2"
        >
          {filter.options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "input":
      return (
        <input
          type="text"
          value={filter.value}
          disabled={filter.disabled}
          onChange={(e) => filter.onChange(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      );

    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={filter.value}
          disabled={filter.disabled}
          onChange={(e) => filter.onChange(e.target.checked)}
          className="h-4 w-4"
        />
      );
  }
};
