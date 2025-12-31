export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value="124" />
        <StatCard title="Total Users" value="89" />
        <StatCard title="Products" value="32" />
        <StatCard title="Revenue" value="₹1,24,500" />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
