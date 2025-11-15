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
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-10">Overview</h1>

        {/* Intro Text */}
        <div className="text-[#1A1A1A] leading-relaxed space-y-4 mb-10">
          <p>
            We know that big investments can feel daunting. That’s why our Asset Finance loan is here for you. Get the vehicles, machinery, and technology you need to grow—without worrying about your cash flow.
          </p>
          <p>
            We’re committed to helping you and your business thrive with competitive rates and a simple, straightforward process. You’ll get a quick decision and fast access to funds, so you can stop waiting and start moving forward.
          </p>
          <p>
            We also offer buy-off loans solutions for civil servants with loans
            with other lending institutions.
          </p>
        </div>

        {/* WHAT YOU GET */}
        <h2 className="text-lg font-semibold tracking-wide text-[#0A0A0A] mt-10 mb-4">
          Key Features:
        </h2>

        <ul className="space-y-2 text-[#1A1A1A] leading-relaxed ml-5 list-disc">
          <li>Loan Amount: Up to KES 2,000,000</li>
          <li>Flexible Repayment: Terms of up to 24 months</li>
          <li>Quick Access: Fast and straightforward disbursement process</li>
        </ul>

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
