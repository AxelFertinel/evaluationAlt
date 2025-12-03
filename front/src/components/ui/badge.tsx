interface BadgeProps {
  status: string;
}

export const Badge = ({ status }: BadgeProps) => {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <div className={`badge bg-${status}`}>{label}</div>;
};
