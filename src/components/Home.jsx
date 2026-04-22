import bgImage from "../assets/images/Ovicky-bg-img.jpg";
import { HiArrowLongDown } from "react-icons/hi2";

function Home() {
  return (
    <section
      className="text-gray-100 min-h-screen relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-0"></div>

      <div className="flex z-10  relative justify-center items-center flex-col py-30 tracking-widest md:w-1/3 w-2/3 mx-auto text-center  sm:space-y-12 md:space-y-20 space-y-8">
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
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold">
          Exploring the
          <span className="text-transparent bg-clip-text mx-2 bg-yellow-400 mr-2">
            Frontiers
          </span>
          of Knowledge
        </h2>
        <p className="typewriter  max-sm:text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
          libero, enim iste laudantium ea, commodi, aspernatur repellat |
        </p>
        <div className="space-y-6 space-x-4  ">
          <button className="   px-4 py-2 rounded-lg shadow-black text-amber-100 bg-white/20 border border-white/30  shadow-md">
            View Publications
          </button>
          <button className="  bg-amber-400 px-4 py-2 rounded-lg shadow-mist-200 text-amber-100 ">
            About
          </button>
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 flex items-center transform -translate-x-1/2 text-center flex-col font-thin">
        <HiArrowLongDown className="animate-bounce  bg-clip-text  hover:bg-amber-500" />
        <p className="mt-1 tracking-wide text-xs">Scroll down</p>
      </div>
    </section>
  );
}
export default Home;
