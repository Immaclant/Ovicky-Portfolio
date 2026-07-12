import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Ledger Line Decorator */}
      <div className="absolute left-4 lg:left-12 top-0 bottom-0 w-0 border-l-2 border-ledger opacity-50 pointer-events-none z-[-1]" />
      <div className="absolute left-5 lg:left-14 top-0 bottom-0 w-0 border-l border-ledger opacity-30 pointer-events-none z-[-1]" />

      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}