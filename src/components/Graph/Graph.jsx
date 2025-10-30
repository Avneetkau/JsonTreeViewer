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

    exportPNG: async () => {
      const { toPng } = await import("html-to-image");
      const graphEl = document.querySelector(".react-flow");

      if (!graphEl) {
        alert("Graph not found to export!");
        return;
      }

      try {
       
        graphEl.querySelectorAll("path.react-flow__edge-path").forEach((path) => {
          path.setAttribute("stroke", "#000");
          path.setAttribute("stroke-width", "1.5");
        });

        const dataUrl = await toPng(graphEl, {
          cacheBust: true,
          backgroundColor: "#ffffff", 
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
          filter: (node) => {
           
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


  const handleNodeClick = (_, node) => {
    navigator.clipboard.writeText(node.id);
   
    const toast = document.createElement("div");
    toast.innerText = "Address copied!";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background =
      theme === "dark" ? "#facc15" : "#333";
    toast.style.color = theme === "dark" ? "#000" : "#fff";
    toast.style.padding = "8px 16px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "9999";
    toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1500);
  };

  return (
    <div
      className={`relative w-full md:w-2/3 h-full ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleNodeClick}>
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
