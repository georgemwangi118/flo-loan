import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useContent } from "../content/useContent";
import ApplyModal from "../components/ApplyModal";

const LoanPage: React.FC = () => {
  const { slug } = useParams();
  const { loans } = useContent();
  const [open, setOpen] = useState(false);
  const loan = loans.find((l) => l.slug === slug);
  const filled = (items: string[]) => items.filter((item) => item.trim());

  if (!loan) {
    return (
      <section className="bg-[#FAF8F2] min-h-screen px-8 py-32 text-center">
        <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">Page not found</h1>
        <Link to="/" className="text-blue-700 underline">
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF8F2] min-h-screen px-8 py-20 flex justify-center">
      <div className="max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-10">{loan.pageTitle || loan.name}</h1>

        {/* Intro Text */}
        <div className="text-[#1A1A1A] leading-relaxed space-y-4 mb-10">
          {filled(loan.intro).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {loan.sections
          .filter((section) => section.heading.trim() || filled(section.items).length)
          .map((section, i) => (
          <React.Fragment key={i}>
            <h2 className="text-lg font-semibold tracking-wide text-[#0A0A0A] mt-10 mb-4">
              {section.heading}
            </h2>
            <ul className="space-y-2 text-[#1A1A1A] leading-relaxed ml-5 list-disc">
              {filled(section.items).map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </React.Fragment>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen(true)}
          className="mt-12 flex items-center gap-2 bg-[#FFD700] text-black hover:bg-[#d0c271]  px-6 py-3 rounded-xl shadow-md"
        >
          {loan.applyButtonLabel || "Apply Now"}
        </motion.button>

        <ApplyModal
          open={open}
          onClose={() => setOpen(false)}
          title={loan.formTitle || `${loan.name} Application`}
          script={loan.applicationScript}
        />
      </div>
    </section>
  );
};

export default LoanPage;
