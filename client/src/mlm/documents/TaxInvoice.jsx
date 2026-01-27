import { useRef } from "react";

export default function TaxInvoice() {
  const printRef = useRef();

  const invoice = {
    name: "NASIR UDDIN KHAN",
    date: "07/01/2019",
    invoiceNo: "",
    package: "Believer",
    joiningDate: "07/01/2019",
    amount: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    amountWords: "Rupees",
    deliveryStatus: "",
    deliveryDate: "",
  };

  const handlePrint = () => window.print();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#6b5a00] to-[#1a7f00] text-white px-6 py-3 rounded mb-4">
        Joining Product Receipt
      </div>

      {/* PRINT BUTTON */}
      <button
        onClick={handlePrint}
        className="mb-4 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded shadow"
      >
        print
      </button>

      {/* INVOICE */}
      <div
        ref={printRef}
        className="bg-white border-[6px] border-gray-400 rounded-lg p-8 print:border-black"
      >
        {/* TOP HEADER */}
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
              <span className="text-blue-600">wellviva@gmail.com</span>
            </p>
            <p>
              Website :{" "}
              <span className="text-blue-600">wellviva.com</span>
            </p>
            <p>
              GSTIN :{" "}
              <span className="text-blue-600">19AABCZ6840P</span>
            </p>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
          Joining Product Receipt
        </h2>

        {/* INTRO */}
        <div className="text-sm space-y-3">
          <p className="font-semibold">
            Welcome To Wellviva Organics
          </p>

          <p>
            Received with thanks from{" "}
            <b>Mr./Mrs. {invoice.name}</b>.
          </p>

          <p>
            Welcome to powered by Your package details are give as :-
          </p>
        </div>

        {/* META */}
        <div className="flex justify-end text-sm mt-4">
          <p>
            <b>DATE :</b> {invoice.date},{" "}
            <b>Invoice No :</b> {invoice.invoiceNo || "-"}
          </p>
        </div>

        {/* PACKAGE DETAILS */}
        <div className="mt-10 text-sm grid grid-cols-2 gap-6">
          <div></div>

          <div className="space-y-1">
            <p>
              <b>Package Name</b> : {invoice.package}
            </p>
            <p>
              <b>Date of Joining</b> : {invoice.joiningDate}
            </p>
            <p>
              <b>Actual Amount</b> :
            </p>
            <p>
              <b>CGST</b> :
            </p>
            <p>
              <b>SGST</b> :
            </p>
            <p>
              <b>IGST</b> :
            </p>
            <p>
              <b>Amount (Rs.)</b> : {invoice.amount.toFixed(2)}
            </p>
            <p>
              <b>Amount (in words)</b> : {invoice.amountWords}
            </p>
            <p>
              <b>Delivery Status</b> :
            </p>
            <p>
              <b>Delivery Date</b> :
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-sm space-y-3">
          <p>We are committed to providing you the best in class services.</p>

          <p>Thanking You</p>

          <p className="font-semibold">
            Wellviva Organics
          </p>

          <p className="text-xs text-gray-600 mt-4">
            <b>Note :</b> This is computer generated receipt does not required
            signature. By Buying this product you in agreement to the terms and
            conditions of Wellviva Organics also mentioned on
            the website.
          </p>
        </div>
      </div>

      {/* PRINT STYLE */}
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
