"use client";
import SafeLink from "@/components/Core/SafeLink";
import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";
import GlobalContext from "@/context/GlobalContext";

const GridColumns = ({ data, spaceAfter, spaceBefore, id }) => {
  const gcontext = useContext(GlobalContext);
  const menuItems = gcontext?.menuItems || [];
  
  // Helper to recursively find a page by UID in navigation tree
  const findPageByUid = (items, targetUid) => {
    if (!items || !Array.isArray(items)) return null;
    
    for (const item of items) {
      // Check if this item matches
      const itemUid = item?.data?.uid || item?.uid;
      if (itemUid && String(itemUid) === String(targetUid)) {
        return item;
      }
      
      // Recursively check children
      if (item?.children && Array.isArray(item.children) && item.children.length > 0) {
        const found = findPageByUid(item.children, targetUid);
        if (found) return found;
      }
    }
    
    return null;
  };
  
  // Helper to resolve link - convert UID to slug if needed
  const resolveLink = (link, itemData) => {
    // If link is already a string and looks like a URL/slug, return it
    if (typeof link === "string") {
      // If it's a valid URL or starts with /, return as-is
      if (link.startsWith("http") || link.startsWith("/") || link.startsWith("#")) {
        return link;
      }
      // If it's just a number as string, treat it as UID
      if (/^\d+$/.test(link.trim())) {
        const uid = link.trim();
        const page = findPageByUid(menuItems, uid);
        if (page) {
          return page.link || page.data?.slug || page.data?.url || "#";
        }
      }
      return link;
    }
    
    // If link is a number (UID), resolve it to slug
    if (typeof link === "number") {
      const page = findPageByUid(menuItems, link);
      if (page) {
        return page.link || page.data?.slug || page.data?.url || "#";
      }
      // If not found in navigation, return as string (fallback)
      return String(link);
    }
    
    // If link is an object, extract path/href
    if (typeof link === "object" && link !== null) {
      return link.path || link.href || link.url || "#";
    }
    
    // Check if itemData has slug/link we can use
    if (itemData) {
      if (itemData.data?.slug) return itemData.data.slug;
      if (itemData.data?.link) return itemData.data.link;
      if (itemData.slug) return itemData.slug;
    }
    
    return "#";
  };
  
  let teaseritems = data?.teaseritems;
  if (!teaseritems && data?.pi_flexform_content?.teaseritems) {
    teaseritems = data.pi_flexform_content.teaseritems;
  }
  
  const normalizedTeaserItems = teaseritems ? Object.values(teaseritems).map(item => {
    let processedItem = { ...item };
    if (item?.container && typeof item.container === "object") {
      const { container, ...itemWithoutContainer } = item;
      processedItem = {
        ...itemWithoutContainer,
        ...container,
      };
    }
    if (processedItem.image !== undefined) {
      processedItem.image = getImageUrlFromData(processedItem.image);
    }
    // Resolve link - handle UIDs, objects, and strings properly
    if (processedItem.link !== undefined) {
      processedItem.link = resolveLink(processedItem.link, processedItem);
    }
    return processedItem;
  }) : [];
  
  return (
    <div
      className={`content-section frame ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
      id={id}
    >
      <div className="teaser-block-headline">
        <h3>{data?.headline || data?.pi_flexform_content?.headline || ""}</h3>
      </div>
      <Row>
        {normalizedTeaserItems.length > 0 ? normalizedTeaserItems
          .filter(item => item && (item.name || item.title)) // Only render items with text
          .map((processedItem, index) => {
          const imageUrl = processedItem.image;
          const hasImage = imageUrl && imageUrl !== "none" && imageUrl !== "" && imageUrl !== "/placeholder.png" && imageUrl.trim() !== "" && data?.variation !== "0";
          const link = processedItem.link || "";
          const displayText = processedItem.name || processedItem.title || "";
          
          // Skip if no display text
          if (!displayText || displayText.trim() === "") {
            return null;
          }
          
          // Check if link is empty, "#", or just a UID (numeric string that couldn't be resolved)
          const hasValidLink = link && link !== "" && link !== "#" && !/^\d+$/.test(link);
          
          return (
            <Col sm={4} key={index}>
              {!hasValidLink ? (
                <div className="teaser-link">
                  {hasImage ? (
                    <div className="teaser-image">
                      <picture>
                        <source
                          media="(min-width: 1200px)"
                          srcSet={imageUrl}
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet={imageUrl}
                        />
                        <source
                          srcSet={imageUrl}
                        />
                        <img
                          src={imageUrl}
                          alt={displayText || "Image thumb"}
                        />
                      </picture>
                    </div>
                  ) : null}
                  <span>{displayText}</span>
                </div>
              ) : (
                <SafeLink
                  href={typeof link === "string" ? link : "#"}
                  className="teaser-link"
                >
                  {hasImage ? (
                    <div className="teaser-image">
                      <picture>
                        <source
                          media="(min-width: 1200px)"
                          srcSet={imageUrl}
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet={imageUrl}
                        />
                        <source
                          srcSet={imageUrl}
                        />
                        <img
                          src={imageUrl}
                          alt={displayText || "Image thumb"}
                        />
                      </picture>
                    </div>
                  ) : null}
                  <span>{displayText}</span>
                </SafeLink>
              )}
            </Col>
          );
        }).filter(Boolean) : null}
      </Row>
    </div>
  );
};

export default GridColumns;
