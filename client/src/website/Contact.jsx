import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* PAGE HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-semibold">Contact Us</h1>
          <p className="text-sm text-gray-500 mt-1">
            Home <span className="mx-1">›</span>
            <span className="text-orange-500">Contact Us</span>
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ENQUIRY FORM */}
        <div className="bg-white rounded shadow p-8">
          <h2 className="text-xl font-semibold mb-1">Enquiry</h2>
          <p className="text-sm text-gray-500 mb-6">
            Have any query? Please fill up the form!
          </p>

          <form className="space-y-4">
            <input
              className="w-full border px-4 py-3 rounded text-sm"
              placeholder="Your Name"
            />
            <input
              className="w-full border px-4 py-3 rounded text-sm"
              placeholder="Address"
            />
            <input
              className="w-full border px-4 py-3 rounded text-sm"
              placeholder="Contact No."
            />
            <input
              className="w-full border px-4 py-3 rounded text-sm"
              placeholder="Your Email"
            />
            <textarea
              rows="4"
              className="w-full border px-4 py-3 rounded text-sm"
              placeholder="Your Message"
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold"
            >
              Submit
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* INFO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#083f6b] text-white p-6 rounded relative">
              <div className="absolute -top-3 -left-3 bg-orange-500 p-3 rounded-full">
                <FaMapMarkerAlt />
              </div>
              <h4 className="font-semibold mb-2">Head Office</h4>
              <p className="text-sm leading-relaxed">
                Wellviva Organics<br />
                Ground Floor, Plot No. 302, JL No. 98<br />
                Bhangar, South 24 Parganas<br />
                West Bengal – 743502
              </p>
            </div>

            <div className="bg-[#083f6b] text-white p-6 rounded relative">
              <div className="absolute -top-3 -left-3 bg-orange-500 p-3 rounded-full">
                <FaPhoneAlt />
              </div>
              <h4 className="font-semibold mb-2">Call Us</h4>
              <p className="text-sm">
                +91 82508 94500
              </p>
            </div>

            <div className="bg-[#083f6b] text-white p-6 rounded relative">
              <div className="absolute -top-3 -left-3 bg-orange-500 p-3 rounded-full">
                <FaEnvelope />
              </div>
              <h4 className="font-semibold mb-2">Email ID</h4>
              <p className="text-sm break-all">
                info@wellvivaorganics.com
              </p>
            </div>
          </div>

          {/* MAP */}
          <div className="bg-white rounded shadow overflow-hidden">
            <iframe
              title="Wellviva Location"
              src="https://www.google.com/maps?q=Bhangar%20South%2024%20Parganas%20West%20Bengal&output=embed"
              className="w-full h-[380px] border-0"
              loading="lazy"
            />
          </div>

          {/* BUSINESS INFO */}
          <div className="bg-white rounded shadow p-6">
            <h3 className="font-semibold mb-2">
              Business & Partnership Enquiries
            </h3>
            <p className="text-sm text-gray-600">
              For distributorship, affiliate, or collaboration opportunities,
              please contact us via phone or email. Our team will connect with you
              shortly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
