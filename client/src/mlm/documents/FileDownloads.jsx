export default function FileDownloads() {
  const files = [
    {
      id: 1,
      caption: "Ziyt India Business Plan",
      file: "/upload/files/file7975fe5.pdf",
    },
    {
      id: 2,
      caption: "Product Booklet",
      file: "/upload/files/file214c9ae.pdf",
    },
  ];

  const handleDownload = (file) => {
    window.open(file, "_blank");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#6b5a00] to-[#1a7f00] text-white px-6 py-3 rounded mb-6">
        <h2 className="text-lg font-semibold">File Detail</h2>

        <span className="bg-white text-gray-700 text-sm px-3 py-1 rounded">
          {files.length} Records
        </span>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded shadow p-4">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="border px-4 py-2 text-left w-20">S.No.</th>
                <th className="border px-4 py-2 text-left">Caption</th>
                <th className="border px-4 py-2 text-left">Files</th>
                <th className="border px-4 py-2 text-left w-32">Action</th>
              </tr>
            </thead>

            <tbody>
              {files.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {item.caption}
                  </td>
                  <td className="border px-4 py-2 text-blue-600">
                    {item.file}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDownload(item.file)}
                      className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}

              {files.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500"
                  >
                    No files available
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
