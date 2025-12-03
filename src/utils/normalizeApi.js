/* ================================
       NORMALIZE HELPERS
==================================*/

const ensureArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const safeObject = (v) => (v && typeof v === "object" ? v : {});

/* ================================
       GALLERY NORMALIZER
==================================*/

function normalizeGallery(gallery, positionData = null) {
  if (!gallery) {
    return {
      position: positionData || { horizontal: "center", vertical: "above", noWrap: false },
      count: { files: 0, columns: 0, rows: 0 },
      rows: {},
    };
  }

  if (gallery.rows) {
    // If gallery already has rows, preserve its position or use provided positionData
    return {
      ...gallery,
      position: gallery.position || positionData || { horizontal: "center", vertical: "above", noWrap: false },
    };
  }

  if (Array.isArray(gallery)) {
    const rows = { "1": { columns: {} } };
    gallery.forEach((g, i) => {
      rows["1"].columns[i + 1] = {
        publicUrl: g.publicUrl || g.properties?.publicUrl || g.path || null,
        path: g.path || g.properties?.originalUrl || g.publicUrl || null,
        filename: g.properties?.filename || g.filename || null,
        mimeType: g.properties?.mimeType || null,
        properties: g.properties || g,
      };
    });

    return {
      position: positionData || { horizontal: "center", vertical: "above", noWrap: false },
      width: 570,
      count: { files: gallery.length, columns: gallery.length, rows: 1 },
      rows,
    };
  }

  return {
    position: positionData || { horizontal: "center", vertical: "above", noWrap: false },
    count: { files: 0, columns: 0, rows: 0 },
    rows: {},
  };
}

/* ================================
       IMAGE NORMALIZER
==================================*/

function extractImagePath(img) {
  if (!img || typeof img !== "object") return null;

  // Direct path properties (highest priority)
  if (img.path) return img.path;
  if (img.publicUrl) return img.publicUrl;
  if (img.originalUrl) return img.originalUrl;
  if (img.url) return img.url;

  // Handle cropVariants structure (e.g., meta.ogImage.cropVariants.social.publicUrl)
  if (img.cropVariants) {
    const cv = img.cropVariants;

    // Priority order for crop variants
    const priority = ["social", "specialTablet", "specialMobile", "default"];
    for (let key of priority) {
      if (cv[key]?.publicUrl) return cv[key].publicUrl;
      if (cv[key]?.properties?.publicUrl) return cv[key].properties.publicUrl;
      if (cv[key]?.path) return cv[key].path;
      if (cv[key]?.originalUrl) return cv[key].originalUrl;
    }

    // If priority variants not found, try first available variant
    const keys = Object.keys(cv);
    if (keys.length) {
      const f = cv[keys[0]];
      return f.publicUrl || f.properties?.publicUrl || f.path || f.originalUrl || null;
    }
  }

  // Handle properties object
  if (img.properties) {
    return (
      img.properties.publicUrl ||
      img.properties.originalUrl ||
      img.properties.path ||
      img.properties.url ||
      null
    );
  }

  return null;
}

function normalizeImage(img) {
  if (!img) return [];
  if (img === "0" || img === 0) return [];

  if (typeof img === "string") return [{ path: img }];

  if (Array.isArray(img)) {
    return img
      .map((i) => {
        if (typeof i === "string") return { path: i };
        const path = extractImagePath(i);
        return path ? { path } : null;
      })
      .filter(Boolean);
  }

  if (typeof img === "object") {
    const path = extractImagePath(img);
    return path ? [{ path }] : [];
  }

  return [];
}

/* ================================
       LINK NORMALIZER
==================================*/

function normalizeLink(link) {
  if (!link) return "";
  if (typeof link === "string") return link;
  if (typeof link === "number") return String(link);
  if (typeof link === "object") {
    return link.path || link.href || "";
  }
  return "";
}

/* ================================
       MENU NORMALIZER
==================================*/

function normalizeMenuItem(item) {
  if (!item || typeof item !== "object") return item;

  const out = { ...item };

  if (out.link && typeof out.link !== "string") {
    out.link = normalizeLink(out.link);
  }

  // Normalize children recursively - preserve existing structure
  if (out.children) {
    if (Array.isArray(out.children)) {
      out.children = out.children.map(normalizeMenuItem);
    } else {
      out.children = Object.values(out.children).map(normalizeMenuItem);
    }
  } else if (out.hasSubpages) {
    // If hasSubpages is true but no children, initialize empty array
    // This allows components to check hasSubpages to show submenu indicators
    out.children = [];
  }

  return out;
}

/* ================================
       CONTENT ELEMENT NORMALIZER
==================================*/

function normalizeContentElement(el) {
  if (!el) return el;

  const out = { ...el };

  out.appearance = out.appearance || {
    layout: "default",
    frameClass: "default",
    spaceBefore: "",
    spaceAfter: "",
  };

  if (!out.content) {
    out.content = {};
  } else {
    try {
      out.content = structuredClone(out.content);
    } catch {
      out.content = { ...out.content };
    }
  }

  if (out.content.image !== undefined) {
    out.content.image = normalizeImage(out.content.image);
  }

  if (out.content.pi_flexform_content?.image !== undefined) {
    out.content.pi_flexform_content.image = normalizeImage(
      out.content.pi_flexform_content.image
    );
    if (!out.content.image) {
      out.content.image = out.content.pi_flexform_content.image;
    }
  }

  if (out.content.gallery) {
    // Try to preserve position data if it exists in content or pi_flexform_content
    // Position might be stored as:
    // 1. content.position (object with horizontal/vertical/noWrap)
    // 2. pi_flexform_content.position (object)
    // 3. Separate fields: horizontal, vertical, noWrap in content or pi_flexform_content
    let positionData = null;
    
    if (out.content.position && typeof out.content.position === "object") {
      positionData = out.content.position;
    } else if (out.content.pi_flexform_content?.position && typeof out.content.pi_flexform_content.position === "object") {
      positionData = out.content.pi_flexform_content.position;
    } else if (out.content.horizontal || out.content.vertical || out.content.noWrap !== undefined) {
      positionData = {
        horizontal: out.content.horizontal,
        vertical: out.content.vertical,
        noWrap: out.content.noWrap,
      };
    } else if (out.content.pi_flexform_content?.horizontal || out.content.pi_flexform_content?.vertical || out.content.pi_flexform_content?.noWrap !== undefined) {
      positionData = {
        horizontal: out.content.pi_flexform_content.horizontal,
        vertical: out.content.pi_flexform_content.vertical,
        noWrap: out.content.pi_flexform_content.noWrap,
      };
    }
    
    out.content.gallery = normalizeGallery(out.content.gallery, positionData);
  }

  return out;
}

/* ================================
       PAGE NORMALIZER + LOGS
==================================*/

function normalizePage(p) {
  if (!p) return {};

  const out = { ...p };

  out.slug = out.slug || out.url || "/";
  out.appearance = out.appearance || { backendLayout: "content" };

  // MAIN NAVIGATION = main pages
  // Normalize mainNavigation items (preserve any existing children)
  const mainNav = ensureArray(p.page?.mainNavigation || p.mainNavigation)
    .map(normalizeMenuItem);

  // SUB NAVIGATION = TYPO3 already nested children here
  // Normalize subNavigation items (preserve nested children structure)
  const subNav = ensureArray(p.page?.subNavigation || p.subNavigation)
    .map(normalizeMenuItem);

  // Strategy: If subNavigation exists and has items, use it to enhance mainNavigation
  // subNavigation typically contains the full site tree with nested children
  // IMPORTANT: We attach subNavigation items as children to mainNavigation items, but we NEVER use subNavigation directly as the menu
  if (subNav.length > 0 && mainNav.length > 0) {
    // For each mainNavigation item, try to find matching subNavigation items that should be its children
    out.mainNavigation = mainNav.map((main) => {
      // Preserve existing children if they exist
      if (!main.children || !Array.isArray(main.children)) {
        main.children = [];
      }

      // Try multiple matching strategies to find children from subNavigation:
      // 1. Match by UID (pid of subItem matches uid of main item) - MOST RELIABLE
      // 2. Match by slug structure (subItem's slug starts with main item's slug)
      const mainUid = main.data?.uid;
      const mainSlug = (main.link || main.data?.slug || "").replace(/\/$/, "");

      subNav.forEach((subItem) => {
        if (!subItem || !subItem.data) return;

        const subPid = subItem.data.pid;
        const subSlug = (subItem.link || subItem.data?.slug || "").replace(/\/$/, "");
        const subUid = subItem.data.uid;

        let shouldAttach = false;

        // Strategy 1: Match by parent UID (most reliable)
        // subItem's pid should match main item's uid
        if (mainUid && subPid && subPid === mainUid) {
          shouldAttach = true;
        }
        // Strategy 2: Match by slug structure (child slug contains parent slug)
        // Only if slug matching and the subItem is not the root (pid !== 0 and pid !== 1)
        else if (mainSlug && subSlug && subPid && subPid !== 0 && subPid !== 1) {
          // Check if subItem's slug starts with main item's slug
          if (subSlug.startsWith(mainSlug + "/") && subSlug !== mainSlug) {
            // Also verify it's a direct child (not a grandchild) by checking if there's only one level difference
            const mainSlugParts = mainSlug.split("/").filter(Boolean);
            const subSlugParts = subSlug.split("/").filter(Boolean);
            if (subSlugParts.length === mainSlugParts.length + 1) {
              shouldAttach = true;
            }
          }
        }

        if (shouldAttach) {
          // Check if this subItem is already in children (avoid duplicates)
          const exists = main.children.some(
            (child) => child.data?.uid === subUid
          );
          if (!exists) {
            // Add the subItem with its nested children structure preserved
            main.children.push(subItem);
          }
        }
      });

      // If hasSubpages is true but no children were found, ensure children is at least empty array
      if (main.hasSubpages && (!main.children || main.children.length === 0)) {
        main.children = [];
      }

      return main;
    });
  } else {
    // No subNavigation or no mainNavigation, use mainNavigation as-is
    out.mainNavigation = mainNav;
  }

  // Also preserve subNavigation at root level for backward compatibility
  out.subNavigation = subNav;

  // Ensure page object exists and has navigation data
  if (!out.page) {
    out.page = {};
  }
  out.page.mainNavigation = out.mainNavigation;
  out.page.subNavigation = out.subNavigation;

  // CONTENT — leave as is
  out.content = safeObject(out.content);
  Object.keys(out.content).forEach((pos) => {
    out.content[pos] = ensureArray(out.content[pos]).map(normalizeContentElement);
  });

  return out;
}



/* ================================
       TOP LEVEL NORMALIZER
==================================*/

export default function normalizeApiResponse(resp) {
  if (!resp) return {};

  const out = { ...resp };
  const page = resp.page || resp.data?.page || resp.data;

  const normalizedPage = normalizePage(page);
  
  // Set normalized data
  out.data = normalizedPage;
  out.page = normalizedPage;

  // IMPORTANT: Preserve navigation data from original response if normalized version doesn't have it
  // This ensures backward compatibility
  if (resp.page?.mainNavigation && (!normalizedPage.mainNavigation || normalizedPage.mainNavigation.length === 0)) {
    normalizedPage.mainNavigation = ensureArray(resp.page.mainNavigation).map(normalizeMenuItem);
    normalizedPage.page.mainNavigation = normalizedPage.mainNavigation;
    out.data.mainNavigation = normalizedPage.mainNavigation;
    out.page.mainNavigation = normalizedPage.mainNavigation;
  }
  
  if (resp.page?.subNavigation && (!normalizedPage.subNavigation || normalizedPage.subNavigation.length === 0)) {
    normalizedPage.subNavigation = ensureArray(resp.page.subNavigation).map(normalizeMenuItem);
    normalizedPage.page.subNavigation = normalizedPage.subNavigation;
    out.data.subNavigation = normalizedPage.subNavigation;
    out.page.subNavigation = normalizedPage.subNavigation;
  }

  // If subNavigation has full tree structure but mainNavigation doesn't have children attached,
  // prioritize subNavigation for navigation display
  // This handles cases where subNavigation contains the complete site structure
  if (normalizedPage.subNavigation && normalizedPage.subNavigation.length > 0) {
    const subNavHasChildren = normalizedPage.subNavigation.some(
      item => item.children && Array.isArray(item.children) && item.children.length > 0
    );
    const mainNavHasChildren = normalizedPage.mainNavigation && normalizedPage.mainNavigation.some(
      item => item.children && Array.isArray(item.children) && item.children.length > 0
    );
    
    // If subNavigation has nested structure but mainNavigation doesn't, 
    // ensure subNavigation is available for use
    if (subNavHasChildren && !mainNavHasChildren) {
      // Keep subNavigation accessible - Layout component will use it
      out.data.subNavigation = normalizedPage.subNavigation;
      out.page.subNavigation = normalizedPage.subNavigation;
    }
  }

  return out;
}
