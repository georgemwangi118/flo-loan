import { FileText, Info, Shield } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useContent } from "../content/useContent";

const Footer: React.FC = () => {
  const { footer } = useContent();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        {/** Company Info */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">
            {footer.companyName}
          </h2>
          <p className="text-sm text-gray-400">
            {footer.companyText}
          </p>
        </div>

        {/** Legal Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FileText size={16} />
              <Link to="terms-and-conditions" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Shield size={16} />
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/** Support Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Support</h3>
          <p className="text-sm text-gray-400 whitespace-pre-line">{footer.supportHours}</p>
        </div>

        {/* Important Notice */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
            <Info size={16} />
            {footer.noticeTitle}
          </h3>
          <p className="text-sm text-gray-400">
            {footer.noticeText}
          </p>
        </div>
      </div>

      {/** Bottom Info */}
      <div className="max-w-7xl mx-auto mt-8 text-sm text-gray-400">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="mb-1">
              <strong className="text-gray-300">Regulatory Compliance:</strong>{" "}
              {footer.regulatory}
            </p>
            <p>
              <strong className="text-gray-300">Credit Reporting:</strong>{" "}
              {footer.creditReporting}
            </p>
          </div>

          <div>
            <p className="mt-2 text-gray-500">
              © {new Date().getFullYear()} {footer.copyright}
            </p>
          </div>

        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
