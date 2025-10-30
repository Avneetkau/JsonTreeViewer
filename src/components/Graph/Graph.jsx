import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import ReactFlow, {
  useReactFlow,
  Controls,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

const GraphContent = forwardRef(({ nodesEdges, theme }, ref) => {
  const { nodes, edges } = nodesEdges;
  const { zoomIn, zoomOut, fitView, setCenter, getNodes, setNodes } =
    useReactFlow();
  const [highlightedId, setHighlightedId] = useState(null);

  useImperativeHandle(ref, () => ({
    searchAndCenter: (path) => {
      let normalizedPath = path.trim();
      if (!normalizedPath.startsWith("$")) normalizedPath = "$." + normalizedPath;
      normalizedPath = normalizedPath.replace(/\[(\d+)\]/g, ".$1");

      let targetNode = nodes.find((n) => n.id === normalizedPath);
      if (!targetNode) {
        targetNode = nodes.find((n) => n.id === `${normalizedPath}._value`);
      }

      if (targetNode) {
        setHighlightedId(targetNode.id);
        fitView({ nodes: [targetNode], padding: 0.3, duration: 500 });
      } else {
        alert("No node found for path: " + path);
      }
    },

    // ✅ Updated Download to PNG (white background + visible edges)
    exportPNG: async () => {
      const { toPng } = await import("html-to-image");
      const graphEl = document.querySelector(".react-flow");

      if (!graphEl) {
        alert("Graph not found to export!");
        return;
      }

      try {
        // ✅ Ensure edges are visible before exporting
        graphEl.querySelectorAll("path.react-flow__edge-path").forEach((path) => {
          path.setAttribute("stroke", "#000");
          path.setAttribute("stroke-width", "1.5");
        });

        const dataUrl = await toPng(graphEl, {
          cacheBust: true,
          backgroundColor: "#ffffff", // ✅ Always export with white background
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
          filter: (node) => {
            // ✅ Hide zoom controls from image
            if (node.classList?.contains("react-flow__controls")) return false;
            return true;
          },
          canvasWidth: graphEl.scrollWidth,
          canvasHeight: graphEl.scrollHeight,
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "json-graph.png";
        link.click();
      } catch (err) {
        console.error("Export failed:", err);
        alert("Failed to export PNG.");
      }
    },
  }));

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === highlightedId) {
          return {
            ...n,
            style:
              theme === "dark"
                ? {
                    border: "2px solid #facc15",
                    color: "#facc15",
                    fontWeight: "bold",
                    background: "#1f2937",
                  }
                : {
                    border: "2px solid #000",
                    color: "#000",
                    fontWeight: "bold",
                    background: "#fefce8",
                  },
          };
        } else {
          return {
            ...n,
            style: {
              border: "1px solid #ccc",
              color: theme === "dark" ? "#e5e7eb" : "#111827",
              background: theme === "dark" ? "#374151" : "#f9fafb",
            },
          };
        }
      })
    );
  }, [highlightedId, setNodes, theme]);

  useEffect(() => {
    if (nodes.length > 0) {
      const timeout = setTimeout(() => fitView({ padding: 0.2 }), 150);
      return () => clearTimeout(timeout);
    }
  }, [nodes, edges, fitView]);

  return (
    <div
      className={`relative w-full md:w-2/3 h-full ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls showInteractive={false} />
      </ReactFlow>

      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
        {["+", "−", "Fit"].map((label, i) => (
          <button
            key={i}
            onClick={
              label === "+"
                ? zoomIn
                : label === "−"
                ? zoomOut
                : () => fitView()
            }
            className={`px-2 py-1 rounded text-sm font-medium transition-all border
              ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-100 border-transparent hover:border-yellow-500 hover:text-yellow-400 hover:bg-gray-800"
                  : "bg-gray-200 text-gray-900 border-transparent hover:bg-gray-300"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
});

const Graph = forwardRef(({ nodesEdges, theme }, ref) => (
  <ReactFlowProvider>
    <GraphContent ref={ref} nodesEdges={nodesEdges} theme={theme} />
  </ReactFlowProvider>
));

export default Graph;
