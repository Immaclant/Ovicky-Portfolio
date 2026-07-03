import { useEffect } from "react";
import Pubhead from "../components/Pubhead";

function Publication() {
  useEffect(() => {
    document.title = "Research Portfolio | Dr. Fehintola Victor A.";
  }, []);

  return (
    <section className="bg-slate-950 min-h-screen">
      <Pubhead />
    </section>
  );
}

export default Publication;
