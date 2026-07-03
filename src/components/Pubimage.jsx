import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import {
  bookChapters,
  conferences,
  journalArticles,
  researchExperience,
} from "../data/Publications";

const RESEARCH_STATUS_LABELS = {
  proposal: "Proposed Research",
  ongoing: "Ongoing Research",
  completed: "Completed Research",
};

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Returns true if created_at is within the last 7 days.
 * Only Supabase records have created_at; local fallback data never shows the badge.
 */
function isNewPublication(createdAt) {
  if (!createdAt) return false;
  return Date.now() - new Date(createdAt).getTime() < ONE_WEEK_MS;
}

function NewBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 absolute top-4 right-4 z-10">
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
      </span>
      <span
        className="text-[0.6rem] font-black uppercase tracking-[0.18em] px-2 py-0.5 text-dark"
        style={{ background: "#f0a500" }}
      >
        New
      </span>
    </span>
  );
}

function normalizeText(...values) {
  return values.flat().filter(Boolean).join(" ").toLowerCase();
}

function matchesQuery(text, query) {
  if (!query.trim()) return true;
  return text.includes(query.trim().toLowerCase());
}

function PublicationCard({ pub, children, className = "" }) {
  const showNew = isNewPublication(pub?.created_at);
  return (
    <div
      className={`relative rounded-none border border-[rgba(245,240,232,0.07)] bg-dark-2 p-6 sm:p-8 transition-all duration-300 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1 flex flex-col justify-between ${className}`}
    >
      {showNew && <NewBadge />}
      {children}
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="text-center py-16 border border-dashed border-cream-faint rounded-none">
      <h3 className="font-serif font-bold text-gold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-cream-dim max-w-sm mx-auto font-light">{description}</p>
    </div>
  );
}

function Pubimage({ activeFilter, searchQuery, filterLabel }) {
  const [supabasePubs, setSupabasePubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { data, error } = await supabase
          .from("publications")
          .select("*")
          .order("year", { ascending: false });
        if (error) throw error;
        setSupabasePubs(data || []);
      } catch (err) {
        console.warn("Supabase fetch failed, using local data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const useLiveDb = supabasePubs.length > 0;

  const journalsList   = useLiveDb ? supabasePubs.filter((p) => p.category === "journal")     : journalArticles;
  const booksList      = useLiveDb ? supabasePubs.filter((p) => p.category === "book")        : bookChapters;
  const conferencesList = useLiveDb ? supabasePubs.filter((p) => p.category === "conference") : conferences;
  const researchProjects = useLiveDb
    ? supabasePubs.filter((p) => p.category === "research").map((p) => ({
        status: p.status_label?.toLowerCase().includes("ongoing")
          ? "ongoing"
          : p.status_label?.toLowerCase().includes("proposal")
          ? "proposal"
          : "completed",
        statusLabel: p.status_label || "Ongoing Research",
        year: p.year,
        title: p.title,
        author: p.authors?.join(", ") || "Fehintola V. A.",
        pdf_url: p.pdf_url,
        url: p.url,
        doi: p.doi,
        period: p.period,
        created_at: p.created_at,
      }))
    : Object.entries(researchExperience).map(([status, item]) => ({
        status,
        statusLabel: RESEARCH_STATUS_LABELS[status] || status,
        ...item,
        period: "after",
      }));

  /* Search filtering */
  const filteredJournals    = journalsList.filter((a) => matchesQuery(normalizeText(a.title, a.authors, a.journal, a.volume, a.issue, a.pages, a.year), searchQuery));
  const filteredBooks       = booksList.filter((b) => matchesQuery(normalizeText(b.title, b.authors, b.book, b.editors, b.pages, b.year), searchQuery));
  const filteredConferences = conferencesList.filter((c) => matchesQuery(normalizeText(c.title, c.authors, c.event, c.venue, c.date, c.year), searchQuery));
  const filteredResearch    = researchProjects.filter((p) => matchesQuery(normalizeText(p.title, p.author || p.authors, p.statusLabel, p.year), searchQuery));

  const showJournals    = activeFilter === "all" || activeFilter === "journals";
  const showBooks       = activeFilter === "all" || activeFilter === "books";
  const showConferences = activeFilter === "all" || activeFilter === "conferences";
  const showResearch    = activeFilter === "all" || activeFilter === "research";

  const getGroupedSection = (items, periodType) =>
    items.filter((item) => (item.period || "after").toLowerCase() === periodType);

  const totalVisible =
    (showJournals    ? filteredJournals.length    : 0) +
    (showBooks       ? filteredBooks.length       : 0) +
    (showConferences ? filteredConferences.length : 0) +
    (showResearch    ? filteredResearch.length    : 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-cream-dim gap-4">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest">Loading publications…</span>
      </div>
    );
  }

  const renderActionButtons = (pub) => (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {pub.pdf_url && (
        <a
          href={pub.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wide bg-gold text-dark hover:bg-primary-light transition-all duration-300"
        >
          <FiDownload className="w-3.5 h-3.5" />
          Download PDF
        </a>
      )}
      {(pub.url || pub.doi) && (
        <a
          href={pub.url || (pub.doi?.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wide border border-cream-faint text-cream-dim hover:text-gold hover:border-gold/50 transition-all duration-300"
        >
          <FiExternalLink className="w-3.5 h-3.5" />
          {pub.doi ? "View DOI" : "Direct Link"}
        </a>
      )}
    </div>
  );

  const renderGroupedPublications = (items, title, idPrefix, renderCard) => {
    const afterPromotion  = getGroupedSection(items, "after");
    const beforePromotion = getGroupedSection(items, "before");
    if (items.length === 0) return null;

    return (
      <section aria-labelledby={`${idPrefix}-heading`} className="space-y-8">
        {/* Section heading */}
        <div className="flex items-center gap-3 border-b border-cream-faint pb-4">
          <span className="w-1 h-7 bg-gold flex-shrink-0" />
          <h2
            id={`${idPrefix}-heading`}
            className="font-serif font-bold text-cream text-2xl"
          >
            {title}
          </h2>
        </div>

        {afterPromotion.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-[0.65rem] uppercase tracking-[0.22em] text-cream-dim font-bold">
              After Last Promotion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {afterPromotion.map((item, index) => renderCard(item, `${idPrefix}-after-${index}`))}
            </div>
          </div>
        )}

        {beforePromotion.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-[0.65rem] uppercase tracking-[0.22em] text-cream-dim font-bold">
              Before Last Promotion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {beforePromotion.map((item, index) => renderCard(item, `${idPrefix}-before-${index}`))}
            </div>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-16">
      {/* Results bar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-cream-faint pb-5">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold font-bold">
            Showing · {filterLabel}
          </p>
          {useLiveDb && (
            <span className="inline-flex items-center gap-1.5 text-[0.6rem] text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 mt-2 font-bold uppercase tracking-wider">
              ✓ Live Database
            </span>
          )}
        </div>
        <p className="text-sm text-cream-dim font-light">
          {totalVisible} result{totalVisible === 1 ? "" : "s"}
          {searchQuery.trim() ? ` for "${searchQuery.trim()}"` : ""}
        </p>
      </div>

      {totalVisible === 0 && (
        <EmptyState
          title="No publications found"
          description="Try selecting another category or typing different search terms."
        />
      )}

      {/* 1. Journal Articles */}
      {showJournals &&
        renderGroupedPublications(filteredJournals, "Journal Articles", "journals", (article, key) => (
          <PublicationCard key={key} pub={article}>
            <div className="space-y-2">
              <span className="text-[0.65rem] text-cream-dim font-medium tracking-wide">
                {article.authors.join(", ")} ({article.year})
              </span>
              <h4 className="font-serif font-bold text-cream text-base leading-snug">
                {article.title}
              </h4>
              <p className="text-xs text-gold/80 italic font-medium">
                {article.journal}, Vol. {article.volume}
                {article.issue ? `, Issue ${article.issue}` : ""}
                {article.pages ? `, pp. ${article.pages}` : ""}
              </p>
            </div>
            {renderActionButtons(article)}
          </PublicationCard>
        ))}

      {/* 2. Book Chapters */}
      {showBooks &&
        renderGroupedPublications(filteredBooks, "Book Chapters", "books", (chapter, key) => (
          <PublicationCard key={key} pub={chapter}>
            <div className="space-y-2">
              <span className="text-[0.65rem] text-cream-dim font-medium tracking-wide">
                {chapter.authors.join(", ")} ({chapter.year})
              </span>
              <h4 className="font-serif font-bold text-cream text-base leading-snug">
                {chapter.title}
              </h4>
              <p className="text-xs text-cream-dim">
                In: <span className="italic font-semibold text-cream">{chapter.book}</span>
              </p>
              {chapter.editors?.length > 0 && (
                <p className="text-[0.65rem] text-cream-dim">Editors: {chapter.editors.join(", ")}</p>
              )}
              {chapter.pages && (
                <p className="text-[0.65rem] text-gold/80 font-medium">Pages: {chapter.pages}</p>
              )}
            </div>
            {renderActionButtons(chapter)}
          </PublicationCard>
        ))}

      {/* 3. Conferences */}
      {showConferences &&
        renderGroupedPublications(filteredConferences, "Conferences", "conferences", (conference, key) => (
          <PublicationCard key={key} pub={conference}>
            <div className="space-y-2">
              <span className="text-[0.65rem] text-cream-dim font-medium tracking-wide">
                {conference.authors.join(", ")} ({conference.year})
              </span>
              <h4 className="font-serif font-bold text-cream text-base leading-snug">
                {conference.title}
              </h4>
              <p className="text-xs text-gold/80">
                Presented at:{" "}
                <span className="font-semibold text-cream">{conference.event}</span>{" "}
                ({conference.date})
              </p>
              <p className="text-[0.65rem] text-cream-dim">Venue: {conference.venue}</p>
            </div>
            {renderActionButtons(conference)}
          </PublicationCard>
        ))}

      {/* 4. Research Projects */}
      {showResearch &&
        renderGroupedPublications(filteredResearch, "Research Projects", "research", (project, key) => (
          <PublicationCard key={key} pub={project}>
            <div className="space-y-3">
              <span
                className="inline-block text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 border border-gold/20 bg-gold/5 text-gold"
              >
                {project.statusLabel}
              </span>
              <div>
                <span className="text-[0.65rem] text-cream-dim font-medium">
                  {project.author || "Fehintola V. A."} ({project.year})
                </span>
                <h4 className="font-serif font-bold text-cream text-base leading-snug mt-1">
                  {project.title}
                </h4>
              </div>
            </div>
            {renderActionButtons(project)}
          </PublicationCard>
        ))}
    </div>
  );
}

export default Pubimage;
