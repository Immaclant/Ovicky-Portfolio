import PubForm from "./Pubform";
import Pubimage from "./Pubimage";

function Pubhead() {
  return (
    <div className="bg-linear-to-tl from-gray-800  to-black min-h-screen">
      <div
        className=" container mx-auto space-y-4 py-4
     "
      >
        <p className="text-center text-lg font-light tracking-wide text-yellow-500">
          Publications
        </p>
        <h1 className="text-center  text-4xl text-yellow-500  tracking-wide font-extrabold">
          Research Portfolio
        </h1>
        <p className="text-gray-400 md:text-center tracking-wide">
          A curated collection of articles, journal papers,and books spanning
          over a decade if academic research
        </p>
      </div>
      <PubForm />
      <Pubimage />
    </div>
  );
}

export default Pubhead;
