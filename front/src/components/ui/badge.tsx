export default function Badge(status: string) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return <div className={`badge bg-${status}`}>{label}</div>;
}
