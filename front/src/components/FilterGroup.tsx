import type { FilterItem } from "@/interfaces/filter";
import { FilterRenderer } from "./Filter";

export const FilterGroup = ({
  filters,
  title = "Filtres",
}: {
  filters: FilterItem[];
  title?: string;
}) => (
  <div className="p-5 bg-white rounded-lg shadow-sm mb-5 border">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>

    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4`}>
      {filters.map((filter, index) => (
        <div key={index}>
          <label className="block text-sm font-medium mb-2">
            {filter.label}
          </label>
          <FilterRenderer filter={filter} />
        </div>
      ))}
    </div>
  </div>
);
