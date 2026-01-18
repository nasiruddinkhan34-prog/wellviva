export default function IncomeCard() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-bold mb-4">Income Summary</h3>

      <div className="space-y-2 text-sm">
        <p>Net Income: ₹0</p>
        <p>Paid Withdrawal: ₹0</p>
        <p>Pending Withdrawal: ₹0</p>
      </div>
    </div>
  );
}
