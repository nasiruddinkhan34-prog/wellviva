import "./productWallet.css";

export default function ProductWalletRequest() {
  return (
    <div className="wallet-wrapper">
      {/* ================= Request Form ================= */}
      <div className="wallet-card">
        <div className="wallet-header">Product Wallet Request</div>

        <div className="wallet-form">
          <label>Bank Details</label>
          <select>
            <option>--Select Bank--</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
          </select>

          <label>Bank Details</label>
          <textarea placeholder="Bank Details" disabled />

          <label>Payment Mode</label>
          <select>
            <option>Cash</option>
            <option>NEFT</option>
            <option>RTGS</option>
            <option>Cheque</option>
          </select>

          <label>Current Balance</label>
          <input value="5580.00" disabled />

          <label>Request Fund</label>
          <input placeholder="Enter Amount" />

          <label>Remark / NEFT / RTGS / DD / Cheque No.</label>
          <input placeholder="Enter Remark" />

          <label>Attachment</label>
          <input type="file" />

          <label>Transaction / Account Password</label>
          <input type="password" placeholder="Enter Your Master Password" />

          <button className="btn-submit">Request &gt;&gt;</button>
        </div>
      </div>

      {/* ================= History ================= */}
      <div className="wallet-card">
        <div className="wallet-header">
          Request Product Wallet History
          <span className="record-count">1 Record</span>
        </div>

        <div className="table-wrap">
          <table className="wallet-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Direct Seller ID</th>
                <th>Direct Seller Name</th>
                <th>Request Amount</th>
                <th>Request Date</th>
                <th>Process Date</th>
                <th>Payment Mode</th>
                <th>Bank Details</th>
                <th>Status</th>
                <th>Remark</th>
                <th>Attachment</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>876876</td>
                <td>NASIR UDDIN KHAN</td>
                <td>10000.00</td>
                <td>10-03-2021 10:13:06</td>
                <td>10-03-2021 10:17:48</td>
                <td>Cash</td>
                <td>-</td>
                <td className="status-accepted">Accepted</td>
                <td>tete</td>
                <td>
                  <button className="btn-attach">Attachment</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
