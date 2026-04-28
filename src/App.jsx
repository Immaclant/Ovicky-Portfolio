import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";

import Publication from "./pages/Publication";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contacts";
function App() {
  return (
    <div className="font-roboto">
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/About" element={<About />} />
        <Route path="/Publication" element={<Publication />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
