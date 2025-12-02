/**
 * Universal helper to construct image URLs correctly
 * Prevents double slashes and handles different path formats
 */

/**
 * Constructs a proper image URL from API URL and image path
 * @param {string} imagePath - The image path from API (e.g., "/fileadmin/...")
 * @param {string} apiUrl - The base API URL (from NEXT_PUBLIC_API_URL)
 * @param {string} mediaPath - Optional media path (from NEXT_PUBLIC_TYPO3_MEDIA)
 * @returns {string} Complete image URL
 */
export function getImageUrl(imagePath, apiUrl, mediaPath) {
  if (!imagePath) return null;
  
  // Convert to string and check if it's a valid path
  const path = String(imagePath).trim();
  
  // If path is just a number or invalid (like "0", "1", etc.), return null
  if (!path || path === "0" || path === "1" || /^[0-9]+$/.test(path)) {
    return null;
  }
  
  // If path is already a full URL, return it
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  const baseUrl = (apiUrl || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
  
  // If path already starts with /fileadmin, use it directly without adding mediaPath
  // Otherwise, prepend with mediaPath if it exists
  let fullPath = path.startsWith("/") ? path : `/${path}`;
  
  // Only add mediaPath if path doesn't already start with /fileadmin
  if (!path.startsWith("/fileadmin") && mediaPath) {
    const cleanMediaPath = (mediaPath || process.env.NEXT_PUBLIC_TYPO3_MEDIA || "").replace(/^\/+/, "").replace(/\/+$/, "");
    if (cleanMediaPath) {
      fullPath = `/${cleanMediaPath}${fullPath}`;
    }
  }
  
  // Remove any double slashes (but keep http:// or https://)
  fullPath = fullPath.replace(/([^:]\/)\/+/g, "$1");
  
  return `${baseUrl}${fullPath}`;
}

/**
 * Gets image URL from image array (handles both old and new API formats)
 * @param {Array|Object|string} image - Image data (array, object, or string)
 * @param {number} index - Index of image in array (default: 0)
 * @returns {string|null} Complete image URL or null
 */
export function getImageUrlFromData(image, index = 0) {
  if (!image) return null;
  
  // If image is "0" or 0, it means no image
  if (image === "0" || image === 0) return null;
  
  let imagePath = null;
  
  // Handle array format: [{path: "/fileadmin/..."}]
  if (Array.isArray(image) && image.length > index) {
    const img = image[index];
    // Skip if image is "0" or 0
    if (img === "0" || img === 0) return null;
    
    if (typeof img === "string") {
      // Skip empty strings or "0"
      if (!img || img.trim() === "" || img === "0") return null;
      imagePath = img;
    } else if (typeof img === "object" && img !== null) {
      imagePath = img.path || img.publicUrl || img.originalUrl || img.url || null;
    }
  }
  // Handle object format: {path: "/fileadmin/..."} or container format
  else if (typeof image === "object" && image !== null) {
    // Check if it has container wrapper
    if (image.container && typeof image.container === "object") {
      const container = image.container;
      imagePath = container.path || container.publicUrl || container.originalUrl || container.url || null;
    } else {
      imagePath = image.path || image.publicUrl || image.originalUrl || image.url || null;
    }
  }
  // Handle string format: "/fileadmin/..."
  else if (typeof image === "string") {
    // Skip empty strings or "0"
    if (!image || image.trim() === "" || image === "0") return null;
    imagePath = image;
  }
  
  // Validate imagePath before processing
  if (!imagePath || imagePath === "0" || imagePath === 0 || imagePath.trim() === "") {
    return null;
  }
  
  // Filter out loader/placeholder images
  const pathLower = imagePath.toLowerCase();
  if (
    pathLower.includes("loader.gif") ||
    pathLower.includes("loader.png") ||
    pathLower.includes("placeholder") ||
    pathLower.includes("/typo3conf/ext/ns_license/")
  ) {
    return null;
  }
  
  const url = getImageUrl(imagePath);
  
  // Final validation: return null if URL is invalid or placeholder
  if (!url || url === "/placeholder.png" || url.trim() === "" || url.toLowerCase().includes("loader.gif") || url.toLowerCase().includes("loader.png")) {
    return null;
  }
  
  return url;
}

