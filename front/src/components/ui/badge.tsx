export default function Badge(label: string, status: string) {
  return <div className={`badge bg-${status}`}>{label}</div>;
}
