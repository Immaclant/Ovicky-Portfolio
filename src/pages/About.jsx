import { useEffect } from "react";
import AboutHead from "../components/AboutHead";
import AboutGallery from "../components/AboutGallery";

function About() {
  useEffect(() => {
    document.title = "About Dr. Fehintola Victor A. | Counselling Psychologist & Lecturer";
  }, []);

  return (
    <div className="bg-manila min-h-screen">
      <AboutHead />
      <AboutGallery />
    </div>
  );
}

export default About;
