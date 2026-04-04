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
    <section className="achievements-page">
      <div className="achievements-container">
        <div className="achievements-title">
          <h2 className="achievement-header">
            Years of research and teaching excellence
          </h2>
          <p className="achievement-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
            perspiciatis harum tempora modi repudiandae, ullam natus voluptatum?
            Optio accusamus odio sequi, soluta doloribus, quasi obcaecati
            corporis ipsum repellat esse nemo? Non pariatur facere nostrum iste
            debitis voluptate? Debitis consequatur impedit recusandae dolores
            voluptatibus neque quaerat voluptatem nihil optio qui. Suscipit quas
            deleniti nisi, explicabo rerum esse quo necessitatibus magnam
            architecto.
          </p>
        </div>
        <div className="achievements-grid">{mappedIcon}</div>
      </div>
    </section>
  );
}

export default Achievements;
