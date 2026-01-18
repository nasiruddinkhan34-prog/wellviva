export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl p-5 shadow">
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}
