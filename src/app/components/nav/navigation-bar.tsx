import "./navigation-bar.css";
import { useLocation } from "react-router-dom";
import Searchbar from "../searchbar";

export default function NavigationBar() {
  const location = useLocation();

  const isAboutPage = location.pathname.toLowerCase() === "/about";
  return (
    <nav className={`navigation ${isAboutPage ? "about-page" : ""}`}>
      <a href="/#">Home</a>
      <a href="/Projects">Projects</a>
      <a href="/About">About</a>
      <div className="w-150 ml-auto">
        <Searchbar />
      </div>
    </nav>
  );
}
