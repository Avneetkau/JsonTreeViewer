export const parsePath = (path) => {
  if (!path.startsWith("$")) throw new Error("Path must start with $");
  const tokens = path
    .replace(/\["(.+?)"\]/g, ".$1")
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .slice(1);
  return tokens.filter(Boolean);
};
