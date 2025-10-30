import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Toolbar from "./components/Toolbar";
import Editor from "./components/Editor";
import Graph from "./components/Graph/Graph";
import { parsePath } from "./components/utils/pathParser";
import { buildGraphFromJson } from "./components/utils/buildGraphFromJson";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [jsonText, setJsonText] = useState("");
  const [nodesEdges, setNodesEdges] = useState({ nodes: [], edges: [] });
  const [searchVal, setSearchVal] = useState("");
  const graphRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleVisualize = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const graphData = buildGraphFromJson(parsed);
      setNodesEdges(graphData);
    } catch (e) {
      alert("Invalid JSON: " + e.message);
    }
  };

  // ✅ Updated: Clear JSON and the graph as well
  const handleClear = () => {
    setJsonText("");
    setNodesEdges({ nodes: [], edges: [] }); // clears the tree visualization
  };

  const handleSample = () => {
    fetch("/src/assets/sample.json")
      .then((r) => r.json())
      .then((j) => setJsonText(JSON.stringify(j, null, 2)))
      .catch(() => alert("Sample file not found."));
  };

  const handleSearch = (q) => {
    if (!q.trim()) return alert("Please enter a search value");
    let path = q.trim();
    if (!path.startsWith("$")) path = "$." + path;
    const tokens = parsePath(path);
    let canonical = "$";
    tokens.forEach((t) => (canonical += /^\d+$/.test(t) ? `[${t}]` : `.${t}`));
    graphRef.current?.searchAndCenter(canonical);
  };

  const handleDownload = () => graphRef.current?.exportPNG();

  return (
    <div
      data-theme={theme}
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Navbar theme={theme} setTheme={setTheme} />

      <Toolbar
        onVisualize={handleVisualize}
        onClear={handleClear} 
        onSample={handleSample}
        onDownload={handleDownload}
        theme={theme}
        onSearch={handleSearch}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
      />

      <div className="flex flex-col md:flex-row h-[calc(100vh-120px)]">
        <Editor jsonText={jsonText} setJsonText={setJsonText} />
        <Graph
          ref={graphRef}
          nodesEdges={nodesEdges}
          setNodesEdges={setNodesEdges}
          theme={theme}
        />
      </div>
    </div>
  );
}
