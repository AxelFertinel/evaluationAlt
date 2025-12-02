export default function Badge(status: string) {
  const label = status.toUpperCase();
  return <div className={`badge bg-${status}`}>{label}</div>;
}
