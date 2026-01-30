import "./product.css";

export default function OrderHistory() {
  // dummy data (replace with API later)
  const orders = [
    {
      id: 1692,
      date: "07/08/2025",
      type: "Repurchase",
      bv: 144,
      mrp: 598,
      dp: 480,
      delivery: 0,
      total: 480,
      mode: "Product Wallet",
      status: "Accepted",
      deliveryStatus: "Delivered",
      deliveryDate: "08/08/2025",
    },
    {
      id: 5,
      date: "10/03/2021",
      type: "Activation",
      bv: 1077,
      mrp: 1797,
      dp: 1347,
      delivery: 100,
      total: 1447,
      mode: "Product Wallet",
      status: "Accepted",
      deliveryStatus: "Delivered",
      deliveryDate: "19/09/2020",
    },
  ];

  return (
    <div className="order-wrapper">
      {/* Header */}
      <div className="order-header">
        <span>Order History</span>
        <span className="record-count">{orders.length} Records</span>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="order-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Order Id</th>
              <th>Order Date</th>
              <th>Order Type</th>
              <th>Total BV</th>
              <th>Total MRP</th>
              <th>Total DP</th>
              <th>Delivery</th>
              <th>Total</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Delivery Status</th>
              <th>Delivery Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => (
              <tr key={o.id}>
                <td>{i + 1}</td>
                <td>{o.id}</td>
                <td>{o.date}</td>
                <td>{o.type}</td>
                <td>{o.bv.toFixed(2)}</td>
                <td>{o.mrp.toFixed(2)}</td>
                <td>{o.dp.toFixed(2)}</td>
                <td>{o.delivery.toFixed(2)}</td>
                <td>{o.total.toFixed(2)}</td>
                <td>{o.mode}</td>
                <td>{o.status}</td>
                <td>{o.deliveryStatus}</td>
                <td>{o.deliveryDate}</td>
                <td>
                  <button className="btn-view">View Products</button>
                  <button className="btn-invoice">Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
