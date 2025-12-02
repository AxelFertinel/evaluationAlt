export interface Tool {
  id: number;
  name: string;
  category: string;
  status: string;
  active_users_count: number;
  updated_at: Date;
  monthly_cost: number;
  owner_department?: string;
}

export interface Tools {
  owner_department: any;
  status: string;
  monthly_cost: number;
  tools: Tool[];
}
