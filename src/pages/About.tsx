import React from "react";
import { Target, Eye, ShieldCheck, Timer, Users } from "lucide-react";

const About: React.FC = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About <span className="text-[#FFD700]">Firefly</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Your trusted financial agency, providing accessible financial
          solutions to help you achieve your goals.
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
              To ensure our clients have access to fast and affordable financing by making the process seamless and stress-free.
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
              To connect you with trusted financial providers who offer fast, simple, and reliable loans, empowering you to take control of your finances - without giving up your independence.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="text-[#FFD700] w-10 h-10 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Trust & Security
              </h3>
              <p className="text-gray-600 mt-2">
                We protect your data with bank-level security and maintain
                complete transparency in all our operations.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex flex-col items-center text-center">
              <Timer className="text-[#FFD700] w-10 h-10 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Speed & Efficiency
              </h3>
              <p className="text-gray-600 mt-2">
                We leverage technology to provide fast loan processing while
                maintaining thorough verification standards.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex flex-col items-center text-center">
              <Users className="text-[#FFD700] w-10 h-10 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Customer First
              </h3>
              <p className="text-gray-600 mt-2">
                Your success is our priority. We offer flexible terms and
                dedicated support throughout your loan journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
