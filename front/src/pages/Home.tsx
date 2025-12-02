import ToolsTable from "./tools/ToolsTable";
import { useTools } from "@/hooks/useTools";
import { useToolsStats } from "@/hooks/useToolsStats";
import { StatsGrid } from "@/components/StatsGrid";

const Home = () => {
  const { tools } = useTools();
  const stats = useToolsStats(tools);

  return (
    <div className="container">
      <div className="mb-5 mt-5">
        <h1>Header</h1>
        <p>
          Monitoring and manage your organization's software tool and expenses
        </p>
      </div>

      <StatsGrid {...stats} />

      <div className="p-5 bg-card text-card-foreground rounded-lg shadow-sm">
        <h2>Recent Tools</h2>
        <ToolsTable tools={tools} />
      </div>
    </div>
  );
};

export default Home;
