import { useRef } from "react";

export default function IdCard() {
  const printRef = useRef();

  const user = {
    name: "NASIR UDDIN KHAN",
    id: "876876",
    mobile: "8250894500",
    address: `VILL+P.O- GHOSHPUR,
P.S- HAROA, NORTH 24
PARGANAS, 743502
North 24 Parganas`,
    photo:
      "https://via.placeholder.com/150", // replace with real image
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-[#6b5a00] to-[#1a7f00] text-white px-6 py-3 rounded mb-6">
        ID Card
      </div>

      {/* PRINT BUTTON */}
      <div className="mb-6">
        <button
          onClick={handlePrint}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded shadow"
        >
          Print
        </button>
      </div>

      {/* ID CARD */}
      <div className="flex justify-center">
        <div
          ref={printRef}
          className="w-[320px] border-2 border-[#0f4c75] bg-white print:border-black"
        >
          {/* LOGO */}
          <div className="text-center p-4 border-b">
            <h1 className="text-2xl font-bold">
              Wellviva<span className="text-green-600">Organics</span>
            </h1>
            <p className="text-xs text-gray-600">
              Better Care for Tomorrow
            </p>
          </div>

          {/* TITLE */}
          <div className="bg-white text-center py-2 font-semibold text-sm border-b">
            DISTRIBUTOR IDENTITY CARD
          </div>

          {/* PHOTO */}
          <div className="bg-[#1e6aa8] flex justify-center py-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src={user.photo}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="p-4 text-sm space-y-2">
            <p>
              <b>Name</b> &nbsp;&nbsp;: {user.name}
            </p>
            <p>
              <b>ID</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {user.id}
            </p>
            <p>
              <b>Mobile</b> : {user.mobile}
            </p>
            <p>
              <b>Address</b> :
            </p>
            <p className="pl-4 whitespace-pre-line">
              {user.address}
            </p>
          </div>

          {/* FOOTER */}
          <div className="bg-orange-600 text-white text-xs p-3">
            <p>
              C/O - ABDUS GAFAR BAIDYA, 2ND FLOOR,
              BUILDING, BHANGAR, SOUTH 24 PARGANAS,
              WEST BENGAL (743502)
            </p>
            <p className="mt-1">
              Contact: 8250894500 | Web: wellviva.com
            </p>
          </div>
        </div>
      </div>

      {/* PRINT STYLES */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print\\:border-black, 
            .print\\:border-black * {
              visibility: visible;
            }
          }
        `}
      </style>
    </div>
  );
}
