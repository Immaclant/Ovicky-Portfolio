import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PubForm from "./Pubform";
import Pubimage from "./Pubimage";
import {
  PUBLICATION_FILTERS,
  URL_TYPE_MAP,
} from "../data/publicationFilters";

function getInitialFilter(searchParams) {
  const type = searchParams.get("type")?.toLowerCase();
  return URL_TYPE_MAP[type] || "all";
}

function Pubhead() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(() =>
    getInitialFilter(searchParams),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);

    const nextParams = new URLSearchParams(searchParams);

    if (filterId === "all") {
      nextParams.delete("type");
    } else {
      const urlType =
        filterId === "journals"
          ? "journal"
          : filterId === "books"
            ? "book"
            : filterId === "conferences"
              ? "conference"
              : filterId;
      nextParams.set("type", urlType);
    }

    setSearchParams(nextParams, { replace: true });
  };

  const filterLabel = useMemo(
    () =>
      PUBLICATION_FILTERS.find((filter) => filter.id === activeFilter)?.label ||
      "All",
    [activeFilter],
  );

  return (
    <div className="bg-slate-950 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 pt-24 pb-12 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative container mx-auto px-4 max-w-4xl text-center space-y-4">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-primary font-bold">
            Publications
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-100 tracking-tight">
            Research Portfolio
          </h1>
          <p className="mx-auto max-w-2xl text-slate-400 text-lg leading-relaxed">
            A curated collection of journal articles, conference papers, and book chapters
            spanning over a decade of rigorous academic research.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="sticky top-16 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 shadow-xl shadow-black/20">
        <PubForm
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <Pubimage
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        filterLabel={filterLabel}
      />
    </div>
  );
}

export default Pubhead;
