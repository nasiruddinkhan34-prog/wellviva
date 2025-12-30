import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MlmDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/mlm/dashboard").then(res => setStats(res.data));
  }, []);

  if (!stats) return "Loading...";

  return (
    <div className="p-6">
      <h2>MLM Dashboard</h2>
      <p>Referral Code: {stats.profile.referralCode}</p>
      <p>Wallet: ₹{stats.wallet}</p>
      <p>Left BV: {stats.bv.left}</p>
      <p>Right BV: {stats.bv.right}</p>
    </div>
  );
}
