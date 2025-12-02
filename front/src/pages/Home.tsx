import { TrendingUp, Wrench, Newspaper, Users } from "lucide-react";
import ToolsTable from "./tools/ToolsTable";
import { useTools } from "@/hooks/useTools";
import { StatCard } from "@/components/statCard";

const Home = () => {
  const { tools } = useTools();

  // --- Calculs dérivés ---
  const totalMonthlyCost = tools.reduce(
    (sum, tool) => sum + (tool.monthly_cost || 0),
    0
  );

  const activeToolsCount = tools.filter(
    (tool) => tool.status === "active"
  ).length;

  const uniqueDepartmentsCount = new Set(
    tools.map((tool) => tool.owner_department)
  ).size;

  return (
    <div className="container">
      <div className="mb-5 mt-5">
        <h1>Header</h1>
        <p>
          Monitoring and manage your organization's software tool and expenses
        </p>
      </div>

      <div className="mb-5 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Monthly Budget */}
        <StatCard
          title="Monthly Budget"
          value={`€${totalMonthlyCost}`}
          icon={<TrendingUp color="white" size={20} />}
          badge="+12%"
          color="bg-budget"
        />

        {/* Active Tools */}
        <StatCard
          title="Active Tools"
          value={activeToolsCount}
          icon={<Wrench color="white" size={20} />}
          badge="+8%"
          color="bg-tool"
        />

        {/* Departments */}
        <StatCard
          title="Departments"
          value={uniqueDepartmentsCount}
          icon={<Newspaper color="white" size={20} />}
          badge="+2"
          color="bg-department"
        />

        {/* Cost/User */}
        <StatCard
          title="Cost/User"
          value="€156"
          icon={<Users color="white" size={20} />}
          badge="-€12"
          color="bg-user"
        />
      </div>

      <div className="p-5 bg-card text-card-foreground rounded-lg shadow-sm">
        <h2>Recent Tools</h2>
        <ToolsTable tools={tools} />
      </div>
    </div>
  );
};

export default Home;
