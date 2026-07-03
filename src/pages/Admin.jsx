import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import { FiLogOut, FiPlus, FiTrash2, FiUploadCloud, FiBookOpen, FiFileText, FiAward } from "react-icons/fi";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";

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
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        fetchPublications();
      }
    });

    // Listen for auth state changes
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
      // 1. Upload PDF if selected
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

      // 2. Parse authors and editors into arrays
      const authorList = authors.split(",").map(a => a.trim()).filter(Boolean);
      const editorList = editors ? editors.split(",").map(e => e.trim()).filter(Boolean) : [];

      // 3. Prepare entry payload
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

      // Category specific values
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

      // 4. Save to Database
      const { error: insertError } = await supabase
        .from("publications")
        .insert(payload);

      if (insertError) throw insertError;

      toast.success("Publication added successfully.");
      
      // Reset form
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
      
      // Refresh list
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
    if (!window.confirm("Are you sure you want to delete this publication?")) return;

    try {
      // If it has an uploaded PDF, we can optionally delete it from Storage
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
      toast.success("Publication deleted.");
      fetchPublications();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete publication.");
    }
  };

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-20 relative">
        {/* Glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <Card variant="glass" className="w-full max-w-md relative z-10">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary mb-4">
              <FiAward className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
            <p className="text-sm text-slate-400 mt-1">
              Sign in to manage your portfolio publications
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition duration-300"
                  placeholder="admin@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition duration-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full mt-4 flex justify-center py-3 px-4 rounded-xl border border-primary bg-primary text-dark font-semibold hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60"
              >
                {authLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-6 mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-100">Portfolio Dashboard</h1>
            <p className="text-sm text-slate-400 mt-1">Logged in as {user.email}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            leftIcon={<FiLogOut />}
            className="border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white"
          >
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10">
          {/* Left Column: Form */}
          <div>
            <Card variant="default" className="sticky top-28 bg-slate-900/40 border border-slate-800/80">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
                  <FiPlus className="text-primary" /> Add New Publication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddPublication} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Category</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-primary transition duration-300"
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
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Promotion Period</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-primary transition duration-300"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                      >
                        <option value="after">After Last Promotion</option>
                        <option value="before">Before Last Promotion</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Publication Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                      placeholder="Enter the title of the document"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Authors (Comma-separated)</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                        placeholder="e.g. Fehintola V. A., Popoola O."
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Year</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* CATEGORY SPECIFIC FIELDS */}
                  {/* ---------------------------------------------------- */}
                  {category === "journal" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-l-2 border-primary/50 pl-4 py-2 space-y-2 sm:space-y-0">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Journal Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="Counselling and Behavioral Studies Journal"
                          value={journal}
                          onChange={(e) => setJournal(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Volume</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="e.g. 10"
                          value={volume}
                          onChange={(e) => setVolume(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Issue</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="e.g. 2"
                          value={issue}
                          onChange={(e) => setIssue(e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Pages</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="e.g. 357-369"
                          value={pages}
                          onChange={(e) => setPages(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {category === "book" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-l-2 border-primary/50 pl-4 py-2 space-y-2 sm:space-y-0">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Book Title</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="A Festschrift in Honour of Professor Usman..."
                          value={book}
                          onChange={(e) => setBook(e.target.value)}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Editors (Comma-separated)</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="e.g. Ayantayo J. K., Sanusi R. A."
                          value={editors}
                          onChange={(e) => setEditors(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Pages</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="e.g. 97-105"
                          value={pages}
                          onChange={(e) => setPages(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {category === "conference" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-l-2 border-primary/50 pl-4 py-2 space-y-2 sm:space-y-0">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Conference / Event Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="Annual Conference of Counselling Association of Nigeria"
                          value={event}
                          onChange={(e) => setEvent(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Date Description</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="e.g. March 8-10, 2022"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Venue</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="1000 Capacity Hall, Polytechnic Ibadan"
                          value={venue}
                          onChange={(e) => setVenue(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {category === "research" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-l-2 border-primary/50 pl-4 py-2 space-y-2 sm:space-y-0">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Lead Researcher</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-primary transition duration-300"
                          value={projectAuthor}
                          onChange={(e) => setProjectAuthor(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Project Status</label>
                        <select
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-primary transition duration-300"
                          value={projectStatus}
                          onChange={(e) => setProjectStatus(e.target.value)}
                        >
                          <option value="proposal">Proposed Research</option>
                          <option value="ongoing">Ongoing Research</option>
                          <option value="completed">Completed Research</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* FILE UPLOAD AND LINKS */}
                  {/* ---------------------------------------------------- */}
                  <div className="border-t border-slate-800/80 pt-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">DOI Link (Optional)</label>
                        <input
                          type="url"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="https://doi.org/10.xxxx/..."
                          value={doi}
                          onChange={(e) => setDoi(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Google Scholar / URL (Optional)</label>
                        <input
                          type="url"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300"
                          placeholder="https://scholar.google.com/..."
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Upload Publication PDF Document</label>
                      <div className="mt-2 flex justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950 px-6 py-8 hover:border-primary/50 transition-colors duration-300">
                        <div className="text-center">
                          <FiUploadCloud className="mx-auto h-12 w-12 text-slate-500 mb-3" />
                          <div className="flex text-sm text-slate-400 justify-center">
                            <label className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary-light focus-within:outline-none">
                              <span>Select a PDF file</span>
                              <input
                                type="file"
                                accept=".pdf"
                                className="sr-only"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">PDF up to 20MB</p>
                          {pdfFile && (
                            <div className="mt-4 p-2 bg-primary/10 border border-primary/20 rounded-xl inline-flex items-center gap-2 text-xs font-semibold text-primary">
                              <FiFileText /> {pdfFile.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting || uploadingPdf}
                    className="w-full py-4 px-6 rounded-xl border border-primary bg-primary text-dark font-semibold hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formSubmitting ? (uploadingPdf ? "Uploading Document..." : "Saving Publication...") : "Add to Research Portfolio"}
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: List & Management */}
          <div>
            <Card variant="glass" className="h-full bg-slate-900/20 border border-slate-800/50">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-xl font-serif text-slate-100 flex items-center gap-2">
                  <FiBookOpen className="text-primary" /> Active Portfolio ({publications.length})
                </CardTitle>
                <input
                  type="text"
                  placeholder="Search publications..."
                  className="px-3 py-1.5 text-sm rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-primary transition duration-300 w-full sm:w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </CardHeader>
              <CardContent className="mt-4">
                {listLoading ? (
                  <div className="flex py-20 items-center justify-center text-slate-500 text-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
                    Fetching database...
                  </div>
                ) : filteredPublications.length === 0 ? (
                  <div className="text-center py-20 text-slate-500 text-sm border border-dashed border-slate-800/80 rounded-2xl">
                    No publications found in Supabase.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredPublications.map((pub) => (
                      <div
                        key={pub.id}
                        className="p-4 rounded-xl border border-slate-800/60 bg-slate-950/40 hover:border-slate-800 transition duration-300 flex justify-between items-start gap-4"
                      >
                        <div className="space-y-1">
                          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300">
                            {pub.category === "research" ? "project" : pub.category}
                          </span>
                          <span className="ml-2 inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-primary">
                            {pub.period === "after" ? "After Last Promotion" : "Before Last Promotion"}
                          </span>
                          <h4 className="font-medium text-slate-100 text-sm leading-snug">{pub.title}</h4>
                          <p className="text-xs text-slate-400">
                            {pub.authors.join(", ")} ({pub.year})
                          </p>
                          {pub.pdf_url && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-green-400 font-semibold mt-1">
                              ✓ PDF File Attached
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeletePublication(pub.id, pub.pdf_url)}
                          className="p-2 rounded-lg bg-red-950/20 text-red-400 hover:bg-red-950 hover:text-red-200 border border-red-900/30 transition-all"
                          title="Delete from Database"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
