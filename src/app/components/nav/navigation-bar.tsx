import "./navigation-bar.css";
import { useLocation } from "react-router-dom";
import Searchbar from "../searchbar";

export default function NavigationBar() {
  const location = useLocation();

  return (
    <nav className={`navigation`}>
      <a href="/#">Home</a>
      <a href="/Projects">Projects</a>
      {/* <div className="w-150 ml-auto">
        <Searchbar />
      </div> */}
    </nav>
  );
}
