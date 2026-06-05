import AboutBio from "./AboutBio";
import quotation from "../assets/images/quotation-mark.png";



function AboutHead() {
  return (
    <section className="bg-linear-to-tl from-gray-800  to-black min-h-screen relative">
      <div className="flex items-center gap-4 flex-col">
        <p className="mt-8 text-transparent bg-clip-text bg-linear-to-tl from-amber-400 to-yellow-500 text-2xl ">
          ABOUT ME
        </p>
        <h1 className="text-6xl  text-center">
          The Person
          <br /> Behind the{" "}
          <span className=" bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-yellow-500 md:[text-shadow:0_0_100px_rgba(251,191,36,0.8)]">
            Work
          </span>
        </h1>
        <div className=" flex space-y-4 text-amber-400 font-bold space-x-4">
          <p className="transform transition hover:-translate-y-1 duration-900">
            Researcher
          </p>
          <span>.</span>
          <p className="transform transition hover:-translate-y-1 duration-900">
            Writer
          </p>
          <span>.</span>
          <p className="transform transition hover:-translate-y-1 duration-900">
            Lecturer
          </p>
        </div>
      </div>
      <AboutBio />
    </section>
  );
}

export default AboutHead;
