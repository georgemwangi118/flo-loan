// Shape of all editable site content. Stored as JSON by the PHP API
// (public/api/content.php) and edited through the /admin panel.

export type ApplicationScript =
  | "logbook"
  | "asset_finance"
  | "buy_off_loan"
  | "title_deed_loan";

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface LoanSection {
  heading: string;
  items: string[];
}

export interface Loan {
  id: string;
  slug: string;
  name: string;
  summary: string;
  image: string;
  pageTitle: string;
  intro: string[];
  sections: LoanSection[];
  applyButtonLabel: string;
  formTitle: string;
  applicationScript: ApplicationScript;
}

export interface CoreValue {
  title: string;
  text: string;
}

export interface LegalSection {
  title: string;
  body: string;
}

export interface LegalPage {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export interface SiteContent {
  general: {
    whatsappNumber: string;
    whatsappMessage: string;
  };
  slides: Slide[];
  home: {
    loansHeading: string;
    heroTitle: string;
    heroText: string;
    heroButtonLabel: string;
    heroImage: string;
  };
  loans: Loan[];
  about: {
    title: string;
    intro: string;
    mission: string;
    vision: string;
    valuesHeading: string;
    values: CoreValue[];
  };
  contact: {
    title: string;
    text: string;
    buttonLabel: string;
    whatsappMessage: string;
  };
  footer: {
    companyName: string;
    companyText: string;
    supportHours: string;
    noticeTitle: string;
    noticeText: string;
    regulatory: string;
    creditReporting: string;
    copyright: string;
  };
  terms: LegalPage;
  privacy: LegalPage;
}
