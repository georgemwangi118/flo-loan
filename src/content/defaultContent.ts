import type { SiteContent } from "./types";

// The site's original content. Used until the admin saves for the first time,
// and as a fallback for any field missing from the saved content.

const logbookRequirements = [
  "Original vehicle logbook",
  "KYC Documents (I.D, KRA pin copy, Passport photo)",
  "Next of kin details",
  "6 months Mpesa or bank statement",
  "Proof of income documents (Payslips, COR, COI & CR12, Uber profile screenshot)",
  "Insurance (Comprehensive, Third Party)",
];

const logbookBenefits = [
  "Transparency - no hidden charges, no funny terms.",
  "Attractive loan limits – access check off loans of amounts up to Kes 5 million.",
  "Flexibility – up to 24 months to repay.",
];

export const defaultContent: SiteContent = {
  general: {
    whatsappNumber: "254707064524",
    whatsappMessage: "Hello, I’d like to inquire about your loan services.",
  },

  slides: [
    {
      id: "slide-intro",
      title: "Welcome to Firefly Loan Agency",
      subtitle:
        "We shine a light on smarter, better borrowing. We connect you with financing options tailored to your needs, offering quick, hassle-free loans with transparent terms, flexible repayment plans, and a customer-first approach. With Firefly, your financial goals shine—without slowing you down.",
      image: "/images/handshake.jpg",
    },
    {
      id: "slide-asset-finance",
      title: "Asset Finance Loan",
      subtitle: "Invest in Your Dreams. Own the asset that will take you further",
      image: "/images/cars/cx-5-1.jpeg",
    },
    {
      id: "slide-logbook",
      title: "Logbook Loan",
      subtitle: "Get Vehicle Logbook Loan of up to Kes 5 million to keep you moving",
      image: "/images/cars/hilux-black.jpg",
    },
    {
      id: "slide-buy-off",
      title: "Buy off Loan",
      subtitle:
        "When it gets tough, we help you move forward, Our Buy off logbook loan product allows you to borrow more and stress less.",
      image: "/images/cars/demio.jpg",
    },
    {
      id: "slide-title-deed",
      title: "Title deed Loan",
      subtitle: "Unlock the Value of Your Property with Our Title Deed Loans",
      image: "/images/house2.jpg",
    },
  ],

  home: {
    loansHeading: "Explore Our Loan Options",
    heroTitle: "Smart Loan Solutions\nfor Every Need",
    heroText:
      "Get the right financial help when you need it most — whether it’s a personal, business, or home loan. Fast, flexible, and trusted consultancy at your service.",
    heroButtonLabel: "Explore Loan Options",
    heroImage: "/images/hero-loans.jpg",
  },

  loans: [
    {
      id: "loan-logbook",
      slug: "logbook-loan",
      name: "Logbook Loan",
      summary:
        "Logbook Mkononi, Pesa Mfukoni. Unlock up to 70% of your car's value while still driving it in just 6 hours.",
      image: "/images/cars/hilux-black.jpg",
      pageTitle: "Logbook Loan",
      intro: [
        "Logbook Mkononi, Pesa Mfukoni. Unlock up to 70% of your car's value while still driving it in just 6 hours.",
        "(We accept vehicles YOM 2004 and above)",
      ],
      sections: [
        { heading: "WHAT YOU GET:", items: logbookBenefits },
        { heading: "WHAT TO HAVE WHEN YOU APPLY:", items: logbookRequirements },
      ],
      applyButtonLabel: "Apply Now",
      formTitle: "Logbook Loan Application",
      applicationScript: "logbook",
    },
    {
      id: "loan-asset-finance",
      slug: "asset-finance-loan",
      name: "Asset Finance Loan",
      summary:
        "Need a new ride, Get up to 80% financing within 48 hours and flexible repayments of up to 36 months",
      image: "/images/cars/cx5-red.jpeg",
      pageTitle: "Asset Finance Loan | Car Financing Loan",
      intro: [
        "Need a new Ride, Get up to 80% financing within 48 hours and flexible repayments of up to 36 months.",
        "(We finance vehicles YOM 2009 and above)",
      ],
      sections: [
        {
          heading: "WHAT TO HAVE WHEN YOU APPLY:",
          items: [
            "Proforma invoice",
            "6 months bank & Mpesa statements",
            "Business registration documents or 3 month's payslips",
            "Employment documents - employment contract, pay slips, etc",
            "Business documents - valid business permit, lease agreements, invoices or receipts, etc",
            "Copy of ID/passport & KRA Pin",
            "Insurance - Comprehensive",
          ],
        },
      ],
      applyButtonLabel: "Apply Now",
      formTitle: "Asset Finance Loan Application",
      applicationScript: "asset_finance",
    },
    {
      id: "loan-buy-off",
      slug: "buy-off-loan",
      name: "Buy off Loan",
      summary:
        "When it gets tough, we help you move forward, Our Buy off logbook loan product allows you to borrow more and stress less.",
      image: "/images/cars/demio.jpg",
      pageTitle: "Buy Off Loan",
      intro: [
        "Logbook Mkononi, Pesa Mfukoni. Unlock up to 70% of your car's value while still driving it in just 6 hours.",
        "(We accept vehicles YOM 2004 and above)",
      ],
      sections: [
        { heading: "WHAT YOU GET:", items: logbookBenefits },
        { heading: "WHAT TO HAVE WHEN YOU APPLY:", items: logbookRequirements },
      ],
      applyButtonLabel: "Apply Now",
      formTitle: "Logbook Loan Application",
      applicationScript: "buy_off_loan",
    },
    {
      id: "loan-title-deed",
      slug: "title-deed-loan",
      name: "Title deed Loan",
      summary: "Unlock the Value of Your Property with Our Title Deed Loans.",
      image: "/images/house.jpg",
      pageTitle: "Title Deed Loan",
      intro: [
        "Our Title Deed Loans offer secure, affordable financing backed by your land or home, giving you access to swift funding with clear terms and a smooth process from start to finish.",
        "Get up to 5M for 60 months",
      ],
      sections: [
        {
          heading: "Key Features:",
          items: [
            "Affordable Rates: Lower interest due to land-based security.",
            "Multi-Purpose: Suitable for both business and personal needs.",
            "Quick Processing: Fast valuation and approval process.",
          ],
        },
        {
          heading: "WHAT TO HAVE WHEN YOU APPLY:",
          items: [
            "Original Title Deed (Freehold or Leasehold)",
            "Latest land search",
            "Copy of ID/passport & KRA PIN certificate",
            "6 months bank or Mpesa statements",
            "Business registration document or 3 latest payslips",
            "Passport photo",
            "Next of kin details",
            "Proof of income documents (Payslips, COR, COI & CR12, Uber profile screenshot)",
            "PD cheques",
          ],
        },
      ],
      applyButtonLabel: "Apply Now",
      formTitle: "Logbook Loan Application",
      applicationScript: "title_deed_loan",
    },
  ],

  about: {
    title: "About Firefly",
    intro:
      "Your trusted financial agency, providing accessible financial solutions to help you achieve your goals.",
    mission:
      "To ensure our clients have access to fast and affordable financing by making the process seamless and stress-free.",
    vision:
      "To connect you with trusted financial providers who offer fast, simple, and reliable loans, empowering you to take control of your finances - without giving up your independence.",
    valuesHeading: "Our Core Values",
    values: [
      {
        title: "Trust & Security",
        text: "We protect your data with bank-level security and maintain complete transparency in all our operations.",
      },
      {
        title: "Speed & Efficiency",
        text: "We leverage technology to provide fast loan processing while maintaining thorough verification standards.",
      },
      {
        title: "Customer First",
        text: "Your success is our priority. We offer flexible terms and dedicated support throughout your loan journey.",
      },
    ],
  },

  contact: {
    title: "Contact Us",
    text: "Got questions? Chat with us directly on WhatsApp for instant assistance.",
    buttonLabel: "Chat on WhatsApp",
    whatsappMessage: "Hello, I’d like to learn more about your loan services.",
  },

  footer: {
    companyName: "Firefly Agency",
    companyText:
      "Your trusted partner in providing accessible and reliable financial solutions for personal and business needs.",
    supportHours: "Business Hours: Mon–Fri\n8:00 AM – 6:00 PM EAT",
    noticeTitle: "Important Notice",
    noticeText: "All loans are subject to approval. Terms and conditions apply.",
    regulatory:
      "Licensed financial agency. All operations comply with applicable financial regulations.",
    creditReporting:
      "We report to credit reference bureaus. Responsible borrowing helps build your credit history.",
    copyright: "Firefly. All rights reserved. Actual rates and fees may vary.",
  },

  terms: {
    title: "Terms & Conditions",
    intro:
      "These Terms of Service (\"Terms\") govern your access to and use of Firefly Finance’s website, products, and loan services. By applying for, accepting, or using any Firefly loan product or service, you agree to be bound by these Terms, which form a binding legal agreement between you and Firefly Finance.",
    sections: [
      {
        title: "1. Our Loan Products and Services",
        body: `Firefly offers asset-backed financing solutions. Specific terms, including interest rates, fees, and repayment schedules, are provided in a separate Loan Agreement or Offer Letter upon successful application.

- **Logbook Loan:** Secured by a vehicle logbook.
- **Asset Finance Loan:** Financing for vehicle acquisition.
- **Buy-Off Loan:** Refinancing an existing asset-backed loan.
- **Title Deed Loan:** Secured by real estate property.`,
      },
      {
        title: "2. Eligibility and Application",
        body: `### 2.1 Eligibility Requirements
To be eligible to apply for a loan, you must:

- Be a resident of **Kenya** with valid identification
- Be at least **18 years of age.**
- Own or Legally control the asset offered as security.

### 2.2 Application and Approval
Applicants must provide accurate and complete information. Loan approval is subject to due diligence, valuation, verification, and credit assessment. Firefly reserves the right to approve or decline any application.`,
      },
      {
        title: "3. Financial Terms: Rates, Fees, and Repayments",
        body: `### 3.1 Interest and Fees
All applicable interest rates, fees, penalties, and charges will be communicated before loan acceptance.

### 3.2 Repayments
Repayments must be made on or before due dates. Late or missed payments attract penalties as stipulated in the Loan Agreement.

### 3.3 Credit Reporting
Firefly may share repayment history with Credit Reference Bureaus (CRBs) in accordance with Kenyan law.`,
      },
      {
        title: "4. Security and Asset Recovery",
        body: `### 4.1 Security and Responsibility
The collateral asset remains the borrower’s responsibility and must be maintained and insured where required.

### 4.2 Default and Realization
In the event of default, Firefly may repossess or sell the security asset in accordance with Kenyan law. Any surplus will be refunded, while any shortfall remains the borrower’s liability.`,
      },
      {
        title: "5. Customer Obligations",
        body: `By accepting a loan from Firefly, you agree to:

- Maintain accurate information
- Comply with loan terms
- Notify Firefly of material changes`,
      },
      {
        title: "6. Limitation of Liability",
        body: "Firefly shall not be liable for indirect or consequential losses except where prohibited by Kenyan law. Liability is limited to the maximum extent permitted by law.",
      },
      {
        title: "7. Amendments and Governing Law",
        body: `### 7.1 Amendments
Firefly may update these Terms from time to time. Continued use of the services constitutes acceptance of the revised Terms.

### 7.2 Governing Law and Jurisdiction
These Terms are governed by the **laws of the Republic of Kenya**. Kenyan courts have exclusive jurisdiction.`,
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    intro:
      "Firefly Finance respects your privacy and is committed to protecting your personal data in accordance with the **Kenya Data Protection Act, 2019.**",
    sections: [
      {
        title: "1. Information We Collect",
        body: `We may collect the following information:

- Personal details (name, ID number, phone number, email)
- Financial and employment information
- Asset details (vehicles, property documents)
- Website usage data (cookies, IP address)`,
      },
      {
        title: "2. How We Use Your Information",
        body: `Your data is used to:

- Process loan applications
- Conduct credit assessments and verifications
- Communicate loan updates and notices
- Meet legal and regulatory obligations`,
      },
      {
        title: "3. Data Sharing",
        body: `We may share your information with:

- Credit Reference Bureaus
- Valuers, insurers, and legal partners
- Regulators and law enforcement where required

**We do not sell your personal data.**`,
      },
      {
        title: "4. Data Security",
        body: "Firefly implements appropriate technical and organizational measures to safeguard your information from unauthorized access, loss, or misuse.",
      },
      {
        title: "5. Data Retention",
        body: "Your data is retained only for as long as necessary to meet legal, regulatory, and business requirements.",
      },
      {
        title: "6. Your Rights",
        body: `You have the right to:

- Access your personal data
- Request correction of inaccurate data
- Withdraw consent where applicable
- Lodge a complaint with the Office of the Data Protection Commissioner (ODPC)`,
      },
      {
        title: "7. Cookies",
        body: "Our website may use cookies to enhance user experience and for analytics purposes.",
      },
      {
        title: "8. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. Any changes will be posted on our website.",
      },
    ],
  },
};
