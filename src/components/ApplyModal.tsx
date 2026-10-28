import React, { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ApplicationScript } from "../content/types";

const emptyForm = {
  name: "",
  phone: "",
  location: "",
  make: "",
  model: "",
  year: "",
  amount: "",
  duration: "",
  insurance: false,
};

const fields: { name: keyof typeof emptyForm; placeholder: string }[] = [
  { name: "name", placeholder: "Full Name" },
  { name: "phone", placeholder: "Phone Number" },
  { name: "location", placeholder: "Location / Town" },
  { name: "make", placeholder: "Car Make (e.g Toyota)" },
  { name: "model", placeholder: "Car Model (e.g Prado)" },
  { name: "year", placeholder: "Year of Manufacture" },
  { name: "amount", placeholder: "Loan Amount Needed (KES)" },
  { name: "duration", placeholder: "Loan Duration (e.g 12 months)" },
];

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  script: ApplicationScript;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ open, onClose, title, script }) => {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://www.firefly.co.ke/scripts/${script}.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.name,
          phone: form.phone,
          location: form.location,
          vehicleMake: form.make,
          vehicleModel: form.model,
          vehicleYear: form.year,
          amount: form.amount,
          duration: form.duration,
          insurance: form.insurance,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Application submitted successfully!");
        setForm(emptyForm);
      } else {
        alert("Failed to submit application");
      }
    } catch (err) {
      alert("Server error. Please try again later");
      console.log(err);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-md relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">{title}</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {fields.map((field) => (
                <input
                  key={field.name}
                  required
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name] as string}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              ))}
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
  );
};

export default ApplyModal;
