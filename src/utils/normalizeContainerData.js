/**
 * Universal utility to normalize container-wrapped data
 * This can be used by any component that receives data with container wrappers
 */

/**
 * Normalizes an object structure that may have container wrappers
 * @param {Object} obj - The object to normalize (e.g., slides, accordions, buttonsgroup)
 * @param {Object} options - Normalization options
 * @param {boolean} options.normalizeImage - Whether to normalize image to array format
 * @param {boolean} options.normalizeLink - Whether to normalize link to string format
 * @returns {Object} Normalized object with container data extracted
 */
export function normalizeContainerData(obj, options = {}) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return obj;
  }

  const { normalizeImage = false, normalizeLink = false } = options;

  // Helper to normalize image
  const normalizeImageValue = (img) => {
    if (!img) return [];
    if (img === "0" || img === 0) return [];
    if (typeof img === "string" && img !== "0") {
      // Remove leading slashes to prevent double slashes in URLs
      const cleanPath = img.startsWith("/") ? img : `/${img}`;
      return [{ path: cleanPath }];
    }
    if (Array.isArray(img)) {
      return img.map((i) => {
        if (typeof i === "string") {
          const cleanPath = i.startsWith("/") ? i : `/${i}`;
          return { path: cleanPath };
        }
        const path = i?.path || i?.publicUrl || i?.originalUrl || null;
        if (path && typeof path === "string") {
          const cleanPath = path.startsWith("/") ? path : `/${path}`;
          return { path: cleanPath };
        }
        return { path: null };
      });
    }
    if (typeof img === "object" && img.path) {
      const path = img.path || img.publicUrl || img.originalUrl || null;
      if (path && typeof path === "string") {
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return [{ path: cleanPath }];
      }
      return [{ path: null }];
    }
    return [];
  };

  // Helper to normalize link
  const normalizeLinkValue = (link) => {
    if (!link) return "";
    if (typeof link === "string") return link;
    if (typeof link === "number") return String(link);
    if (typeof link === "function") return "";
    if (typeof link === "object" && link.path) return link.path || "";
    if (typeof link === "object" && link.href) return link.href || "";
    return "";
  };

  const normalized = {};
  Object.keys(obj).forEach((key) => {
    const item = obj[key];
    if (!item || typeof item !== "object") {
      normalized[key] = item;
      return;
    }

    // If item has container, extract and merge container data
    if (item.container && typeof item.container === "object") {
      // Extract container and merge properties (remove container property)
      const { container, ...itemWithoutContainer } = item;
      const merged = {
        ...itemWithoutContainer,
        ...container,
      };

      // Apply property-specific normalizations if provided
      if (normalizeImage && merged.image !== undefined) {
        merged.image = normalizeImageValue(merged.image);
      }
      if (normalizeLink && merged.buttonlink !== undefined) {
        merged.buttonlink = normalizeLinkValue(merged.buttonlink);
      }
      if (normalizeLink && merged.link !== undefined) {
        merged.link = normalizeLinkValue(merged.link);
      }

      normalized[key] = merged;
    } else {
      // No container, just normalize specific properties if they exist
      const normalizedItem = { ...item };
      if (normalizeImage && normalizedItem.image !== undefined) {
        normalizedItem.image = normalizeImageValue(normalizedItem.image);
      }
      if (normalizeLink && normalizedItem.buttonlink !== undefined) {
        normalizedItem.buttonlink = normalizeLinkValue(normalizedItem.buttonlink);
      }
      if (normalizeLink && normalizedItem.link !== undefined) {
        normalizedItem.link = normalizeLinkValue(normalizedItem.link);
      }
      normalized[key] = normalizedItem;
    }
  });

  return normalized;
}

/**
 * Checks if an object structure has container wrappers
 * @param {Object} obj - The object to check
 * @returns {boolean} True if any item has a container property
 */
export function hasContainerWrappers(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return false;
  }
  return Object.values(obj).some(
    (item) => item?.container && typeof item.container === "object"
  );
}

