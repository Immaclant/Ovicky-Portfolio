import { useNavigate } from "react-router-dom";

export function CTA() {
  const navigate = useNavigate();

  return (
    <section className="section bg-manila relative overflow-hidden" id="cta">
      
      {/* Background ledger grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCBMIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNiwgMjYsIDI2LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="index-card p-10 md:p-16 bg-manila inline-block">
          
          <div className="flex justify-center mb-6">
            <span className="stamp-badge">Action Required</span>
          </div>
          
          <h2 className="font-serif font-black text-ink tracking-tight uppercase mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Initiate Collaboration
          </h2>

          <p className="text-ink text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed border-l-4 border-ledger pl-6 text-left">
            Currently accepting proposals for research collaboration, PhD supervision, and academic consultation. All inquiries are strictly confidential and subject to review.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              className="btn-typewriter btn-typewriter-primary"
              onClick={() => navigate("/contact")}
            >
              Submit Proposal [Form]
            </button>
            <button
              className="btn-typewriter"
              onClick={() => window.location.href = "mailto:fehintolagoodness@gmail.com"}
            >
              Direct Email
            </button>
          </div>

          <div className="mt-16 pt-8 border-t-2 border-dashed border-ink flex flex-col items-center">
            <div className="font-mono text-xs font-bold text-ink-light uppercase mb-4">External Dossiers</div>
            <div className="flex items-center justify-center gap-6 text-sm font-bold uppercase tracking-widest text-ink">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-ledger underline decoration-2 underline-offset-4">
                LinkedIn
              </a>
              <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-ledger underline decoration-2 underline-offset-4">
                Google Scholar
              </a>
              <a href="https://researchgate.net" target="_blank" rel="noopener noreferrer" className="hover:text-ledger underline decoration-2 underline-offset-4">
                ResearchGate
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}