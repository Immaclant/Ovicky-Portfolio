import { FiSearch } from "react-icons/fi";
import { PUBLICATION_FILTERS } from "../data/publicationFilters";

function PubForm({ activeFilter, onFilterChange, searchQuery, onSearchChange }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 border-b-2 border-ink bg-manila-dim">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <label htmlFor="publication-search" className="sr-only">Search</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 border-2 border-r-0 border-ink bg-manila text-ink">
              <FiSearch className="h-5 w-5" />
            </span>
            <input
              type="search"
              id="publication-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, author, or keyword..."
              className="intake-input !border-l-0"
            />
          </div>
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
                className={`btn-typewriter !px-3 !py-1.5 !text-xs ${
                  isActive ? "btn-typewriter-primary" : ""
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
