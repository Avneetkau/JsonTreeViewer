import React from "react";

export default function Toolbar({
  onVisualize,
  onClear,
  onSample,
  onDownload,
  theme,
  onSearch,
  searchVal,
  setSearchVal,
}) {
  return (
    <div
      className={`flex flex-wrap gap-2 px-6 py-2 border-b-2 border-gray-400 items-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-gray-50 border-gray-300 text-gray-900"
      }`}
    >
      {["Visualize", "Clear", "Sample", "Download"].map((label, i) => {
        const actions = [onVisualize, onClear, onSample, onDownload];
        return (
          <button
            key={i}
            onClick={actions[i]}
            className={`px-3 py-1 border rounded transition-colors duration-200
              ${
                theme === "dark"
                  ? "border-gray-600 text-gray-100 hover:border-yellow-400 hover:text-yellow-400 hover:bg-gray-800"
                  : "hover:bg-gray-200"
              }`}
          >
            {label}
          </button>
        );
      })}

      <div className="ml-auto flex items-center gap-2">
        <input
          type="text"
          placeholder="Search key path..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className={`border rounded px-2 py-1 text-sm bg-transparent transition-colors duration-200
            ${
              theme === "dark"
                ? "border-gray-600 text-gray-100 focus:border-yellow-400 focus:text-yellow-400 hover:border-yellow-400 hover:text-yellow-400"
                : "border-gray-300 text-gray-900 focus:border-gray-500"
            }`}
        />
        <button
          onClick={() => onSearch(searchVal)}
          className={`px-3 py-1 border rounded transition-colors duration-200
            ${
              theme === "dark"
                ? "border-gray-600 text-gray-100 hover:border-yellow-400 hover:text-yellow-400 hover:bg-gray-800"
                : "hover:bg-gray-200"
            }`}
        >
          Search
        </button>
      </div>
    </div>
  );
}
