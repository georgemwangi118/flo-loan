import React from "react";
import { MessageCircle } from "lucide-react";
import {motion} from "framer-motion";

const AssetFinanceLoan: React.FC = () => {

  const handleWhatsAppClick = () => {
    const phone = "254707064524"; // your agency number
    const message = "Hello, I’d like to know more about Asset Finance Loan.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };
  
  return (
    <section className="bg-[#FAF8F2] min-h-screen px-8 py-20 flex justify-center">
      <div className="max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-10">Asset Finance Loan | Car Financing Loan</h1>

        {/* Intro Text */}
        <div className="text-[#1A1A1A] leading-relaxed space-y-4 mb-10">
          <p>
            Need a new Ride, Get up to 80% financing within 48 hours and flexible repayments of up to 36 months.
          </p>
          <p>(We finance vehicles YOM 2009 and above)</p>
        </div>

        {/* WHAT TO HAVE WHEN APPLYING */}
        <h2 className="text-lg font-semibold tracking-wide text-[#0A0A0A] mt-10 mb-4">
          WHAT TO HAVE WHEN YOU APPLY:
        </h2>

        <ul className="space-y-2 text-[#1A1A1A] leading-relaxed ml-5 list-disc">
          <li>Proforma invoice</li>
          <li>6 months bank & Mpesa statements</li>
          <li>Business registration documents or 3 month's payslips</li>
          <li>Employment documents - employment contract, pay slips, etc</li>
          <li>Business documents - valid business permit, lease agreements, invoices or receipts, etc</li>
          <li>Copy of ID/passport & KRA Pin</li>
          <li>Insurance - Comprehensive</li>
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

export default AssetFinanceLoan;
