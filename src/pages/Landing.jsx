import { useEffect } from "react";
import { Hero } from "../components/sections/Hero";
import { Achievements } from "../components/sections/Achievements";
import { ResearchFocus } from "../components/sections/ResearchFocus";
import Sample from "../components/Sample";
import { Testimonials } from "../components/sections/Testimonials";
import { CTA } from "../components/sections/CTA";

function Landing() {
  useEffect(() => {
    document.title = "Dr. Fehintola Victor A. | Academic Portfolio & Lecturer";
  }, []);

  return (
    <main className="bg-manila overflow-hidden relative">
      <Hero />
      <Achievements />
      <Sample />
      <ResearchFocus />
      <Testimonials />
      <CTA />
    </main>
  );
}

export default Landing;
