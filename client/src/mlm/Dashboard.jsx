import { useEffect, useState } from "react";
import api from "../api/axios";

/* ===============================
   CARD COMPONENTS
================================ */

function WhiteCard({ title, value, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-sm text-gray-500">{title}</p>
      {value !== undefined ? (
        <h2 className="text-xl font-bold mt-1">{value}</h2>
      ) : (
        <div className="mt-2 text-sm space-y-1">{children}</div>
      )}
    </div>
  );
}

function DarkCard({ title, value }) {
  return (
    <div className="bg-[#3e4a5a] rounded-xl p-6 text-white shadow">
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value ?? 0}</h2>
    </div>
  );
}

function GoldCard({ title, value }) {
  return (
    <div className="bg-gradient-to-r from-[#b99a3a] to-[#2f8f2f] rounded-xl p-6 text-white shadow">
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value ?? 0}</h2>
    </div>
  );
}

/* ===============================
   DASHBOARD COMPONENT
================================ */

export default function MlmDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/mlm/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("MLM Dashboard Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-6 text-red-500">Failed to load dashboard</div>;
  }

  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      {/* LEFT PROFILE */}
      <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-gradient-to-r from-green-700 to-green-500 p-6 text-white text-center">
          <div className="w-28 h-28 mx-auto rounded-full bg-white mb-4" />
          <h3 className="text-lg font-bold">
            {stats.profile?.name || "—"}
          </h3>
          <p className="text-sm opacity-90">
            {stats.profile?.email || ""}
          </p>
        </div>
{console.log(stats)}
        <div className="p-4 text-sm space-y-2">
          <p><b>Referral Code:</b> {stats.profile?.referralCode || "-"}</p>
          <p><b>Upline ID:</b> {stats.profile?.uplineId ?? "-"}</p>
          <p><b>Rank:</b> {stats.profile?.rank || "-"}</p>
          <p>
            <b>Status:</b>{" "}
            <span className="text-green-600 font-semibold">
              {stats.profile?.status || "-"}
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <WhiteCard title="Account Balance" value={`₹ ${stats.wallet ?? 0}`} />
          <DarkCard title="Personal BV" value={stats.bv?.personal} />
          <DarkCard title="Left BV" value={stats.bv?.left} />
          <DarkCard title="Right BV" value={stats.bv?.right} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DarkCard title="Total Left BV" value={stats.bv?.totalLeft} />
          <GoldCard title="Total Right BV" value={stats.bv?.totalRight} />
        </div>
      </div>
    </div>
  );
}
