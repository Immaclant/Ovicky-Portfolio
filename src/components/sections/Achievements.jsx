import { FiBookOpen, FiFileText, FiAward, FiTrendingUp, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

const achievements = [
  { icon: FiBookOpen, value: "80+", label: "Peer-Reviewed Publications", desc: "Journal articles, conference papers, and book chapters" },
  { icon: FaGraduationCap, value: "15+", label: "Years Teaching Experience", desc: "Undergraduate and graduate level instruction" },
  { icon: FiFileText, value: "50+", label: "Research Papers", desc: "Published in high-impact journals and conferences" },
  { icon: FiAward, value: "12+", label: "Awards & Honors", desc: "National and international recognition" },
  { icon: FiTrendingUp, value: "500+", label: "Citations", desc: "Google Scholar citation count" },
  { icon: FiUsers, value: "20+", label: "Graduate Students Supervised", desc: "Masters and PhD completions" },
];

export function Achievements() {
  return (
    <section className="section bg-manila-dim border-y-2 border-ink" id="achievements">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b-4 border-double border-ink pb-4">
          <span className="folder-tab absolute -mt-10 bg-manila">Appendix A</span>
          <h2 className="font-serif font-black text-ink tracking-tight uppercase" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Academic Record
          </h2>
          <p className="mt-2 text-ink-light font-mono text-sm uppercase">
            Summary of scholarly impact and educational leadership
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex gap-4 border-b-2 border-ink pb-6">
              <div className="flex-shrink-0 mt-1">
                <achievement.icon className="w-8 h-8 text-stamp" strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-mono text-2xl font-bold text-ink">{achievement.value}</span>
                  <h3 className="font-bold text-ink uppercase tracking-wide">{achievement.label}</h3>
                </div>
                <p className="text-ink-light text-sm">{achievement.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}