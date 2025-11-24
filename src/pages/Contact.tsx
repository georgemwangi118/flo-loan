import React from "react";

const Contact: React.FC = () => {
  const phoneNumber = "254707064524";
  const handleWhatsApp = () => {
    const message = "Hello, I’d like to learn more about your loan services.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-20 bg-white rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
      <p className="text-gray-700 mb-6">
        Got questions? Chat with us directly on WhatsApp for instant assistance.
      </p>
      <button
        onClick={handleWhatsApp}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        Chat on WhatsApp
      </button>
    </div>
  );
};

export default Contact;
