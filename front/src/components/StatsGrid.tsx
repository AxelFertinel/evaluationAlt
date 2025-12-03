import { TrendingUp, Wrench, Newspaper, Users } from "lucide-react";
import { StatCard } from "@/components/StatCard";

interface StatsGridProps {
  totalMonthlyCost: number;
  activeToolsCount: number;
  departmentsCount: number;
  costPerUser: string;
}

export const StatsGrid = ({
  totalMonthlyCost,
  activeToolsCount,
  departmentsCount,
  costPerUser,
}: StatsGridProps) => {
  return (
    <div className="mb-5 grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        title="Monthly Budget"
        value={`€${totalMonthlyCost}`}
        icon={<TrendingUp color="white" size={20} />}
        badge="+12%"
        color="bg-budget"
      />
      <StatCard
        title="Active Tools"
        value={activeToolsCount}
        icon={<Wrench color="white" size={20} />}
        badge="+8%"
        color="bg-tool"
      />
      <StatCard
        title="Departments"
        value={departmentsCount}
        icon={<Newspaper color="white" size={20} />}
        badge="+2"
        color="bg-department"
      />
      <StatCard
        title="Cost/User"
        value={`€${costPerUser}`}
        icon={<Users color="white" size={20} />}
        badge="-€12"
        color="bg-user"
      />
    </div>
  );
};
