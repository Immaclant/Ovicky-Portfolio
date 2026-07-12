import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import { FiLogOut, FiPlus, FiTrash2, FiUploadCloud, FiBookOpen, FiFileText, FiAward } from "react-icons/fi";

function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Auth Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Publication Form State
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("Fehintola V. A.");
  const [year, setYear] = useState(new Date().getFullYear());
  const [category, setCategory] = useState("journal");
  const [period, setPeriod] = useState("after");
  
  // Category-specific fields
  const [journal, setJournal] = useState("");
  const [volume, setVolume] = useState("");
  const [issue, setIssue] = useState("");
  const [pages, setPages] = useState("");
  const [book, setBook] = useState("");
  const [editors, setEditors] = useState("");
  const [event, setEvent] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [projectAuthor, setProjectAuthor] = useState("Fehintola V. A.");
  const [projectStatus, setProjectStatus] = useState("ongoing"); // proposal, ongoing, completed
  
  // Links
  const [doi, setDoi] = useState("");
  const [url, setUrl] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Publications List State
  const [publications, setPublications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [listLoading, setListLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        fetchPublications();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchPublications();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPublications = async () => {
    setListLoading(true);
    try {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("year", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPublications(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load publications.");
    } finally {
      setListLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all credentials.");
      return;
    }
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user);
      toast.success("Successfully logged in.");
    } catch (err) {
      toast.error(err.message || "Invalid login details.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast.success("Logged out successfully.");
    } catch (err) {
      toast.error("Failed to sign out.");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF document.");
        return;
      }
      setPdfFile(file);
    }
  };

  const handleAddPublication = async (e) => {
    e.preventDefault();
    if (!title || !authors || !year) {
      toast.error("Title, authors, and year are required fields.");
      return;
    }

    setFormSubmitting(true);
    let uploadedPdfUrl = "";

    try {
      if (pdfFile) {
        setUploadingPdf(true);
        const fileExt = pdfFile.name.split(".").pop();
        const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "-").substring(0, 30);
        const fileName = `${safeTitle}_${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("publication-pdfs")
          .upload(fileName, pdfFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("publication-pdfs")
          .getPublicUrl(fileName);

        uploadedPdfUrl = publicUrl;
        setUploadingPdf(false);
      }

      const authorList = authors.split(",").map(a => a.trim()).filter(Boolean);
      const editorList = editors ? editors.split(",").map(e => e.trim()).filter(Boolean) : [];

      const payload = {
        title,
        authors: authorList,
        year: parseInt(year, 10),
        category,
        period,
        doi: doi || null,
        url: url || null,
        pdf_url: uploadedPdfUrl || null,
      };

      if (category === "journal") {
        payload.journal = journal;
        payload.volume = volume;
        payload.issue = issue;
        payload.pages = pages;
      } else if (category === "book") {
        payload.book = book;
        payload.editors = editorList;
        payload.pages = pages;
      } else if (category === "conference") {
        payload.event = event;
        payload.venue = venue;
        payload.date = date;
      } else if (category === "research") {
        payload.author = projectAuthor;
        payload.status_label = 
          projectStatus === "proposal" ? "Proposed Research" : 
          projectStatus === "ongoing" ? "Ongoing Research" : "Completed Research";
      }

      const { error: insertError } = await supabase
        .from("publications")
        .insert(payload);

      if (insertError) throw insertError;

      toast.success("Publication added successfully.");
      
      setTitle("");
      setPdfFile(null);
      setJournal("");
      setVolume("");
      setIssue("");
      setPages("");
      setBook("");
      setEditors("");
      setEvent("");
      setVenue("");
      setDate("");
      setDoi("");
      setUrl("");
      
      fetchPublications();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to add publication.");
    } finally {
      setUploadingPdf(false);
      setFormSubmitting(false);
    }
  };

  const handleDeletePublication = async (id, pdfUrl) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      if (pdfUrl) {
        try {
          const urlParts = pdfUrl.split("/storage/v1/object/public/publication-pdfs/");
          if (urlParts.length > 1) {
            const fileName = urlParts[1];
            await supabase.storage.from("publication-pdfs").remove([fileName]);
          }
        } catch (e) {
          console.error("Storage delete fail: ", e);
        }
      }

      const { error } = await supabase
        .from("publications")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Record expunged.");
      fetchPublications();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record.");
    }
  };

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-manila text-ink font-mono uppercase font-bold">
        Loading System...
      </div>
    );
  }

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-manila px-4 py-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCBMIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNiwgMjYsIDI2LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')]">
        
        <div className="index-card w-full max-w-md bg-manila-dim p-10 relative">
          <div className="absolute top-0 right-0 m-4">
            <FiAward className="h-8 w-8 text-stamp" />
          </div>

          <div className="mb-8 border-b-2 border-ink pb-4">
            <h2 className="text-3xl font-serif font-black text-ink uppercase tracking-tight">System Login</h2>
            <p className="font-mono text-xs text-ink-light mt-2 uppercase font-bold">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="intake-label">UID / Email</label>
              <input
                type="email"
                className="intake-input bg-manila"
                placeholder="admin@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="intake-label">Access Key</label>
              <input
                type="password"
                className="intake-input bg-manila"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full btn-typewriter btn-typewriter-primary mt-4 disabled:opacity-60"
            >
              {authLoading ? "AUTHENTICATING..." : "VERIFY IDENTITY"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="bg-manila text-ink min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-double border-ink pb-6 mb-10">
          <div>
            <span className="folder-tab absolute -mt-10 bg-manila-dim">Internal System</span>
            <h1 className="text-3xl font-serif font-black uppercase tracking-tight">Records Management</h1>
            <p className="font-mono text-xs text-ink-light mt-2 font-bold uppercase">Active Session: {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-typewriter text-xs !py-1 !px-3"
          >
            <FiLogOut className="mr-2" />
            Terminate Session
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10">
          {/* Left Column: Form */}
          <div>
            <div className="index-card bg-manila-dim p-8 sticky top-28">
              <div className="mb-6 border-b-2 border-ink pb-4 flex items-center justify-between">
                <h2 className="text-xl font-serif font-black uppercase tracking-wide">
                  Document Intake
                </h2>
                <FiPlus className="text-stamp h-6 w-6" />
              </div>

              <form onSubmit={handleAddPublication} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="intake-label">Document Category</label>
                    <select
                      className="intake-input bg-manila"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="journal">Journal Article</option>
                      <option value="book">Book Chapter</option>
                      <option value="conference">Conference Presentation</option>
                      <option value="research">Research Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="intake-label">Promotion Period</label>
                    <select
                      className="intake-input bg-manila"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                    >
                      <option value="after">After Last Promotion</option>
                      <option value="before">Before Last Promotion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="intake-label">Publication Title</label>
                  <input
                    type="text"
                    className="intake-input bg-manila"
                    placeholder="Enter the document title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="intake-label">Authors (Comma-separated)</label>
                    <input
                      type="text"
                      className="intake-input bg-manila"
                      placeholder="e.g. Fehintola V. A."
                      value={authors}
                      onChange={(e) => setAuthors(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="intake-label">Year</label>
                    <input
                      type="number"
                      className="intake-input bg-manila font-mono"
                      placeholder="2024"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* CATEGORY SPECIFIC FIELDS */}
                {/* ---------------------------------------------------- */}
                <div className="p-4 border-2 border-dashed border-ink bg-manila/50">
                  <div className="font-mono text-xs font-bold uppercase text-stamp mb-4">Metadata Specifics</div>
                  
                  {category === "journal" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="intake-label">Journal Name</label>
                        <input type="text" className="intake-input bg-manila" value={journal} onChange={(e) => setJournal(e.target.value)} />
                      </div>
                      <div>
                        <label className="intake-label">Volume</label>
                        <input type="text" className="intake-input bg-manila" value={volume} onChange={(e) => setVolume(e.target.value)} />
                      </div>
                      <div>
                        <label className="intake-label">Issue</label>
                        <input type="text" className="intake-input bg-manila" value={issue} onChange={(e) => setIssue(e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="intake-label">Pages</label>
                        <input type="text" className="intake-input bg-manila" value={pages} onChange={(e) => setPages(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {category === "book" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="intake-label">Book Title</label>
                        <input type="text" className="intake-input bg-manila" value={book} onChange={(e) => setBook(e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="intake-label">Editors (Comma-separated)</label>
                        <input type="text" className="intake-input bg-manila" value={editors} onChange={(e) => setEditors(e.target.value)} />
                      </div>
                      <div>
                        <label className="intake-label">Pages</label>
                        <input type="text" className="intake-input bg-manila" value={pages} onChange={(e) => setPages(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {category === "conference" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="intake-label">Conference Name</label>
                        <input type="text" className="intake-input bg-manila" value={event} onChange={(e) => setEvent(e.target.value)} />
                      </div>
                      <div>
                        <label className="intake-label">Date</label>
                        <input type="text" className="intake-input bg-manila" value={date} onChange={(e) => setDate(e.target.value)} />
                      </div>
                      <div>
                        <label className="intake-label">Venue</label>
                        <input type="text" className="intake-input bg-manila" value={venue} onChange={(e) => setVenue(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {category === "research" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="intake-label">Lead Researcher</label>
                        <input type="text" className="intake-input bg-manila" value={projectAuthor} onChange={(e) => setProjectAuthor(e.target.value)} />
                      </div>
                      <div>
                        <label className="intake-label">Status</label>
                        <select className="intake-input bg-manila" value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)}>
                          <option value="proposal">Proposed</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* ---------------------------------------------------- */}
                {/* FILE UPLOAD AND LINKS */}
                {/* ---------------------------------------------------- */}
                <div className="pt-4 border-t-2 border-ink space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="intake-label">DOI Link</label>
                      <input type="url" className="intake-input bg-manila" placeholder="https://doi.org/..." value={doi} onChange={(e) => setDoi(e.target.value)} />
                    </div>
                    <div>
                      <label className="intake-label">External URL</label>
                      <input type="url" className="intake-input bg-manila" placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className="intake-label">PDF Attachment</label>
                    <div className="mt-2 border-2 border-ink bg-manila p-6 hover:bg-manila-dim transition cursor-pointer relative">
                      <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                      <div className="text-center">
                        <FiUploadCloud className="mx-auto h-8 w-8 text-ink mb-2" />
                        <span className="font-mono text-sm font-bold uppercase text-ink underline">Click to Browse</span>
                        {pdfFile && (
                          <div className="mt-3 font-mono text-xs font-bold text-stamp bg-[#D34836]/10 py-1 px-2 border border-stamp inline-block">
                            <FiFileText className="inline mr-1" /> {pdfFile.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting || uploadingPdf}
                  className="w-full btn-typewriter btn-typewriter-primary disabled:opacity-50"
                >
                  {formSubmitting ? (uploadingPdf ? "UPLOADING..." : "WRITING TO LEDGER...") : "FILE RECORD"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: List & Management */}
          <div>
            <div className="index-card h-full p-8 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-ink pb-4 mb-6">
                <h2 className="text-xl font-serif font-black uppercase tracking-wide flex items-center gap-2">
                  <FiBookOpen className="text-stamp" /> Master Ledger
                </h2>
                <div className="flex bg-manila border-2 border-ink">
                  <span className="px-2 py-1 flex items-center border-r-2 border-ink"><FiSearch className="w-4 h-4" /></span>
                  <input
                    type="text"
                    placeholder="Search ID..."
                    className="bg-transparent font-mono text-sm px-2 outline-none w-32"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex-1">
                {listLoading ? (
                  <div className="flex py-20 items-center justify-center font-mono text-sm font-bold uppercase">
                    Reading Ledger...
                  </div>
                ) : filteredPublications.length === 0 ? (
                  <div className="text-center py-20 font-mono text-sm border-2 border-dashed border-ink bg-manila-dim">
                    NO RECORDS FOUND
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredPublications.map((pub) => (
                      <div key={pub.id} className="p-4 border-2 border-ink bg-manila-dim relative">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-0.5 border border-ink font-mono text-[10px] font-bold uppercase bg-manila text-ink">
                                TYPE: {pub.category}
                              </span>
                              {pub.pdf_url && (
                                <span className="text-stamp font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                                  <FiFileText /> ATTACHED
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-ink text-sm leading-snug uppercase">{pub.title}</h4>
                            <p className="font-mono text-xs text-ink-light mt-2">
                              {pub.authors.join(", ")} | YR: {pub.year}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeletePublication(pub.id, pub.pdf_url)}
                            className="p-2 border-2 border-ink hover:bg-stamp hover:text-manila hover:border-stamp transition-colors"
                            title="Expunge Record"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
