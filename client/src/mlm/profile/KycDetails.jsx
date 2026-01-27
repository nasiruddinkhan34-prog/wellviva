import { useState } from "react";

const initialRows = [
  {
    id: 1,
    document: "Identity Proof",
    type: "Voter Id",
    requestDate: "03/12/2016",
    checkingDate: "05/12/2016",
    status: "Accepted",
  },
  {
    id: 2,
    document: "Pan Card",
    type: "Pan Card",
    requestDate: "05/12/2016",
    checkingDate: "05/12/2016",
    status: "Accepted",
  },
  {
    id: 3,
    document: "Address Proof",
    type: "Driving Licence",
    requestDate: "03/12/2016",
    checkingDate: "05/12/2016",
    status: "Accepted",
  },
];

export default function KycDetails() {
  const [rows, setRows] = useState(initialRows);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#6b5a00] to-[#1a7f00] text-white px-6 py-3 rounded-t-md flex justify-between items-center">
        <span className="font-semibold">KYC Details</span>
        <span className="bg-white text-green-700 text-xs px-2 py-1 rounded">
          {rows.length} Items
        </span>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-b-md shadow overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600">
              <th className="p-3 border">S.No.</th>
              <th className="p-3 border">Document</th>
              <th className="p-3 border">Document Type</th>
              <th className="p-3 border">Select File</th>
              <th className="p-3 border">Upload File</th>
              <th className="p-3 border">Request Date</th>
              <th className="p-3 border">Checking Date</th>
              <th className="p-3 border">Uploaded File</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-b">
                <td className="p-3 border">{index + 1}</td>

                <td className="p-3 border font-medium">
                  {row.document}
                </td>

                <td className="p-3 border">
                  <select
                    className="border rounded px-2 py-1 w-full"
                    defaultValue={row.type}
                  >
                    <option>Voter Id</option>
                    <option>Pan Card</option>
                    <option>Aadhaar Card</option>
                    <option>Driving Licence</option>
                  </select>
                </td>

                <td className="p-3 border">
                  <input type="file" className="text-xs" />
                </td>

                <td className="p-3 border">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-xs">
                    Upload Now &gt;&gt;
                  </button>
                </td>

                <td className="p-3 border">
                  {row.requestDate}
                </td>

                <td className="p-3 border">
                  {row.checkingDate}
                </td>

                <td className="p-3 border">
                  <button className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded text-xs">
                    Attachment
                  </button>
                </td>

                <td className="p-3 border">
                  <span className="text-green-600 font-semibold">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
