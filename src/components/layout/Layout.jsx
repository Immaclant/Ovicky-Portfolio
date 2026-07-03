import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

const tickerItems = [
  "Researcher", "Academic", "Author", "Educator",
  "Innovator", "Scholar", "Thought Leader", "Mentor",
  "Researcher", "Academic", "Author", "Educator",
  "Innovator", "Scholar", "Thought Leader", "Mentor",
];

function Ticker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {tickerItems.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Header />
      <main className="flex-1 pt-16">
        <Ticker />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}