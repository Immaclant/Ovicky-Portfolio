function PubForm() {
  return (
    <div className="max-w-3xl mx-auto p-4 ">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label htmlFor="publication-search" className="flex-1">
          <span className="sr-only">Search publications</span>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-amber-300">
              🔍
            </span>
            <input
              type="search"
              id="publication-search"
              placeholder="Search publications"
              className="w-full rounded-full border border-amber-500/60 bg-slate-900/95 px-12 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
            />
          </div>
        </label>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="rounded-xl border border-amber-500/70 bg-amber-500  px-5 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-400">
            Publications
          </button>
          <button className="rounded-xl border border-amber-500/70 bg-amber-500  px-5 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-400">
            Books
          </button>
          <button className="rounded-xl border border-amber-500/70 bg-amber-500  px-5 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-400">
            Journals
          </button>
        </div>
      </div>
    </div>
  );
}

export default PubForm;
