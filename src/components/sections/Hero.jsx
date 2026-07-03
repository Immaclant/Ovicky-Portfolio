import { motion } from "framer-motion";
import { FiArrowDown, FiBookOpen, FiAward, FiUsers, FiGlobe } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Container } from "../ui/Section";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const stats = [
  { icon: FiBookOpen, value: "80+", label: "Publications" },
  { icon: FiAward, value: "15+", label: "Years Research" },
  { icon: FiUsers, value: "30+", label: "Journals" },
  { icon: FiGlobe, value: "10+", label: "Countries" },
];

export function Hero() {
  const navigate = useNavigate();
  return (
    <Section size="full" background="gradient" id="home">
      <Container>
        <div className="relative min-h-screen flex flex-col items-center justify-center">
          <motion.div
            className="text-center max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="primary" dot size="sm">
                Researcher • Writer • Lecturer
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-slate-100 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Exploring the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600">
                Frontiers of Knowledge
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl lg:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Rigorous academic inquiry meets dedicated mentorship. Publishing
              groundbreaking research while nurturing the next generation of
              scholars.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button
                size="lg"
                rightIcon={<FiArrowDown className="w-4 h-4" />}
                onClick={() => navigate("/publication")}
              >
                View Publications
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/about")}
              >
                About Me
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-2xl hover:border-primary/30 hover:bg-slate-900/50 transition-all duration-500"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-slate-100">{stat.value}</div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-primary transition-colors"
            whileHover={{ y: 4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll down"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </Container>
    </Section>
  );
}