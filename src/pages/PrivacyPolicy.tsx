import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Privacy Policy
        </h1>

        <p className="mt-6 text-gray-700 leading-relaxed">
          Firefly Finance respects your privacy and is committed to protecting
          your personal data in accordance with the <strong>Kenya Data Protection Act,
          2019.</strong>
        </p>

        <Section title="1. Information We Collect">
          <p>We may collect the following information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal details (name, ID number, phone number, email)</li>
            <li>Financial and employment information</li>
            <li>Asset details (vehicles, property documents)</li>
            <li>Website usage data (cookies, IP address)</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>Your data is used to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process loan applications</li>
            <li>Conduct credit assessments and verifications</li>
            <li>Communicate loan updates and notices</li>
            <li>Meet legal and regulatory obligations</li>
          </ul>
        </Section>

        <Section title="3. Data Sharing">
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Credit Reference Bureaus</li>
            <li>Valuers, insurers, and legal partners</li>
            <li>Regulators and law enforcement where required</li>
          </ul>
          <p className="mt-4 font-medium">
            We do not sell your personal data.
          </p>
        </Section>

        <Section title="4. Data Security">
          <p>
            Firefly implements appropriate technical and organizational measures
            to safeguard your information from unauthorized access, loss, or
            misuse.
          </p>
        </Section>

        <Section title="5. Data Retention">
          <p>
            Your data is retained only for as long as necessary to meet legal,
            regulatory, and business requirements.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Withdraw consent where applicable</li>
            <li>
              Lodge a complaint with the Office of the Data Protection
              Commissioner (ODPC)
            </li>
          </ul>
        </Section>

        <Section title="7. Cookies">
          <p>
            Our website may use cookies to enhance user experience and for
            analytics purposes.
          </p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes will
            be posted on our website.
          </p>
        </Section>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <section className="mt-10">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      {title}
    </h2>
    <div className="space-y-4 text-gray-700 leading-relaxed">
      {children}
    </div>
  </section>
);

export default PrivacyPolicy;
