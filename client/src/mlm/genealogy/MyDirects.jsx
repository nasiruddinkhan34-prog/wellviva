import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Downline() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    position: "all",
    recordType: "all",
    fromDate: "",
    toDate: "",
    sellerId: "all",
  });

 const fetchData = async () => {
  setLoading(true);
  const res = await api.get("/mlm/genealogy/my-directs", {
    params: {
      position: "all",
    },
  });
  setRecords(res.data.records);
  setLoading(false);
};

useEffect(() => {
  fetchData();
}, []);


  return (
    <div className="space-y-6">

      {/* SEARCH CRITERIA */}
      <div className="bg-white rounded shadow">
        <div className="bg-gradient-to-r from-yellow-700 to-green-600 text-white px-4 py-2">
          Search Criteria
        </div>

        <div className="p-4 grid md:grid-cols-2 gap-4">
          <select
            className="input"
            value={filters.position}
            onChange={(e) =>
              setFilters({ ...filters, position: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="direct">Direct</option>
          </select>

          <select
            className="input"
            value={filters.sellerId}
            onChange={(e) =>
              setFilters({ ...filters, sellerId: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="direct">Direct Seller ID</option>
          </select>

          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                checked={filters.recordType === "all"}
                onChange={() =>
                  setFilters({ ...filters, recordType: "all" })
                }
              />{" "}
              All Record
            </label>

            <label>
              <input
                type="radio"
                checked={filters.recordType === "between"}
                onChange={() =>
                  setFilters({ ...filters, recordType: "between" })
                }
              />{" "}
              Between Dates
            </label>
          </div>

          {filters.recordType === "between" && (
            <>
              <input
                type="date"
                className="input"
                onChange={(e) =>
                  setFilters({ ...filters, fromDate: e.target.value })
                }
              />
              <input
                type="date"
                className="input"
                onChange={(e) =>
                  setFilters({ ...filters, toDate: e.target.value })
                }
              />
            </>
          )}

          <button
            onClick={fetchData}
            className="bg-green-700 text-white px-4 py-2 rounded w-fit"
          >
            Search >>
          </button>
        </div>
      </div>

      {/* RESULT TABLE */}
      <div className="bg-white rounded shadow">
        <div className="bg-gradient-to-r from-yellow-700 to-green-600 text-white px-4 py-2 flex justify-between">
          <span>Direct Downline</span>
          <span>{records.length} Records</span>
        </div>
        {console.log(records)}

        <div className="overflow-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th>S.No</th>
                <th>Seller ID</th>
                <th>Name</th>
                <th>Parent ID</th>
                <th>Sponsor ID</th>
                <th>Plan</th>
                <th>Joining Date</th>
                <th>Mobile</th>
                <th>Position</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{textAlign:'center'}}>
              {records.map((r, i) => (
                <tr key={r.user_id}>
                  <td>{i + 1}</td>
                  <td>{r.user_id}</td>
                  <td>{r.first_name} {r.last_name}</td>
                  <td>{r.parent_id}</td>
                  <td>{r.referral_code}</td>
                  <td>{r.user_rank}</td>
                  <td>{r.joining_date}</td>
                  <td>{r.phone}</td>
                  <td>{r.position}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
              {!records.length && (
                <tr>
                  <td colSpan="10" className="text-center p-4">
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
