import React from "react";
import { MessageCircle } from "lucide-react";
import {motion} from "framer-motion";

const BuyOffLoan: React.FC = () => {

  const handleWhatsAppClick = () => {
    const phone = "254707064524"; // your agency number
    const message = "Hello, I’d like to know more about Buy Off Loan.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="bg-[#FAF8F2] min-h-screen px-8 py-20 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-10">Buy Off Loan</h1>

        {/* Intro Text */}
        <div className="text-[#1A1A1A] leading-relaxed space-y-4 mb-10">
          <p>
            Logbook Mkononi, Pesa Mfukoni. Unlock up to 70% of your car's value while still driving it in just 6 hours.
          </p>
         
          <p>
            (We accept vehicles YOM 2004 and above)
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
          <li>KYC Documents (I.D, KRA pin copy, Passport photo)</li>
          <li>Next of kin details</li>
          <li>6 months Mpesa or bank statement</li>
          <li>Proof of income documents (Payslips, COR, COI & CR12, Uber profile screenshot)</li>
          <li>Insurance (Comprehensive, Third Party)</li>
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

export default BuyOffLoan;
