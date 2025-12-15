import hilux from "../assets/cars/hilux-black.jpg";
import cx5 from '../assets/cars/cx5-red.jpeg'
import house from "../assets/house.jpg";
import demio from "../assets/cars/demio.jpg"
export interface LoanType {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

export const loanTypes: LoanType[] = [
  {
    id: 1,
    name: "Logbook Loan",
    description:
      "Logbook Mkononi, Pesa Mfukoni. Unlock up to 70% of your car's value while still driving it in just 6 hours.",
    image: hilux,
    link:"logbook-loan"
  },
  {
    id: 2,
    name: "Asset Finance Loan",
    description:
      "Need a new ride, Get up to 80% financing within 48 hours and flexible repayments of up to 36 months",
    image: cx5,
    link:"asset-finance-loan"
  },
  {
    id: 3,
    name: "Buy off Loan",
    description:
      "When it gets tough, we help you move forward, Our Buy off logbook loan product allows you to borrow more and stress less.",
    image: demio,
    link:"buy-off-loan"
  },
  {
    id: 4,
    name: "Title deed Loan",
    description:
      "Unlock the Value of Your Property with Our Title Deed Loans.",
    image: house,
    link:"title-deed-loan"
  },

];
