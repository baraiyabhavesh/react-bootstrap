// Utility function to ensure link is always a string
// This can be imported and used anywhere in the codebase
export function normalizeLink(link) {
  if (!link) return "";
  if (typeof link === "string") return link;
  if (typeof link === "number") return String(link);
  if (typeof link === "function") return ""; // Functions should not be links
  if (typeof link === "object" && link.path) return link.path || "";
  if (typeof link === "object" && link.href) return link.href || "";
  return "";
}

// Helper to normalize navigation menu items recursively
export function normalizeMenuItem(item) {
  if (!item || typeof item !== "object") return item;
  
  const normalized = { ...item };
  
  // Normalize link property
  if (normalized.link !== undefined) {
    normalized.link = normalizeLink(normalized.link);
  }
  
  // Recursively normalize children
  if (normalized.children && Array.isArray(normalized.children)) {
    normalized.children = normalized.children.map(normalizeMenuItem);
  }
  
  return normalized;
}

// Normalize an array of menu items
export function normalizeMenuItems(items) {
  if (!items || !Array.isArray(items)) return items || [];
  return items.map(normalizeMenuItem);
}



