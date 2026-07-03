import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiGlobe, FiExternalLink, FiMapPin } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const CONTACT_EMAIL = "fehintolagoodness@gmail.com";

const footerLinks = {
  research: [
    { name: "Journal Articles", href: "/publication?type=journal" },
    { name: "Conferences",      href: "/publication?type=conference" },
    { name: "Book Chapters",    href: "/publication?type=book" },
    { name: "Research Projects",href: "/publication?type=research" },
  ],
  company: [
    { name: "About",        href: "/about" },
    { name: "Contact",      href: "/contact" },
    { name: "Google Scholar", href: "https://scholar.google.com/scholar?q=Fehintola+Victor", external: true },
    { name: "Admin Panel",  href: "/admin" },
  ],
};

const socialLinks = [
  { name: "Email",   href: `mailto:${CONTACT_EMAIL}`,    icon: FiMail },
  { name: "LinkedIn",href: "https://linkedin.com",        icon: FiLinkedin },
  { name: "Scholar", href: "https://scholar.google.com",  icon: FiGlobe },
  { name: "ResearchGate", href: "https://researchgate.net", icon: FiExternalLink },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{ background: "#141414", borderColor: "rgba(245,240,232,0.07)" }}
    >
      {/* Top gold line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-serif font-bold text-gold text-xl mb-4 tracking-wide">
              Dr Fehintola Victor
            </p>
            <p className="text-sm text-cream-dim font-light leading-relaxed max-w-xs mb-2">
              Dedicated to advancing knowledge through rigorous research and inspiring
              the next generation of scholars.
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-cream-dim">
              <FiMapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>FCE (Special), Oyo, Nigeria</span>
            </div>
            {/* Social */}
            <div className="flex gap-2 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 border flex items-center justify-center text-cream-dim transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10"
                  style={{ borderColor: "rgba(245,240,232,0.12)", borderRadius: "2px" }}
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Research */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold mb-5">Research</p>
            <ul className="space-y-3">
              {footerLinks.research.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    className="group flex items-center gap-2.5 text-sm text-cream-dim hover:text-gold transition-colors duration-300 font-light"
                  >
                    <span className="inline-block w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold mb-5">Academic</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) =>
                link.external ? (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 text-sm text-cream-dim hover:text-gold transition-colors duration-300 font-light"
                    >
                      <span className="inline-block w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
                      {link.name}
                      <FiExternalLink className="w-3 h-3 text-cream-faint ml-0.5" />
                    </a>
                  </li>
                ) : (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      className="group flex items-center gap-2.5 text-sm text-cream-dim hover:text-gold transition-colors duration-300 font-light"
                    >
                      <span className="inline-block w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
                      {link.name}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(245,240,232,0.07)" }}
        >
          <p className="text-xs text-cream-dim font-light">
            © {year} Dr. Fehintola Victor A. All rights reserved.
          </p>
          <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-gold">
            Excellence · Integrity · Impact
          </p>
        </div>
      </div>
    </footer>
  );
}