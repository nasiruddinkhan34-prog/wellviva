import { useRef } from "react";

export default function WelcomeLetter() {
  const printRef = useRef();

  const user = {
    name: "NASIR UDDIN KHAN",
    mobile: "8250894500",
    email: "nasiruddinkhan34@gmail.com",
    sponsorId: "0",
    sponsorName: "",
    address:
      "VILL+P.O- GHOSHPUR, P.S- HAROA, NORTH 24 PARGANAS, 743502 North 24 Parganas",
    date: "07/01/2019",
  };

  const handlePrint = () => window.print();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-[#6b5a00] to-[#1a7f00] text-white px-6 py-3 rounded mb-4">
        Welcome Letter
      </div>

      {/* PRINT BUTTON */}
      <button
        onClick={handlePrint}
        className="mb-4 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded shadow"
      >
        print
      </button>

      {/* LETTER */}
      <div
        ref={printRef}
        className="bg-white border-[6px] border-gray-400 rounded-lg p-8 print:border-black print:p-6"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Wellviva<span className="text-green-600">Organics</span>
            </h1>
            <p className="text-sm text-gray-600">
              Better Care for Tomorrow
            </p>
          </div>

          <div className="text-right text-sm">
            <p className="font-semibold text-blue-700">
              Wellviva Organics
            </p>
            <p>
              C/O- ABDUS GAFAR BAIDYA, 2ND FLOOR, BUILDING,
              BHANGAR, SOUTH 24 PARGANAS WEST BENGAL (743502)
            </p>
            <p>Phone No : , Mobile No : 8250894500</p>
            <p>
              Email ID :{" "}
              <span className="text-blue-600">
                wellviva@gmail.com
              </span>
            </p>
            <p>
              Website :{" "}
              <span className="text-blue-600">wellviva.com</span>
            </p>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
          Welcome Letter
        </h2>

        {/* LETTER BODY */}
        <div className="text-sm leading-relaxed space-y-4">
          <p className="font-semibold">
            Welcome To Wellviva Organics
          </p>

          <p>
            <b>Dear, {user.name},</b>
          </p>

          <p>
            Welcome to wellviva.com powered by Wellviva Organics Enterprise forwarded to you on behalf of our
            company and we are extremely proud and happy to appoint you
            as Distributor.
          </p>

          <p>
            We believe that each of our partners must be accepted and
            efforts must be made to make them comfortable so that they
            can make their best performance. Our best source of business
            is from word of mouth of valued partners like you who are
            giving us opportunity to serve a big group of customers and
            helping us by giving window in every single house of India
            and making wellviva.com a big success.
          </p>

          <p>
            It’s our partners belief and practice that we treat each
            other as we like to be treated, so rest assured, you are at
            the right place, we assure you great success ahead.
          </p>
        </div>

        {/* USER DETAILS */}
        <div className="grid grid-cols-2 gap-6 text-sm mt-8">
          <div className="space-y-1">
            <p>
              <b>Name</b> : {user.name}
            </p>
            <p>
              <b>Mobile</b> : {user.mobile}
            </p>
            <p>
              <b>Sponser Id</b> : {user.sponsorId}
            </p>
            <p>
              <b>Sponser Name</b> : {user.sponsorName || "-"}
            </p>
          </div>

          <div className="space-y-1">
            <p>
              <b>Email</b> : {user.email}
            </p>
            <p>
              <b>Address</b> : {user.address}
            </p>
          </div>
        </div>

        {/* FOOTER TEXT */}
        <div className="mt-8 text-sm">
          <p>
            We are looking forward to a long-term relationship and your
            success at  Wellviva Organics
          </p>

          <p className="mt-4">Sincerely</p>
          <p className="font-semibold">
            Wellviva Organics
          </p>

          <p className="mt-6 text-xs text-gray-600">
            <b>Note :</b> This is computer generated receipt does not
            required signature. By Buying this product you in agreement
            to the terms and conditions of  Wellviva Organics also mentioned on the website.
          </p>

          <p className="text-right mt-4">
            <b>DATE :</b> {user.date}
          </p>
        </div>
      </div>

      {/* PRINT CSS */}
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
