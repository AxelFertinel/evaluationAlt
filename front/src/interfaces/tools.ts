export type Tool = {
  id: string;
  name: string;
  description?: string;
  category: string;
  monthly_cost: number;
  owner_department: string;
  previous_month_cost?: number;
  website_url?: string;
  icon_url?: string;
  status: "active" | "unused" | "expiring";
  active_users_count: number;
  created_at?: string;
  updated_at: string;
};
