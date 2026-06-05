import {
  researchExperience,
  conferences,
  journalArticles,
  bookChapters,
} from "../data/Publications";

function Pubimage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* 1. Journal Articles Section */}
      <div>
        <h2 className="text-2xl font-bold text-amber-400 mb-6 border-b border-amber-500/30 pb-2">
          Journal Articles
        </h2>
        <div className="space-y-4">
          {journalArticles.map((article, index) => (
            <div
              key={index}
              className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-amber-500/40 transition"
            >
              <p className="text-sm text-slate-400">
                {article.authors.join(", ")} ({article.year})
              </p>
              <h3 className="text-lg font-semibold text-gray-100 my-1">
                {article.title}
              </h3>
              <p className="text-sm text-amber-500/80">
                {article.journal}, Vol. {article.volume}
                {article.issue ? `, Issue ${article.issue}` : ""}, pp.{" "}
                {article.pages}
              </p>
              {article.doi && (
                <a
                  href={article.doi}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-xs text-blue-400 hover:underline"
                >
                  DOI Link
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Book Chapters Section */}
      <div>
        <h2 className="text-2xl font-bold text-amber-400 mb-6 border-b border-amber-500/30 pb-2">
          Book Chapters
        </h2>
        <div className="space-y-4">
          {bookChapters.map((chapter, index) => (
            <div
              key={index}
              className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-amber-500/40 transition"
            >
              <p className="text-sm text-slate-400">
                {chapter.authors.join(", ")} ({chapter.year})
              </p>
              <h3 className="text-lg font-semibold text-gray-100 my-1">
                {chapter.title}
              </h3>
              <p className="text-sm text-slate-300">
                In: <span className="italic">{chapter.book}</span>
              </p>
              {chapter.editors.length > 0 && (
                <p className="text-xs text-slate-400 mt-1">
                  Editors: {chapter.editors.join(", ")}
                </p>
              )}
              <p className="text-xs text-amber-500/80 mt-1">
                Pages: {chapter.pages}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Conferences Section */}
      <div>
        <h2 className="text-2xl font-bold text-amber-400 mb-6 border-b border-amber-500/30 pb-2">
          Conferences
        </h2>
        <div className="space-y-4">
          {conferences.map((conf, index) => (
            <div
              key={index}
              className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-amber-500/40 transition"
            >
              <p className="text-sm text-slate-400">
                {conf.authors.join(", ")} ({conf.year})
              </p>
              <h3 className="text-lg font-semibold text-gray-100 my-1">
                {conf.title}
              </h3>
              <p className="text-sm text-amber-500/80">
                Presented at:{" "}
                <span className="font-medium text-slate-300">{conf.event}</span>{" "}
                ({conf.date})
              </p>
              <p className="text-xs text-slate-400 mt-1">Venue: {conf.venue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pubimage;
