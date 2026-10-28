import React from "react";
import { Target, Eye, ShieldCheck, Timer, Users } from "lucide-react";
import { useContent } from "../content/useContent";

const valueIcons = [ShieldCheck, Timer, Users];

const About: React.FC = () => {
  const { about } = useContent();
  // Last word of the title is highlighted, e.g. "About Firefly".
  const titleWords = about.title.trim().split(" ");
  const highlighted = titleWords.length > 1 ? titleWords.pop() : "";

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {titleWords.join(" ")} {highlighted && <span className="text-[#FFD700]">{highlighted}</span>}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          {about.intro}
        </p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-left">
            <div className="flex items-center mb-4">
              <Target className="text-[#FFD700] w-8 h-8 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {about.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-left">
            <div className="flex items-center mb-4">
              <Eye className="text-[#FFD700] w-8 h-8 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Our Vision
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {about.vision}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          {about.valuesHeading}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {about.values.map((value, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <div key={i} className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex flex-col items-center text-center">
                  <Icon className="text-[#FFD700] w-10 h-10 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {value.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
