import React from "react";
import { MessageCircle } from "lucide-react";
import {motion} from "framer-motion";

const LogbookLoan: React.FC = () => {

  const handleWhatsAppClick = () => {
    const phone = "254707064524"; // your agency number
    const message = "Hello, I’d like to know more about Logbook Loan.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="bg-[#FAF8F2] min-h-screen px-8 py-20 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-10">Overview</h1>

        {/* Intro Text */}
        <div className="text-[#1A1A1A] leading-relaxed space-y-4 mb-10">
          <p>
            Get money for your business or personal use, secured by your car.
            We provide Vehicle Logbook Loans of up to Kes 5 million for both
            business owners and employees that own cars.
          </p>
          <p>
            With extended repayment period of up to 24 months, we offer you the
            comfort of affordable monthly instalments.
          </p>
          <p>
            We also offer buy-off loans solutions for civil servants with loans
            with other lending institutions.
          </p>
        </div>

        {/* WHAT YOU GET */}
        <h2 className="text-lg font-semibold tracking-wide text-[#0A0A0A] mt-10 mb-4">
          WHAT YOU GET:
        </h2>

        <ul className="space-y-2 text-[#1A1A1A] leading-relaxed ml-5 list-disc">
          <li>Transparency - no hidden charges, no funny terms.</li>
          <li>
            Attractive loan limits – access check off loans of amounts up to Kes
            5 million.
          </li>
          <li>Flexibility – up to 24 months to repay.</li>
        </ul>

        {/* WHAT TO HAVE WHEN APPLYING */}
        <h2 className="text-lg font-semibold tracking-wide text-[#0A0A0A] mt-10 mb-4">
          WHAT TO HAVE WHEN YOU APPLY:
        </h2>

        <ul className="space-y-2 text-[#1A1A1A] leading-relaxed ml-5 list-disc">
          <li>Original vehicle logbook</li>
          <li>6 months Mpesa or bank statement</li>
          <li>Business registration document or 3 latest payslips</li>
          <li>Passport photo</li>
          <li>Copy of ID/passport & KRA PIN certificate</li>
        </ul>

          {/* WhatsApp Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsAppClick}
            className="mt-12 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md"
          >
            <MessageCircle size={22} />
            Chat on WhatsApp
          </motion.button>
      </div>
    </section>
  );
};

export default LogbookLoan;
