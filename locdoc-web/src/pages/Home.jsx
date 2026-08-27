import { useEffect } from "react";
import Hero from "../components/home/Hero.jsx";
import ServicePillars from "../components/home/ServicePillars.jsx";
import SpecialtiesGrid from "../components/SpecialtiesGrid.jsx";
import TopClinics from "../components/TopClinics.jsx";
import DoctorVerification from "../components/home/DoctorVerification.jsx";
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
      <ServicePillars />
      <SpecialtiesGrid />
      <TopClinics limit={4} />
      <DoctorVerification />
      <RegisterBusiness />
      <CtaBanner />
    </>
  );
}
