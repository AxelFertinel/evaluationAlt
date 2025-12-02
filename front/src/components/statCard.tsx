import type { statCard } from "@/interfaces/statCard";

export const StatCard = ({ title, value, icon, badge, color }: statCard) => (
  <div className="rounded-lg border bg-card shadow-sm flex flex-col h-full p-5">
    <div className="flex justify-between mb-5">
      <p>{title}</p>
      <div className={`p-1.5 ${color} rounded-lg`}>{icon}</div>
    </div>
    <div>
      <p className="text-xl font-bold">{value}</p>
      <p className={`${color} text-sm badge`}>{badge}</p>
    </div>
  </div>
);
