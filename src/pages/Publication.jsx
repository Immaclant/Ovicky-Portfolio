<<<<<<< HEAD
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
=======
function Publication() {
  return <h1>Hello World</h1>;
>>>>>>> parent of a76fadc (Osogbo Update)
}

export default Publication;
