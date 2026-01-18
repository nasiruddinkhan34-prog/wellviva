export default function ProfileCard({ profile }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4" />

      <h3 className="font-bold text-lg">{profile.name}</h3>
      <p className="text-sm text-gray-500">{profile.email}</p>

      <div className="mt-4 text-left space-y-2 text-sm">
        <p><b>Referral Code:</b> {profile.referralCode}</p>
        <p><b>Upline ID:</b> {profile.uplineId ?? "-"}</p>
        <p><b>Rank:</b> {profile.rank}</p>
        <p><b>Status:</b> {profile.status}</p>
      </div>

      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded">
        Copy Referral Link
      </button>
    </div>
  );
}
