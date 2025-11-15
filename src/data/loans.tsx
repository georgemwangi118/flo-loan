import car from "../assets/car.jpg";
import house from "../assets/house.jpg";
import title from "../assets/title.jpg";

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
    image: house,
    link:"asset-finance-loan"
  },
  {
    id: 2,
    name: "Logbook Loan",
    description:
      "Get Vehicle Logbook Loan of up to Kes 5 million to keep you moving.",
    image: car,
    link:"logbook-loan"
  },
  {
    id: 3,
    name: "Title deed Loan",
    description:
      "Unlock the Value of Your Property with Our Title Deed Loans.",
    image: title,
    link:"title-deed-loan"
  },
 
];
