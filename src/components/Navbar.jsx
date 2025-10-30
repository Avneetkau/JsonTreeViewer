import React from "react";

export default function Navbar({ theme, setTheme }) {
  return (
    <nav
      className={`flex items-center justify-between px-6 py-3 border-b transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-gray-50 border-gray-300 text-gray-900"
      }`}
    >
      <h1
        className={`text-xl font-bold ${
          theme === "dark" ? "text-yellow-500" : "text-black"
        }`}
      >
        JSON Tree Viewer
      </h1>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors duration-200
          ${
            theme === "dark"
              ? "border-gray-600 text-gray-100 hover:border-yellow-400 hover:text-yellow-400 hover:bg-gray-800"
              : "border-gray-300 text-gray-900 hover:bg-gray-100"
          }`}
      >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}
