import { useEffect, useState } from "react";
import api from "../api/axios";
import MlmLayout from "./MlmLayout";

export default function MlmDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/mlm/dashboard")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("MLM Dashboard Error:", err);
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
    <MlmLayout
      user={{
        name: stats.profile?.name,
        wallet: stats.wallet ?? 0,
      }}
    >
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT PROFILE CARD */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow overflow-hidden">
          {/* TOP GREEN SECTION */}
          <div className="bg-gradient-to-r from-green-700 to-green-500 p-6 text-white text-center">
            <div className="w-28 h-28 mx-auto rounded-full bg-white mb-4" />
            <h3 className="text-lg font-bold">
              {stats.profile?.name}
            </h3>
            <p className="text-sm opacity-90">
              {stats.profile?.email}
            </p>
          </div>

          {/* DETAILS */}
          <div className="p-4 text-sm space-y-2">
            <p>
              <b>Referral Code:</b> {stats.profile?.referralCode}
            </p>
            <p>
              <b>Upline ID:</b> {stats.profile?.uplineId ?? "-"}
            </p>
            <p>
              <b>Rank:</b> {stats.profile?.rank}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span className="text-green-600 font-semibold">
                {stats.profile?.status}
              </span>
            </p>

            <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
              Copy Referral Link
            </button>
          </div>
        </div>

        {/* RIGHT DASHBOARD CONTENT */}
        <div className="space-y-6">

          {/* TOP SUMMARY CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <WhiteCard
              title="Account Balance"
              value={`₹ ${stats.wallet ?? 0}`}
            />
            <DarkCard
              title="Personal BV"
              value={stats.bv?.personal ?? 0}
            />
            <DarkCard
              title="Left BV"
              value={stats.bv?.left ?? 0}
            />
            <DarkCard
              title="Right BV"
              value={stats.bv?.right ?? 0}
            />
          </div>

          {/* BV TOTALS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DarkCard
              title="Total Left BV"
              value={stats.bv?.totalLeft ?? 0}
            />
            <GoldCard
              title="Total Right BV"
              value={stats.bv?.totalRight ?? 0}
            />
          </div>

          {/* INCOME + NOTIFICATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WhiteCard title="Income Summary">
              <p>Net Income: ₹0</p>
              <p>Paid Withdrawal: ₹0</p>
              <p>Pending Withdrawal: ₹0</p>
            </WhiteCard>

            <WhiteCard title="Notifications">
              <p className="text-sm text-gray-500">
                No notifications yet
              </p>
            </WhiteCard>
          </div>

        </div>
      </div>
    </MlmLayout>
  );
}

/* ======================================================
   CARD COMPONENTS (LOCAL)
====================================================== */

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
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
}

function GoldCard({ title, value }) {
  return (
    <div className="bg-gradient-to-r from-[#b99a3a] to-[#2f8f2f] rounded-xl p-6 text-white shadow">
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
}
