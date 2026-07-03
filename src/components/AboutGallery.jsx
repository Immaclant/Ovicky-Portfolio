import { motion } from "framer-motion";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
    title: "University Instruction",
    desc: "Lecturing on Counselling Psychology and Educational foundations.",
    span: true, // large left tile spanning 2 rows
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80",
    title: "Clinical Counselling",
    desc: "Guiding students through socio-emotional crises.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=80",
    title: "Scholarly Research",
    desc: "Authoring textbooks and peer-reviewed articles for international journals.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    title: "Empirical Studies",
    desc: "Collecting data on resilience, burnout, and student adjustment trends.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    title: "Graduate Mentorship",
    desc: "Supervising postgraduate research and nurturing academic talent.",
  },
];

function AboutGallery() {
  return (
    <section className="bg-dark-2 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-eyebrow">Gallery</p>
            <h2 className="font-serif font-bold text-cream" style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)" }}>
              In the Frame
            </h2>
          </div>
          <span className="text-xs text-cream-dim tracking-[0.12em] uppercase hidden sm:block">
            0{galleryImages.length} Images
          </span>
        </div>

        {/* Grid — 1.3fr 1fr 1fr, first item spans 2 rows */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "1.3fr 1fr 1fr",
            gridTemplateRows: "280px 280px",
          }}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              className="relative overflow-hidden cursor-pointer group"
              style={img.span ? { gridRow: "span 2" } : {}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: "grayscale(30%)" }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(30%)")}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/70 via-transparent to-transparent transition-opacity duration-400 group-hover:opacity-40" />
              {/* Gold border reveal */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/60 transition-all duration-400 pointer-events-none" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif font-bold text-cream text-base group-hover:text-gold transition-colors duration-300">
                  {img.title}
                </h3>
                <p className="text-xs text-cream-dim mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 font-light">
                  {img.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutGallery;
