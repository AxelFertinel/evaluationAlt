import type { Tool } from "@/interfaces/tools";

export class StatsCalculator {
  static calculateTotalMonthlyCost(tools: Tool[]): number {
    return tools.reduce((sum, tool) => sum + (tool.monthly_cost || 0), 0);
  }

  static calculateActiveToolsCount(tools: Tool[]): number {
    return tools.filter((tool) => tool.status === "active").length;
  }

  static calculateDepartmentsCount(tools: Tool[]): number {
    return new Set(tools.map((tool) => tool.owner_department)).size;
  }

  static calculateTotalUsers(tools: Tool[]): number {
    return tools.reduce((sum, tool) => sum + (tool.active_users_count || 0), 0);
  }

  static calculateCostPerUser(totalCost: number, totalUsers: number): string {
    return totalUsers > 0 ? (totalCost / totalUsers).toFixed(2) : "0.00";
  }
}
