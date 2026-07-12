import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 pt-10 pb-20">
      
      {/* The Physical Index Card */}
      <motion.div 
        className="index-card max-w-4xl w-full p-6 md:p-10 relative bg-manila z-10"
        initial={{ opacity: 0, y: -40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1] }}
      >
        {/* Card Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-ink pb-4 mb-8">
          <div>
            <h1 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl text-ink uppercase tracking-tight">
              Dr. Fehintola Victor A.
            </h1>
            <p className="font-mono text-sm font-bold text-ink-light mt-2 uppercase">
              Ref No: FCE/EDU/PSYCH-01
            </p>
          </div>
          
          <motion.div 
            className="stamp-badge mt-4 md:mt-0 md:ml-4"
            initial={{ opacity: 0, scale: 1.5, rotate: -15 }}
            animate={{ opacity: 0.9, scale: 1, rotate: -3 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            Peer Reviewed
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2">
            <h2 className="font-bold text-lg uppercase tracking-wider mb-2">Subject Abstract</h2>
            <p className="text-lg leading-relaxed text-ink mb-6">
              Investigating cognitive and affective factors influencing learning outcomes, motivation, and academic adjustment. Pioneering research at the intersection of positive psychology, entrepreneurship education, and digital learning environments in Nigeria.
            </p>

            <h2 className="font-bold text-lg uppercase tracking-wider mb-2 mt-8">Primary Domains</h2>
            <ul className="font-mono text-sm leading-loose border-l-2 border-ledger pl-4 text-ink-light">
              <li>01. Educational Psychology</li>
              <li>02. Positive Psychology & Wellbeing</li>
              <li>03. Entrepreneurship Education</li>
              <li>04. Social Psychology in Education</li>
            </ul>
          </div>

          <div className="border-t-2 md:border-t-0 md:border-l-2 border-ink pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg uppercase tracking-wider mb-4">Metrics</h2>
              <div className="space-y-4 font-mono">
                <div>
                  <div className="text-xs text-ink-light">Publications</div>
                  <div className="text-2xl font-bold">80+</div>
                </div>
                <div>
                  <div className="text-xs text-ink-light">Citations</div>
                  <div className="text-2xl font-bold">500+</div>
                </div>
                <div>
                  <div className="text-xs text-ink-light">Experience (Yrs)</div>
                  <div className="text-2xl font-bold">15+</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => navigate("/publication")}
                className="btn-typewriter btn-typewriter-primary w-full"
              >
                Access Archive
              </button>
              <button
                onClick={() => navigate("/about")}
                className="btn-typewriter w-full"
              >
                View Dossier
              </button>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}