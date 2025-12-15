import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const phone = "254707064524";
    const message = "Hello, I’d like to inquire about your loan services.";
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <nav className="bg-black/50 shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#FFD700]">Firefly</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-200 hover:text-[#FFD700] transition">
              Home
            </Link>
            <Link to="/about" className="text-gray-200 hover:text-[#FFD700] transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-200 hover:text-[#FFD700] transition">
              Contact
            </Link>
            <Link to="/terms-and-conditions" className="text-gray-200 hover:text-[#FFD700] transition">
              Terms
            </Link>
            <Link to="/privacy-policy" className="text-gray-200 hover:text-[#FFD700] transition">
              Privacy
            </Link>

            <button
              onClick={handleWhatsAppClick}
              className="bg-[#FFD700] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#d0c271] transition"
            >
              Apply Now
            </button>
          </div>

          {/* Hamburger Icon */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/50 shadow-lg rounded-b-xl py-4 px-4 space-y-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 hover:text-[#FFD700] transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 hover:text-[#FFD700] transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 hover:text-[#FFD700] transition"
            >
              Contact
            </Link>

            <Link
              to="/terms-and-conditions"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 hover:text-[#FFD700] transition"
            >
              Terms
            </Link>

            <Link
              to="/privacy-policy"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 hover:text-[#FFD700] transition"
            >
              Privacy
            </Link>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#FFD700] text-black py-2 rounded-lg font-medium hover:bg-[#d0c271] transition"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
