import { FileText, Info, Shield } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        {/** Company Info */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">
            Firefly Agency
          </h2>
          <p className="text-sm text-gray-400">
            Your trusted partner in providing accessible and reliable financial solutions for personal and business needs.
          </p>
        </div>

        {/** Legal Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FileText size={16} />
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Shield size={16} />
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/** Support Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Support</h3>
          <p className="text-sm text-gray-400">Business Hours: Mon–Fri</p>
          <p className="text-sm text-gray-400">8:00 AM – 6:00 PM EAT</p>
        </div>

        {/* Important Notice */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
            <Info size={16} />
            Important Notice
          </h3>
          <p className="text-sm text-gray-400">
            All loans are subject to approval. Terms and conditions apply.
          </p>
        </div>
      </div>

      {/** Bottom Info */}
      <div className="max-w-7xl mx-auto mt-8 text-sm text-gray-400">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="mb-1">
              <strong className="text-gray-300">Regulatory Compliance:</strong>{" "}
              Licensed financial agency. All operations comply with
              applicable financial regulations.
            </p>
            <p>
              <strong className="text-gray-300">Credit Reporting:</strong> We
              report to credit reference bureaus. Responsible borrowing helps
              build your credit history.
            </p>
          </div>

          <div>
            <p className="mt-2 text-gray-500">
              © {new Date().getFullYear()} Firefly. All
              rights reserved. Actual rates and fees may vary.
            </p>
          </div>

        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
