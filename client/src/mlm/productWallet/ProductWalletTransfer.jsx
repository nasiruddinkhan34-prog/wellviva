import "./productWallet.css";

export default function ProductWalletTransfer() {
  return (
    <div className="wallet-wrapper">
      <div className="wallet-card">
        <div className="wallet-header">Product Wallet Transfer</div>

        <div className="wallet-form">
          <label>Current Balance</label>
          <input value="5580.00" disabled />

          <label>Enter Amount</label>
          <input placeholder="Enter Amount" />

          <label>Direct Seller ID</label>
          <input placeholder="Enter Direct Seller ID" />

          <label>Direct Seller Name</label>
          <input placeholder="Direct Seller Name" disabled />

          <label>Transaction / Account Password</label>
          <input
            type="password"
            placeholder="Account Password"
          />

          <button className="btn-submit">Transfer</button>
        </div>
      </div>
    </div>
  );
}
