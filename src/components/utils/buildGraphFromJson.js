import dagre from "dagre";

// Helper to build the graph data with readable path-based node IDs
export const buildGraphFromJson = (data) => {
  const nodes = [];
  const edges = [];

  // Recursive traversal function
  const traverse = (obj, parentPath = "$", parentId = null, key = "root") => {
    const currentPath = parentId === null ? "$" : `${parentPath}.${key}`;
    const id = currentPath;

    // Add node for current key
    nodes.push({
      id,
      data: { label: key },
      position: { x: 0, y: 0 }, // Dagre will update later
    });

    // Link to parent
    if (parentId !== null) {
      edges.push({
        id: `${parentId}-${id}`,
        source: parentId,
        target: id,
      });
    }

    // If it's an object or array, recurse
    if (typeof obj === "object" && obj !== null) {
      Object.entries(obj).forEach(([k, v]) => traverse(v, currentPath, id, k));
    } else {
      // Add value node
      const valId = `${currentPath}._value`;
      nodes.push({
        id: valId,
        data: { label: String(obj) },
        position: { x: 0, y: 0 },
      });
      edges.push({ id: `${id}-${valId}`, source: id, target: valId });
    }
  };

  // Start traversal
  traverse(data);

  // === DAGRE Layout ===
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 160;
  const nodeHeight = 50;

  dagreGraph.setGraph({ rankdir: "TB" }); // top-to-bottom layout

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  // Update node positions from Dagre output
  nodes.forEach((node) => {
    const pos = dagreGraph.node(node.id);
    node.position = {
      x: pos.x - nodeWidth / 2,
      y: pos.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};
