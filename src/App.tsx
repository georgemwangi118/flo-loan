import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import ScrollToTop from "./ScrollToTop";
import LoanPage from "./pages/LoanPage";
import LegalPage from "./pages/LegalPage";
import ContentProvider from "./content/ContentProvider";

// Loaded only when someone opens /admin, so visitors never download the admin code.
const AdminApp = lazy(() => import("./admin/AdminApp"));

const PublicLayout: React.FC = () => (
  <ContentProvider>
    <Navbar />
    <Outlet />
    <Footer />
  </ContentProvider>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="min-h-screen bg-gray-100" />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-and-conditions" element={<LegalPage page="terms" />} />
          <Route path="/privacy-policy" element={<LegalPage page="privacy" />} />
          <Route path="/:slug" element={<LoanPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
