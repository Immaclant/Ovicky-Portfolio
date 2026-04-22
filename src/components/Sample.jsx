import placeHolder from "../assets/images/placeholder-logo.jpg";
const Data = [
  {
    id: 1,
    title: "Research & Publications",
    description:
      "Peer-reviewed research papers and scholarly articles published in leading conferences and journals. Covering topics in computer science, AI, and data analytics.",
    image: "placeholder",
    buttonText: "View Publications",
  },
  {
    id: 2,
    title: "Project Development",
    description:
      "Full-stack web applications and software solutions built with modern technologies. From concept to deployment with focus on user experience and performance.",
    image: "placeholder",
    buttonText: "View Projects",
  },
  {
    id: 3,
    title: "Technical Writing",
    description:
      "Comprehensive documentation, technical blogs, and tutorial content. Making complex concepts accessible to both beginners and experienced developers.",
    image: "placeholder",
    buttonText: "Read Articles",
  },
];

function Sample() {
  const Card = Data.map((card) => {
    return (
      <div
        key={card.id}
        className="bg-white flex flex-col items-center rounded-lg shadow-sm transform hover:-translate-y-2 transition duration-900 relative hover:shadow-2xl"
      >
        <img
          src={placeHolder}
          alt="alt-text"
          className="w-100 md:w-fit rounded-t-lg"
        />
        <div className="py-6">
          <h3 className="text-lg font-bold">{card.title}</h3>
          <p className="text-gray-800 tracking-wider italic px-2 ">
            {card.description}
          </p>
          <button className=" bg-amber-400 px-4 py-2 mt-4 rounded-lg ">
            {card.buttonText}
          </button>
        </div>
      </div>
    );
  });

  return (
    <section className=" p-6 bg-blue-100">
      <div className=" mx-auto container  py-8 px-4 sm:px-0">
        <div className="text-gray-700 text-center">
          <h1 className="text-3xl font-extrabold text-center tracking-wide">
            Core areas of work
          </h1>
          <p className="text-lg tracking-wide pb-4">
            Navigate through years of scholarly contributions and research
            output
          </p>
        </div>
        <div className="md:flex space-y-8 md:space-y-0 md:space-x-8 text-center ">
          {Card}
        </div>
      </div>
    </section>
  );
}

export default Sample;
