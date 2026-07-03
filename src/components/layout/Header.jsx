import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Publications", href: "/publication" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-[rgba(13,13,13,0.90)] backdrop-blur-xl border-b border-[rgba(245,240,232,0.08)] shadow-2xl"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav
        className="mx-auto max-w-7xl px-6 lg:px-12"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="font-serif text-lg font-bold text-gold tracking-wide hover:opacity-80 transition-opacity"
            aria-label="Dr. Fehintola Victor — Home"
          >
            Dr Fehintola Victor
          </NavLink>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10" role="list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    `text-[0.82rem] font-semibold uppercase tracking-[0.09em] transition-colors duration-300 ${
                      isActive ? "text-gold" : "text-cream-dim hover:text-gold"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="btn-primary text-xs tracking-widest uppercase px-6 py-2.5"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 border border-cream-faint text-cream-dim hover:border-gold hover:text-gold transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden overflow-hidden bg-dark border-t border-cream-faint"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="py-6 space-y-1 px-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    end={link.href === "/"}
                    className={({ isActive }) =>
                      `block py-3 text-sm font-semibold uppercase tracking-widest border-b border-cream-faint transition-colors duration-300 ${
                        isActive ? "text-gold" : "text-cream-dim hover:text-gold"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-6">
                  <button
                    onClick={() => { setIsOpen(false); navigate("/contact"); }}
                    className="btn-primary w-full text-xs tracking-widest uppercase"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}