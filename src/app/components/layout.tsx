
import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Layout() {
  return (
    
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-6 py-8">
        <Outlet /> {/* This is where pages render */}
      </main>
    </div>
  );
}
