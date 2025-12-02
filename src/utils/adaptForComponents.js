// src/utils/adaptForComponents.js

export function adaptToComponentShape(page) {
    if (!page) return page;
  
    const out = { ...page };
  
    // Convert contentElements -> slides (for testimonial)
    out.slides = out.contentElements?.map((el) => {
      const img = el.content?.image || [];
  
      return {
        // components expect .image[], not .content.image
        image: img,
  
        name: el.content?.name || el.name || "",
        quotes: el.content?.quotes || "",
        designation: el.content?.designation || "",
        ...el
      };
    });
  
    return out;
  }
  