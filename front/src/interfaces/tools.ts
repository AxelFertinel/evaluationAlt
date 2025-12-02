export type Tool = {
  id: string;
  name: string;
  category: string;
  monthly_cost: number;
  previous_month_cost: number;
  owner_department: string;
  active_users_count: number;
  status: "active" | "unused" | "expiring";
  updated_at: string;
};

export interface Tools {
  owner_department: any;
  status: string;
  monthly_cost: number;
  tools?: Tool[];
}
