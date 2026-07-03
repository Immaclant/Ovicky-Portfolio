import bgImage from "../assets/images/Ovicky-bg-img.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/90 via-[#0d0d0d]/70 to-[#0d0d0d]/40 pointer-events-none" />
      {/* Subtle gold radial glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative right-side vertical line */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 w-px h-[55%] bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-32">
        {/* Eyebrow */}
        <div
          className="section-eyebrow mb-6"
          style={{ animation: "fadeUp 0.8s 0.2s both" }}
        >
          Academic Portfolio
        </div>

        {/* Headline */}
        <h1
          className="font-serif font-black text-cream leading-[1.0] tracking-tight max-w-3xl"
          style={{
            fontSize: "clamp(3.2rem, 8vw, 6.5rem)",
            animation: "fadeUp 0.9s 0.35s both",
          }}
        >
          Exploring the<br />
          <span className="italic text-gold">Frontiers</span><br />
          of Knowledge
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 text-sm font-light tracking-[0.18em] uppercase text-cream-dim max-w-md"
          style={{ animation: "fadeUp 0.9s 0.5s both" }}
        >
          Researcher · Writer · Lecturer
        </p>

        {/* Buttons */}
        <div
          className="flex flex-wrap gap-4 mt-10"
          style={{ animation: "fadeUp 0.9s 0.65s both" }}
        >
          <button
            onClick={() => navigate("/publication")}
            className="btn-primary tracking-widest uppercase text-xs px-8 py-3.5"
          >
            View Publications
          </button>
          <button
            onClick={() => navigate("/about")}
            className="btn-secondary tracking-widest uppercase text-xs px-8 py-3.5"
          >
            About Me
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[0.65rem] tracking-[0.22em] uppercase text-cream-dim">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}

export default Home;
