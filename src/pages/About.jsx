<<<<<<< HEAD
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
=======
function About() {
  return <h1>Hello World</h1>;
>>>>>>> parent of a76fadc (Osogbo Update)
}

export default About;
