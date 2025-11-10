import "./navigation-bar.css";
import { forwardRef, useImperativeHandle, useState } from "react";

interface NavigationBarProps {
  visible: boolean;
}

export interface NavigationBarHandle {
  onHandleVisible: (visible: boolean) => void;
}

const NavigationBar = forwardRef<NavigationBarHandle, NavigationBarProps>(
  ({ visible }, ref) => {
    useImperativeHandle(ref, () => ({
      onHandleVisible(visible: boolean) {
        setVisibillity(visible);
      },
    }));

    const [visibillity, setVisibillity] = useState(visible);

    return (
      <nav className={visibillity ? "visible" : ""}>
        <a href="/#">Home</a>
        <a href="/Projects">Projects</a>
        {/* <div className="w-150 ml-auto">
        <Searchbar />
      </div> */}
      </nav>
    );
  }
);

export default NavigationBar;
