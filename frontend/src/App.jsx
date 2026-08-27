import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SalesChat from "./components/SalesChat.jsx";
import Home from "./pages/Home.jsx";
import FindDoctors from "./pages/FindDoctors.jsx";
import DoctorDetail from "./pages/DoctorDetail.jsx";
import Medicines from "./pages/Medicines.jsx";
import LabTests from "./pages/LabTests.jsx";
import RegisterFacility from "./pages/RegisterFacility.jsx";
import RegisterDoctor from "./pages/RegisterDoctor.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<FindDoctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/register/hospital" element={<RegisterFacility type="hospital" />} />
          <Route path="/register/pharmacy" element={<RegisterFacility type="pharmacy" />} />
          <Route path="/register/labs" element={<RegisterFacility type="labs" />} />
          <Route path="/register/doctor" element={<RegisterDoctor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Navigate to="/login" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <SalesChat />
    </div>
  );
}
