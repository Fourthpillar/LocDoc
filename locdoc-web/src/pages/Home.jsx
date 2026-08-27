import { useEffect } from "react";
import Hero from "../components/home/Hero.jsx";
import TrustMetrics from "../components/home/TrustMetrics.jsx";
import LiveWaitlist from "../components/home/LiveWaitlist.jsx";
import ServicePillars from "../components/home/ServicePillars.jsx";
import SpecialtiesGrid from "../components/SpecialtiesGrid.jsx";
import TopClinics from "../components/TopClinics.jsx";
import DoctorVerification from "../components/home/DoctorVerification.jsx";
import FacilityPreview from "../components/home/FacilityPreview.jsx";
import RegisterBusiness from "../components/home/RegisterBusiness.jsx";
import CtaBanner from "../components/home/CtaBanner.jsx";
import { useReveal } from "../hooks/useReveal.js";

export default function Home() {
  useReveal();
  useEffect(() => {
    document.title = "LocDoc — Healthcare that shows up on time";
  }, []);

  return (
    <>
      <Hero />
      <TrustMetrics />
      <ServicePillars />
      <LiveWaitlist />
      <SpecialtiesGrid />
      <TopClinics limit={4} />
      <DoctorVerification />
      <FacilityPreview />
      <RegisterBusiness />
      <CtaBanner />
    </>
  );
}
