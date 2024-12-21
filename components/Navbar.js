import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light"; // Save theme preference to localStorage
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark"; // Save theme preference to localStorage
    }
  };

  // Set initial dark mode based on user preference
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  return (
    <nav
      className={`${
        darkMode ? "bg-darkBackground text-darkText" : "bg-primary text-white"
      } py-4 shadow-lg`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-heading">
          Pass-By-Delivery
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-accent">
              About
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-accent">
              Contact
            </Link>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="text-xl focus:outline-none"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}