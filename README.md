# 🌳 JSON Tree Visualizer

An **interactive JSON Tree Visualizer** web application built with **React** and **React Flow**, allowing users to visualize, explore, and search JSON data in a dynamic, hierarchical tree structure.

---

## 🎯 Objective

The goal of this project is to create a web-based tool that helps users **visualize JSON data** as an interactive tree.  
It enables users to input or paste any JSON, validate it, and visualize it as connected nodes with color-coded types.

---

## 🚀 Live Demo

🔗 **[View Demo](https://your-deployed-link.vercel.app/)**  
*(Replace with your actual deployed link from GitHub Pages / Netlify / Vercel)*

---

## 🧩 Features

### ✅ **Mandatory Features**
- **JSON Input & Validation**
  - Text area to paste or type JSON.
  - Validate JSON input and show error message for invalid JSON.
  - “Visualize” button to generate the tree.
  - Sample JSON placeholder for testing.

- **Tree Visualization (React Flow)**
  - Visualizes JSON as a hierarchical **node tree**.
  - Uses **React Flow** to render connected nodes.
  - Supports:
    - **Object nodes** – show object keys.
    - **Array nodes** – show array indices.
    - **Primitive nodes** – show key-value pairs (string, number, boolean, null).
  - **Color-coded nodes**:
    - Objects → 🟦 Blue / Purple
    - Arrays → 🟩 Green
    - Primitives → 🟧 Orange / Yellow

- **Search Functionality**
  - Search JSON nodes by **JSON path** (e.g. `$.user.address.city` or `items[0].name`).
  - Highlight the matching node with a distinct color.
  - Pan view to center the matched node.
  - Display “Match found” or “No match found” message.

---

### ⚙️ **Optional (Implemented)**
- 🌗 **Dark/Light Mode Toggle**
- 🔍 **Zoom Controls** (Zoom In / Zoom Out / Fit View)
- 🖱️ **Pan Support** — drag canvas to navigate.
- 🧾 **Node Hover Info** (path & value tooltip)
- 🧹 **Clear/Reset Button** — reset JSON and visualization.
- 📋 **Copy JSON Path** on node click.
- 🖼️ **Download Tree as Image (PNG)** using **html-to-image** / **html-to-png**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React (Vite)** | Core UI framework |
| **React Flow** | For rendering and managing interactive tree visualization |
| **Dagre** | Used for hierarchical layout (automatic positioning of nodes) |
| **html-to-image / html-to-png** | To export the visualization as an image |
| **Tailwind CSS** | For fast and responsive styling |
| **Lucide-React (optional)** | For icons like search, theme toggle, zoom, etc. |

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "reactflow": "^11.x",
    "dagre": "^0.8.5",
    "html-to-image": "^1.11.11",
    "lucide-react": "^0.306.0",
    "tailwindcss": "^3.4.0"
  }
}
