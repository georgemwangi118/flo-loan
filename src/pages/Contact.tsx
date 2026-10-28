import React from "react";
import { useContent, whatsappUrl } from "../content/useContent";

const Contact: React.FC = () => {
  const { general, contact } = useContent();
  const handleWhatsApp = () => {
    window.open(whatsappUrl(general.whatsappNumber, contact.whatsappMessage));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-20 bg-white rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{contact.title}</h2>
      <p className="text-gray-700 mb-6">
        {contact.text}
      </p>
      <button
        onClick={handleWhatsApp}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        {contact.buttonLabel}
      </button>
    </div>
  );
};

export default Contact;
