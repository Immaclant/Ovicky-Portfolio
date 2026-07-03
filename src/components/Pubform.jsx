import { FiSearch } from "react-icons/fi";
import { PUBLICATION_FILTERS } from "../data/publicationFilters";

function PubForm({ activeFilter, onFilterChange, searchQuery, onSearchChange }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="pointer-events-none absolute inset-y-0 left-4 flex items-center h-full w-4 text-slate-500" />
          <input
            type="search"
            id="publication-search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, author, or keyword..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/80 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:bg-slate-900"
          />
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Publication categories"
        >
          {PUBLICATION_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onFilterChange(filter.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 border ${
                  isActive
                    ? "border-primary bg-primary text-slate-900 shadow-lg shadow-primary/20"
                    : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PubForm;
