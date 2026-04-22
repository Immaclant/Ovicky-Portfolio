import {
  FaBookOpen,
  FaGraduationCap,
  FaFileAlt,
  FaAward,
} from "react-icons/fa";
import Icon from "./Icon";

const iconsArray = [
  { id: 1, icon: FaBookOpen, text: "20+ Publications" },
  { id: 2, icon: FaGraduationCap, text: "10+ Years Teaching" },
  { id: 3, icon: FaFileAlt, text: "50+ Papers" },
  { id: 4, icon: FaAward, text: "Award Winning Researcher" },
];

function Achievements() {
  const mappedIcon = iconsArray.map((ic) => {
    return <Icon key={ic.id} iconImage={ic.icon} iconText={ic.text} />;
  });

  return (
    <section
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1712397943847-e104395a1a8b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-blue-100 p-4 relative text-justify text-gray-200 lg:h-200 flex justify-center items-center"
    >
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
      <div className="relative z-10 container mx-auto lg:w-2/3">
        <h2 className="text-center mb-4 text-2xl uppercase font-extrabold text-amber-500 ">
          Years of research and teaching excellence
        </h2>
        <div className=" flex md:text-[16px] text-sm/8 flex-col md:flex-row  items-center  md:space-x-6">
          <div className="md:w-1/2">
            <p className="achievement-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Aspernatur perspiciatis harum tempora modi repudiandae, ullam
              natus voluptatum? Optio accusamus odio sequi, soluta doloribus,
              quasi obcaecati corporis ipsum repellat esse nemo? Non pariatur
              facere nostrum iste debitis voluptate? Debitis consequatur impedit
              recusandae dolores voluptatibus neque quaerat voluptatem nihil
              optio qui. Suscipit quas deleniti nisi, explicabo rerum esse quo
              necessitatibus magnam architecto.
            </p>
          </div>
          <div className="  flex flex-col w-2/3 mx-auto md:grid grid-cols-2 gap-4  pt-4 text-amber-400">
            {mappedIcon}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;
