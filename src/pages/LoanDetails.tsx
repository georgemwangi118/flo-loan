import React from "react";
import { useParams } from "react-router-dom";
import { loanTypes } from "../data/loans";
import { MessageCircle } from "lucide-react";
import {motion} from "framer-motion";

const LoanDetails: React.FC = () => {
  const { id } = useParams();
  const loan = loanTypes.find((l) => l.id === Number(id));

  if (!loan) return <p className="text-center mt-10 text-red-500">Loan not found.</p>;

  const handleWhatsAppClick = () => {
    const phone = "254707064524"; // your agency number
    const message = `Hello, I’d like to know more about the ${loan.name}.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.4}}
      className="max-w-3xl mx-auto p-8 bg-white mt-20 rounded-2xl shadow-lg border border-green-300/40 relative"
    >
      {/* Decorative left border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-2xl"></div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-green-700 mb-3 relative w-fit">
        {loan.name}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-green-300/70 rounded-full"></span>
      </h2>

      {/* Description */}
      <p className="text-gray-700 mb-8 leading-relaxed text-lg">
        {loan.description}
      </p>

      {/* WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleWhatsAppClick}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md"
      >
        <MessageCircle size={22} />
        Chat on WhatsApp
      </motion.button>
    </motion.div>
    
  );
};

export default LoanDetails;
