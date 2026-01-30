import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewCart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Haldi Chandan Soap (100 gm)",
      mrp: 110,
      dp: 90,
      bv: 30,
      qty: 1,
    },
    {
      id: 2,
      name: "Red Onion Shampoo (200 ml)",
      mrp: 399,
      dp: 320,
      bv: 110,
      qty: 1,
    },
  ]);

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Number(qty) } : p
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => navigate("/mlm/shopping/activation")}
          className="bg-green-700 text-white px-6 py-2 rounded"
        >
          Back To Product Order
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">S.No.</th>
              <th>Product Detail</th>
              <th>MRP</th>
              <th>DP</th>
              <th>BV</th>
              <th>Action</th>
              <th>Total MRP</th>
              <th>Total DP</th>
              <th>Total BV</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((p, i) => (
              <tr key={p.id} className="border-t text-center">
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.mrp}</td>
                <td>{p.dp}</td>
                <td>{p.bv}</td>

                <td>
                  <input
                    type="number"
                    value={p.qty}
                    min="1"
                    className="border w-16 px-2"
                    onChange={(e) =>
                      updateQty(p.id, e.target.value)
                    }
                  />
                  <button className="block mx-auto mt-2 bg-sky-500 text-white px-3 py-1 rounded">
                    Update Quantity
                  </button>
                </td>

                <td>{p.mrp * p.qty}</td>
                <td>{p.dp * p.qty}</td>
                <td>{p.bv * p.qty}</td>

                <td className="space-y-2">
                  <button className="bg-teal-500 text-white px-3 py-1 rounded">
                    Increase Qty
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded">
                    Decrease Qty
                  </button>
                  <button
                    onClick={() => removeItem(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
