import React from "react";
import Hero from "../components/Hero";
import LoanCard from "../components/LoanCard";
import { loanTypes } from "../data/loans";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />

      <section id="loan-section" className="p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Explore Our Loan Options
        </h1>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loanTypes.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
