import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Terms & Conditions
        </h1>
        

        <p className="mt-6 text-gray-700 leading-relaxed">
          These Terms of Service ("Terms") govern your access to and use of
          Firefly Finance’s website, products, and loan services. By applying
          for, accepting, or using any Firefly loan product or service, you
          agree to be bound by these Terms, which form a binding legal agreement
          between you and Firefly Finance.
        </p>

        <Section title="1. Our Loan Products and Services">
          <p>
            Firefly offers asset-backed financing solutions. Specific terms,
            including interest rates, fees, and repayment schedules, are
            provided in a separate Loan Agreement or Offer Letter upon
            successful application.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Logbook Loan:</strong> Secured by a vehicle logbook.</li>
            <li><strong>Asset Finance Loan:</strong> Financing for vehicle acquisition.</li>
            <li><strong>Buy-Off Loan:</strong> Refinancing an existing asset-backed loan.</li>
            <li><strong>Title Deed Loan:</strong> Secured by real estate property.</li>
          </ul>
        </Section>

        <Section title="2. Eligibility and Application">
          <h4 className="font-semibold mt-4">2.1 Eligibility Requirements</h4>
          <p>To be eligible to apply for a loan, you must:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Be a resident of <strong>Kenya</strong> with valid identification</li>
            <li>Be at least <strong>18 years of age.</strong></li>
            <li>Own or Legally control the asset offered as security.</li>
          </ul>

          <h4 className="font-semibold mt-6">2.2 Application and Approval</h4>
          <p>
            Applicants must provide accurate and complete information. Loan
            approval is subject to due diligence, valuation, verification, and
            credit assessment. Firefly reserves the right to approve or decline
            any application.
          </p>
        </Section>

        <Section title="3. Financial Terms: Rates, Fees, and Repayments">
          <h4 className="font-semibold mt-4">3.1 Interest and Fees</h4>
          <p>
            All applicable interest rates, fees, penalties, and charges will be
            communicated before loan acceptance.
          </p>

          <h4 className="font-semibold mt-6">3.2 Repayments</h4>
          <p>
            Repayments must be made on or before due dates. Late or missed
            payments attract penalties as stipulated in the Loan Agreement.
          </p>

          <h4 className="font-semibold mt-6">3.3 Credit Reporting</h4>
          <p>
            Firefly may share repayment history with Credit Reference Bureaus
            (CRBs) in accordance with Kenyan law.
          </p>
        </Section>

        <Section title="4. Security and Asset Recovery">
          <h4 className="font-semibold mt-4">4.1 Security and Responsibility</h4>
          <p>
            The collateral asset remains the borrower’s responsibility and must
            be maintained and insured where required.
          </p>

          <h4 className="font-semibold mt-6">4.2 Default and Realization</h4>
          <p>
            In the event of default, Firefly may repossess or sell the security
            asset in accordance with Kenyan law. Any surplus will be refunded,
            while any shortfall remains the borrower’s liability.
          </p>
        </Section>

        <Section title="5. Customer Obligations">
          <p>By accepting a loan from Firefly, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain accurate information</li>
            <li>Comply with loan terms</li>
            <li>Notify Firefly of material changes</li>
          </ul>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>
            Firefly shall not be liable for indirect or consequential losses
            except where prohibited by Kenyan law. Liability is limited to the
            maximum extent permitted by law.
          </p>
        </Section>

        <Section title="7. Amendments and Governing Law">
          <h4 className="font-semibold mt-4">7.1 Amendments</h4>
          <p>
            Firefly may update these Terms from time to time. Continued use of
            the services constitutes acceptance of the revised Terms.
          </p>

          <h4 className="font-semibold mt-6">7.2 Governing Law and Jurisdiction</h4>
          <p>
            These Terms are governed by the <strong>laws of the Republic of Kenya</strong>. Kenyan
            courts have exclusive jurisdiction.
          </p>
        </Section>
      </div>
    </div>
  );
};

interface SectionProps {
    title: string;
    children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mt-10">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      {title}
    </h2>
    <div className="space-y-4 text-gray-700 leading-relaxed">
      {children}
    </div>
  </section>
);

export default TermsAndConditions;
