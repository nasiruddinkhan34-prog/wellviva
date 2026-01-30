import "./productWallet.css";

export default function ProductWalletTransactions() {
  return (
    <div className="wallet-wrapper">
      {/* TOP ROW */}
      <div className="wallet-top-grid">
        {/* SEARCH CRITERIA */}
        <div className="wallet-card">
          <div className="wallet-header">Search Criteria</div>
          <div className="wallet-form">
            <div className="radio-group">
              <label>
                <input type="checkbox" defaultChecked /> All Record
              </label>
              <label>
                <input type="checkbox" /> Between Dates
              </label>
            </div>

            <button className="btn-submit">Search &gt;&gt;</button>
          </div>
        </div>

        {/* BALANCE CARD */}
        <div className="wallet-balance-card">
          <div className="balance-symbol">₹</div>
          <div className="balance-amount">5580.00</div>
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="wallet-card">
        <div className="wallet-header flex-between">
          <span>Product Wallet Transaction Report</span>
          <span className="record-badge">9 Records</span>
        </div>

        <div className="table-wrapper">
          <table className="wallet-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Direct Seller ID</th>
                <th>Direct Seller Name</th>
                <th>Remarks</th>
                <th>Issue Date</th>
                <th>Issue By</th>
                <th>Nature</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>876876</td>
                <td>NASIR UDDIN KHAN</td>
                <td>
                  Repurchase Order from Product Wallet for User ID 876876
                  <br />
                  Order Id : 1692
                </td>
                <td>07/08/2025</td>
                <td></td>
                <td>Debit</td>
                <td>480.00</td>
              </tr>

              <tr>
                <td>2</td>
                <td>876876</td>
                <td>NASIR UDDIN KHAN</td>
                <td>
                  Upgrade Order from Product Wallet for User ID 876876
                  <br />
                  Order Id : 13
                </td>
                <td>10/03/2021</td>
                <td></td>
                <td>Debit</td>
                <td>2245.00</td>
              </tr>

              <tr>
                <td>3</td>
                <td>876876</td>
                <td>NASIR UDDIN KHAN</td>
                <td>Add Bal in Product Wallet by Admin</td>
                <td>10/03/2021</td>
                <td>admin</td>
                <td>Credit</td>
                <td>1000.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
