import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Layout } from "./components/layout/Layout";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Publication from "./pages/Publication";
import Contact from "./pages/Contacts";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="font-sans antialiased" style={{ background: "#0d0d0d", color: "#f5f0e8" }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid rgba(245, 158, 11, 0.35)",
          },
          success: {
            iconTheme: {
              primary: "#f59e0b",
              secondary: "#0f172a",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#0f172a",
            },
          },
        }}
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/publication" element={<Publication />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

