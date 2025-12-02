import type { Tool } from "@/interfaces/tools";
import { StatsCalculator } from "@/services/StatsCalculator";
import { useMemo } from "react";


export const useToolsStats = (tools: Tool[]) => {
  return useMemo(() => {
    const totalMonthlyCost = StatsCalculator.calculateTotalMonthlyCost(tools);
    const activeToolsCount = StatsCalculator.calculateActiveToolsCount(tools);
    const departmentsCount = StatsCalculator.calculateDepartmentsCount(tools);
    const totalUsers = StatsCalculator.calculateTotalUsers(tools);
    const costPerUser = StatsCalculator.calculateCostPerUser(
      totalMonthlyCost,
      totalUsers
    );

    return {
      totalMonthlyCost,
      activeToolsCount,
      departmentsCount,
      totalUsers,
      costPerUser,
    };
  }, [tools]);
};
