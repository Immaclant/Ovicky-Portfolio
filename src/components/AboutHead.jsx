import AboutBio from "./AboutBio";

function AboutHead() {
  return (
    <div className="bg-dark">
      {/* Hero Band */}
      <section className="relative overflow-hidden pt-12 pb-10">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(240,165,0,0.06) 0%, transparent 70%), linear-gradient(180deg, rgba(240,165,0,0.04) 0%, transparent 100%)",
          }}
        />
        {/* Decorative right line */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-px h-[60%] bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <div
            className="section-eyebrow"
            style={{ animation: "fadeUp 0.8s 0.2s both" }}
          >
            About Me
          </div>
          <h1
            className="font-serif font-black text-cream leading-[1.0] tracking-tight"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              animation: "fadeUp 0.9s 0.35s both",
            }}
          >
            The Person<br />Behind the{" "}
            <span className="italic text-gold">Work</span>
          </h1>
          <p
            className="mt-5 text-xs font-light tracking-[0.18em] uppercase text-cream-dim"
            style={{ animation: "fadeUp 0.9s 0.5s both" }}
          >
            Academic · Researcher · Leader
          </p>
        </div>
      </section>

      <AboutBio />
    </div>
  );
}

export default AboutHead;
