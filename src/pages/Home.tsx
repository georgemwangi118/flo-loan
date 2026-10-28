import React from "react";
import Hero from "../components/Hero";
import LoanCard from "../components/LoanCard";
import { useContent } from "../content/useContent";
import Slider from "../components/Slider";

const Home: React.FC = () => {
  const { home, loans } = useContent();
  return (
    <>
      <Slider />
      <div className="bg-gray-50 min-h-screen">
        <section id="loan-section" className="p-8">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
            {home.loansHeading}
          </h1>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {loans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>
        </section>
        <Hero />
      </div>
    </>
    
  );
};

export default Home;
