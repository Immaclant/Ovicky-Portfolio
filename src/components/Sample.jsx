import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiUsers, FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const areas = [
  {
    num: "01",
    title: "Academic Research",
    description:
      "Peer-reviewed studies, journal articles, and academic book contributions focused on Counselling Psychology, Special Education, and Adolescent Behavior.",
    icon: FiBookOpen,
    buttonText: "Browse Publications",
    link: "/publication",
  },
  {
    num: "02",
    title: "Teaching & Mentorship",
    description:
      "Nurturing future educators and researchers through undergraduate and graduate level courses in Educational Psychology, Counselling and Research Methods.",
    icon: FiUsers,
    buttonText: "Learn About Me",
    link: "/about",
  },
  {
    num: "03",
    title: "Community Advocacy",
    description:
      "Promoting psychological well-being, resilience, and educational inclusivity in local schools and communities across Oyo and Oyo State, Nigeria.",
    icon: FiHeart,
    buttonText: "Contact Me",
    link: "/contact",
  },
];

function Sample() {
  const navigate = useNavigate();

  return (
    <section className="bg-dark py-20" id="core-areas">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-eyebrow justify-center">Overview</p>
          <h2 className="font-serif font-bold text-cream" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Core Areas of Work
          </h2>
          <p className="mt-4 text-sm text-cream-dim font-light max-w-xl mx-auto leading-relaxed">
            Explore academic contributions, lecture programmes, and community interventions
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream-faint border border-cream-faint">
          {areas.map((card, i) => (
            <motion.div
              key={card.num}
              className="expertise-card flex flex-col justify-between"
              style={{ minHeight: "320px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[0.7rem] font-bold text-gold tracking-[0.2em] opacity-70">{card.num}</span>
                  <div className="w-10 h-10 flex items-center justify-center bg-gold/10 text-gold">
                    <card.icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-cream text-xl mb-3">{card.title}</h3>
                <p className="text-sm text-cream-dim font-light leading-relaxed">{card.description}</p>
              </div>
              <button
                onClick={() => navigate(card.link)}
                className="mt-8 self-start inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold border-b border-gold/30 hover:border-gold pb-0.5 transition-all duration-300"
              >
                {card.buttonText}
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Sample;
