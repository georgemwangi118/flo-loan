import React from "react";
import { MessageCircle } from "lucide-react";
import {motion} from "framer-motion";

const TitleDeedLoan: React.FC = () => {

  const handleWhatsAppClick = () => {
    const phone = "254707064524"; // your agency number
    const message = "Hello, I’d like to know more about Title Deed Loan.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="bg-[#FAF8F2] min-h-screen px-8 py-20 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-10">Title Deed Loan</h1>

        {/* Intro Text */}
        <div className="text-[#1A1A1A] leading-relaxed space-y-4 mb-10">
          <p>
            Our Title Deed Loans offer secure, affordable financing backed by your land or home, giving you access to swift funding with clear terms and a smooth process from start to finish.
          </p>
          <p>Get up to 5M for 60 months</p>
        </div>

        
        <h2 className="text-lg font-semibold tracking-wide text-[#0A0A0A] mt-10 mb-4">
          Key Features:
        </h2>

        <ul className="space-y-2 text-[#1A1A1A] leading-relaxed ml-5 list-disc">
          <li>Affordable Rates: Lower interest due to land-based security.</li>
          <li>Multi-Purpose: Suitable for both business and personal needs.</li>
          <li>Quick Processing: Fast valuation and approval process.</li>
        </ul>

        {/* WHAT TO HAVE WHEN APPLYING */}
        <h2 className="text-lg font-semibold tracking-wide text-[#0A0A0A] mt-10 mb-4">
          WHAT TO HAVE WHEN YOU APPLY:
        </h2>

        <ul className="space-y-2 text-[#1A1A1A] leading-relaxed ml-5 list-disc">
          <li>Original Title Deed (Freehold or Leasehold)</li>
          <li>Latest land search</li>
           <li>Copy of ID/passport & KRA PIN certificate</li>
           <li>6 months bank or Mpesa statements</li>
          <li>Business registration document or 3 latest payslips</li>
          <li>Passport photo</li>
          <li>Next of kin details</li>
          <li>Proof of income documents (Payslips, COR, COI & CR12, Uber profile screenshot)</li>
          <li>PD cheques</li>
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

export default TitleDeedLoan;
