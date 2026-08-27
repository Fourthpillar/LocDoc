import { useEffect } from "react";
import FacilityPreview from "../components/home/FacilityPreview.jsx";
import { useReveal } from "../hooks/useReveal.js";

export default function Platform() {
  useReveal();
  useEffect(() => {
    document.title = "Platform — LocDoc";
  }, []);

  return <FacilityPreview />;
}
