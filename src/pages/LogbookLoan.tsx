import React, { useState } from "react";
import { X } from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

const LogbookLoan: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    make: "",
    model: "",
    year: "",
    amount: "",
    duration: "",
    insurance: false,
  });

  const phone = "254707064524";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
      *Logbook Loan Application*
      Name: ${form.name}
      Phone: ${form.phone}
      Location: ${form.location}

      Vehicle Details
      . Make: ${form.make}
      . Model: ${form.model}
      . Year: ${form.year}

      Loan Amount: KES ${form.amount}
      Duration: ${form.duration}
      Insurance: ${form.insurance ? "Yes" : "No"}
    `;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");

    setOpen(false);
  }

  return (
    <section className="bg-[#FAF8F2] min-h-screen px-8 py-20 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-10">Logbook Loan</h1>

        {/* Intro Text */}
        <div className="text-[#1A1A1A] leading-relaxed space-y-4 mb-10">
          <p>
            Logbook Mkononi, Pesa Mfukoni. Unlock up to 70% of your car's value while still driving it in just 6 hours.
          </p>
         
          <p>
            (We accept vehicles YOM 2004 and above)
          </p>
        </div>

        {/* WHAT YOU GET */}
        <h2 className="text-lg font-semibold tracking-wide text-[#0A0A0A] mt-10 mb-4">
          WHAT YOU GET:
        </h2>

        <ul className="space-y-2 text-[#1A1A1A] leading-relaxed ml-5 list-disc">
          <li>Transparency - no hidden charges, no funny terms.</li>
          <li>
            Attractive loan limits – access check off loans of amounts up to Kes
            5 million.
          </li>
          <li>Flexibility – up to 24 months to repay.</li>
        </ul>

        {/* WHAT TO HAVE WHEN APPLYING */}
        <h2 className="text-lg font-semibold tracking-wide text-[#0A0A0A] mt-10 mb-4">
          WHAT TO HAVE WHEN YOU APPLY:
        </h2>

        <ul className="space-y-2 text-[#1A1A1A] leading-relaxed ml-5 list-disc">
          <li>Original vehicle logbook</li>
          <li>KYC Documents (I.D, KRA pin copy, Passport photo)</li>
          <li>Next of kin details</li>
          <li>6 months Mpesa or bank statement</li>
          <li>Proof of income documents (Payslips, COR, COI & CR12, Uber profile screenshot)</li>
          <li>Insurance (Comprehensive, Third Party)</li>
        </ul>

          {/* WhatsApp Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(true)}
            className="mt-12 flex items-center gap-2 bg-[#FFD700] text-black hover:bg-[#d0c271]  px-6 py-3 rounded-xl shadow-md"
          >
            Apply Now
          </motion.button>

          {/** MODAL */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="bg-white rounded-2xl p-6 w-full max-w-md relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1}}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-black"
                  >
                    <X />
                  </button>

                  <h2 className="text-xl font-bold mb-4">
                    Logbook Loan Application
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      required
                      name="name"
                      placeholder="Full Name"
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      required
                      name="phone"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      required
                      name="location"
                      placeholder="Location / Town"
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      required
                      name="make"
                      placeholder="Car Make (e.g Toyota)"
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      required
                      name="model"
                      placeholder="Car Model (e.g Prado)"
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      required
                      name="year"
                      placeholder="Year of Manufacture"
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      required
                      name="amount"
                      placeholder="Loan Amount Needed (KES)"
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                      required
                      name="duration"
                      placeholder="Loan Duration (e.g 12 months)"
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="insurance"
                        checked={form.insurance}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      Do you have insurance?
                    </label>
                    <button
                      type="submit"
                      className="w-full bg-[#FFD700] text-black hover:bg-[#d0c271] py-3 rounded-xl mt-3"
                    >
                      Submit
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </section>
  );
};

export default LogbookLoan;
