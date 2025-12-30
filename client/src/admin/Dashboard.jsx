import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Orders" value="1,245" />
        <StatsCard title="Revenue" value="₹4.8L" />
        <StatsCard title="Users" value="3,210" />
        <StatsCard title="MLM Members" value="680" />
      </div>
    </>
  );
}
