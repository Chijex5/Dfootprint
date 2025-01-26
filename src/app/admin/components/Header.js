import React, {useEffect, useState} from "react";
import DarkModeToggle from "@/app/components/DarkMode";
const Header = ({onName}) => {
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Enable mobile behavior
      } else {
        setIsMobile(false);
      }
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
    return(
        <header className={`bg-white dark:bg-darkBackground border-b border-primary dark:border-darkAccent shadow p-6 flex ${isMobile ? "justify-center" : "justify-between"} items-center`}>
          <div className="w-64 flex items-center justify-center">
            <h1 className="text-xl font-bold text-primary dark:text-white">{onName}</h1>
          </div>
          <div className={`text-secondary ${isMobile ? "w-44" : "w-64"}  flex items-center justify-between`}>
            <div className="text-secondary">{!isMobile ? "Logged in as:" : ""}</div>
            <div className="text-primary dark:text-darkPrimary"><DarkModeToggle visible={true}/></div>
          </div>
        </header>
    );
}
export default Header;