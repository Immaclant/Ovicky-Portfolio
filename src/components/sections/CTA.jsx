import { motion } from "framer-motion";
import { FiArrowRight, FiMail, FiLinkedin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Section, Container } from "../ui/Section";
import { Button } from "../ui/Button";

export function CTA() {
  const navigate = useNavigate();
  return (
    <Section size="md" background="gradient" id="cta">
      <Container>
        <motion.div
          className="relative p-8 md:p-16 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl" />
          <motion.div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 rounded-3xl" />

          <motion.h2
            className="relative text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Ready to Collaborate?
          </motion.h2>

          <motion.p
            className="relative text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Whether you're seeking a research collaborator, PhD supervisor, or expert consultant
            for your next project, I'd love to hear from you.
          </motion.p>

          <motion.div
            className="relative flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              rightIcon={<FiArrowRight className="w-5 h-5" />}
              onClick={() => navigate("/contact")}
            >
              Start a Conversation
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<FiMail className="w-5 h-5" />}
              onClick={() => window.location.href = "mailto:fehintolagoodness@gmail.com"}
            >
              Email Me
            </Button>
          </motion.div>

          <motion.div
            className="relative mt-10 flex items-center justify-center gap-8 text-slate-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://linkedin.com/in/fehintolavictor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <span className="w-px h-6 bg-slate-700" />
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              aria-label="Google Scholar"
            >
              <FiLinkedin className="w-5 h-5" />
              <span className="hidden sm:inline">Google Scholar</span>
            </a>
            <span className="w-px h-6 bg-slate-700" />
            <a
              href="https://researchgate.net/profile/Fehintola-Victor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              aria-label="ResearchGate"
            >
              <FiLinkedin className="w-5 h-5" />
              <span className="hidden sm:inline">ResearchGate</span>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}