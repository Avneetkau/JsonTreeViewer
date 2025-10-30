import React from "react";

export default function Editor({ jsonText, setJsonText }) {
  return (
    <div className="w-full md:w-1/3 border-r-2 border-gray-400 dark:border-gray-700 h-full">
      <textarea
        className="w-full h-full p-4 font-mono text-sm bg-transparent outline-none resize-none"
        placeholder="Paste your JSON here..."
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />
    </div>
  );
}

