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
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-green-600">FloLoan</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600">
              Contact
            </Link>
            <Link to="/terms" className="text-gray-700 hover:text-green-600">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-700 hover:text-green-600">
              Privacy
            </Link>

            <button
              onClick={handleWhatsAppClick}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Apply Now
            </button>
          </div>

          {/* Hamburger Icon */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-xl py-4 px-4 space-y-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-green-600"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-green-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-green-600"
            >
              Contact
            </Link>

            <Link
              to="/#"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-green-600"
            >
              Terms
            </Link>

            <Link
              to="/#"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-green-600"
            >
              Privacy
            </Link>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
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
