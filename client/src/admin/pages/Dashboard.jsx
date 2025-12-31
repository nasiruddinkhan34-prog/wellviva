import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Orders" value="124" />
        <StatsCard title="Total Users" value="89" />
        <StatsCard title="Products" value="32" />
        <StatsCard title="Revenue" value="₹1,24,500" />
      </div>
    </div>
  );
}
