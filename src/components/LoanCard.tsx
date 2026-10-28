import React from "react";
import { Link } from "react-router-dom";
import type { Loan } from "../content/types";
import { motion } from "framer-motion";

interface LoanCardProps {
  loan: Loan;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#FFD700]"
    >
      {/** Image with zoom animation */}
      <motion.div
        className="w-full h-48 overflow-hidden"
        whileHover={{ scale: 1.1}}
        transition={{ duration: 0.4}}
      >
        {loan.image ? (
          <img
            src={loan.image}
            alt={loan.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#FAF8F2]" />
        )}
      </motion.div>
      {/** Text section */}
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold ">{loan.name}</h2>
        <p className=" mt-2 text-sm">
          {loan.summary.length > 80 ? `${loan.summary.substring(0, 80)}...` : loan.summary}
        </p>
        <Link
          to={`/${loan.slug}`}
          className="inline-block mt-4 bg-[#FFD700] hover:bg-green-7000 text-black px-4 py-2 rounded-lg "
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
};

export default LoanCard;
