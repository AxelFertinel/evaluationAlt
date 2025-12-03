import { useState, useMemo } from "react";
import { StatsGrid } from "@/components/StatsGrid";
import { ErreurApi } from "@/components/ErreurApi";

import ToolsTable from "../components/ToolsTable";
import { useTools } from "@/hooks/useTools";
import { useToolsStats } from "@/hooks/useToolsStats";

import type { FilterItem } from "@/interfaces/filter";
import { useSorting } from "@/hooks/useStorting";
import { FilterGroup } from "@/components/FilterGroup";
import type { Tool } from "@/interfaces/tools";

const Home = () => {
  const { tools: allTools, error, loading } = useTools();
  const stats = useToolsStats(allTools);

  const [limit, setLimit] = useState<number>(8);
  const [activeFilter, setActiveFilter] = useState<boolean>(false);

  const { sortField, setSortField, sortOrder, setSortOrder, sort } =
    useSorting<Tool>();

  const filteredTools = useMemo(() => {
    let result = [...allTools];

    if (activeFilter) {
      result = result.filter((t) => t.status === "active");
    }

    result = sort(result);

    return limit > 0 ? result.slice(0, limit) : result;
  }, [allTools, limit, activeFilter, sortField, sortOrder]);

  const toolFilters: FilterItem[] = [
    {
      label: "Nombre d'outils à afficher",
      type: "select",
      value: limit,
      onChange: (v) => setLimit(Number(v)),
      options: [
        { label: "5", value: 5 },
        { label: "8", value: 8 },
        { label: "10", value: 10 },
        { label: "15", value: 15 },
        { label: "20", value: 20 },
        { label: `Tous (${allTools.length})`, value: 0 },
      ],
    },
    {
      label: "Trier par",
      type: "select",
      value: sortField,
      onChange: (v) => setSortField(v as keyof Tool),
      options: [
        { label: "Par défaut", value: "" },
        { label: "Nom", value: "name" },
        { label: "Prix mensuel", value: "monthly_cost" },
      ],
    },

    {
      label: "Ordre",
      type: "select",
      value: sortOrder,
      disabled: !sortField,
      onChange: (v) => setSortOrder(v as "asc" | "desc"),
      options: [
        { label: "Croissant", value: "asc" },
        { label: "Décroissant", value: "desc" },
      ],
    },
    {
      label: "Actifs uniquement",
      type: "checkbox",
      value: activeFilter,
      onChange: (v) => setActiveFilter(v),
    },
  ];

  if (loading) return <div className="container p-8">Chargement...</div>;
  if (error) return <ErreurApi message={error.message} />;

  return (
    <div className="container mx-auto mt-5">
      <header className="mb-5">
        <h1 className="text-2xl font-bold">Outils</h1>
        <p className="text-gray-600">
          Monitoring and manage your organization's software tools and expenses
        </p>
      </header>

      {/* Stats */}
      <StatsGrid {...stats} />

      {/* Filtres génériques */}
      <FilterGroup title="Filtres" filters={toolFilters} />

      {/* Tableau */}
      <ToolsTable tools={filteredTools} />
    </div>
  );
};

export default Home;
