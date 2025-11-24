import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import img from "../assets/hero-loans.jpg";

const Hero: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phone = "254707064524"; 
    const message = "Hello, I’d like to inquire about your loan services.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="bg-linear-to-br from-green-50 via-white to-green-50/30 text-white py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            Smart Loan Solutions <br /> for Every Need 
          </h1>
          <p className="text-lg  mb-8 text-gray-700">
            Get the right financial help when you need it most — whether it’s a personal, business, or home loan.
            Fast, flexible, and trusted consultancy at your service.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => document.getElementById("loan-section")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500"
            >
              Explore Loan Options
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </button>
          </div>
        </motion.div>

        {/* Right Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src={img}
            alt="Loans Illustration"
            className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
