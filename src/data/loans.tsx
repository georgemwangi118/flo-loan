import hilux from "../assets/cars/hilux-black.jpg";
import cx5 from '../assets/cars/cx5-red.jpeg'
import house from "../assets/house.jpg";
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
    name: "Asset Finance Loan",
    description:
      "Invest in Your Dreams. Own the asset that will take you further.",
    image: cx5,
    link:"asset-finance-loan"
  },
  {
    id: 2,
    name: "Logbook Loan",
    description:
      "Get Vehicle Logbook Loan of up to Kes 5 million to keep you moving.",
    image: hilux,
    link:"logbook-loan"
  },
  {
    id: 3,
    name: "Title deed Loan",
    description:
      "Unlock the Value of Your Property with Our Title Deed Loans.",
    image: house,
    link:"title-deed-loan"
  },
 
];
