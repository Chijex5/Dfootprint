import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home, Box, ChartSpline, ClipboardList, Settings, Menu, X } from "lucide-react";

const Sidebar = ({ onCurrent }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Enable mobile behavior
      } else {
        setIsMobile(false); // Revert to desktop behavior
        setIsMenuOpen(false); // Ensure menu is closed on desktop
      }
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile); // Cleanup
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu for Mobile */}
      {isMobile && (
        <button
          onClick={toggleMenu}
          className={`fixed top-4 z-50 p-2 rounded-md transition-all duration-500 ease-in-out 
            ${isMenuOpen ? "left-[190px] opacity-100 scale-100" : "left-4 opacity-80 scale-95"}
            bg-accent dark:bg-darkAccent text-white`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      
      )}

      {/* Sidebar */}
      <div
        className={`w-64 h-screen bg-background dark:bg-darkSecondary shadow-lg flex flex-col shadow-lg transform transition-transform ${isMobile ? "fixed": ""} duration-300 ease-in-out ${
          isMobile
            ? isMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-primary dark:border-darkAccent">
          <h1 className="text-xl font-bold text-primary dark:text-darkPrimary">Admin Board</h1>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className={`flex items-center gap-4 w-full px-4 py-2 rounded-lg bg-transparent hover:bg-accent dark:hover:bg-darkAccent text-primary dark:text-darkPrimary hover:text-white ${
              onCurrent === "dashboard" ? "bg-accent dark:bg-darkAccent text-white" : ""
            }`}
          >
            <Home />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => router.push("/admin/products")}
            className={`flex items-center gap-4 w-full px-4 py-2 rounded-lg bg-transparent hover:bg-accent dark:hover:bg-darkAccent text-primary dark:text-darkPrimary hover:text-white ${
              onCurrent === "products" ? "bg-accent dark:bg-darkAccent text-white" : ""
            }`}
          >
            <Box />
            <span>Manage Products</span>
          </button>
          <button
            onClick={() => router.push("/admin/orders")}
            className={`flex items-center gap-4 w-full px-4 py-2 rounded-lg bg-transparent hover:bg-accent dark:hover:bg-darkAccent text-primary dark:text-darkPrimary hover:text-white ${
              onCurrent === "orders" ? "bg-accent dark:bg-darkAccent text-white" : ""
            }`}
          >
            <ClipboardList />
            <span>View Orders</span>
          </button>
          <button
            onClick={() => router.push("/admin/stats")}
            className={`flex items-center gap-4 w-full px-4 py-2 rounded-lg bg-transparent hover:bg-accent dark:hover:bg-darkAccent text-primary dark:text-darkPrimary hover:text-white ${
              onCurrent === "statistics" ? "bg-accent dark:bg-darkAccent text-white" : ""
            }`}
          >
            <ChartSpline />
            <span>Statistics</span>
          </button>
          <button
            onClick={() => router.push("/admin/settings")}
            className={`flex items-center gap-4 w-full px-4 py-2 rounded-lg bg-transparent hover:bg-accent dark:hover:bg-darkAccent text-primary dark:text-darkPrimary hover:text-white ${
              onCurrent === "settings" ? "bg-accent dark:bg-darkAccent text-white" : ""
            }`}
          >
            <Settings />
            <span>Settings</span>
          </button>
        </nav>
        <footer className="p-4 border-t border-primary dark:border-darkAccent">
          <p className="text-sm text-secondary dark:text-darkAccent">© 2025 D&apos;Footprint</p>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
