function PubHead() {
  return (
    <div className="bg-manila border-b-4 border-double border-ink pt-24 pb-12 relative overflow-hidden">
      {/* Background ledger grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCBMIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNiwgMjYsIDI2LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 text-center relative z-10">
        <div className="inline-flex justify-center mb-6">
          <span className="folder-tab">Archive Directory</span>
        </div>

        <h1
          className="font-serif font-black text-ink tracking-tight uppercase"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          Research Output
        </h1>

        <p className="mt-4 text-ink-light font-mono text-sm max-w-2xl mx-auto uppercase leading-relaxed border-t-2 border-dashed border-ink pt-4">
          A comprehensive catalog of peer-reviewed journal articles, books,
          chapters, and conference presentations.
        </p>
      </div>
    </div>
  );
}

export default PubHead;
