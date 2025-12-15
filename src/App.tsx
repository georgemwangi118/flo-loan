import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoanDetails from "./pages/LoanDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import LogbookLoan from "./pages/LogbookLoan";
import AssetFinanceLoan from "./pages/AssetFinanceLoan";
import TitleDeedLoan from "./pages/TitleDeedLoan";
import ScrollToTop from "./ScrollToTop";
import BuyOffLoan from "./pages/BuyOffLoan";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loans/:id" element={<LoanDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logbook-loan" element={<LogbookLoan />} />
          <Route path="/asset-finance-loan" element={<AssetFinanceLoan />} />
          <Route path="/buy-off-loan" element={<BuyOffLoan />} />
          <Route path="/title-deed-loan" element={<TitleDeedLoan />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
