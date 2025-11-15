import React from "react";
import { Link } from "react-router-dom";
import type { LoanType } from "../data/loans";
import { motion } from "framer-motion";

interface LoanCardProps {
  loan: LoanType;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-200"
    >
      {/** Image with zoom animation */}
      <motion.div
        className="w-full h-48 overflow-hidden"
        whileHover={{ scale: 1.1}}
        transition={{ duration: 0.4}}
      >
        <img
          src={loan.image}
          alt={loan.name}
          className="w-full h-full object-cover"
         />
      </motion.div>
      {/** Text section */}
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold ">{loan.name}</h2>
        <p className="text-green-600/70 mt-2 text-sm">
          {loan.description.substring(0, 80)}...
        </p>
        <Link
          to={loan.link}
          className="inline-block mt-4 bg-green-600 hover:bg-green-7000 text-white px-4 py-2 rounded-lg "
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
};

export default LoanCard;
