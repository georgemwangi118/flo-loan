import React from "react";
import { useContent } from "../content/useContent";
import RichText from "../components/RichText";

interface LegalPageProps {
  page: "terms" | "privacy";
}

// Terms & Conditions and Privacy Policy share this layout; text comes from the admin panel.
const LegalPage: React.FC<LegalPageProps> = ({ page }) => {
  const { title, intro, sections } = useContent()[page];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

        <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
          <RichText text={intro} />
        </div>

        {sections.map((section, i) => (
          <section key={i} className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <RichText text={section.body} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LegalPage;
