"use client";
import React from "react";
import DOMPurify from "dompurify";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";

const ParallaxBanner = ({ content, spaceAfter, spaceBefore }) => {
  console.log(content);
  // Handle image from multiple possible locations
  let imageData = null;
  
  // Try multiple locations in order of priority
  if (content?.image) {
    imageData = content.image;
  } else if (content?.pi_flexform_content?.image) {
    imageData = content.pi_flexform_content.image;
  } else if (content?.content?.image) {
    imageData = content.content.image;
  } else if (content?.content?.pi_flexform_content?.image) {
    imageData = content.content.pi_flexform_content.image;
  }
  
  // Handle container wrappers - recursively extract
  while (imageData?.container && typeof imageData.container === "object") {
    imageData = imageData.container.image || imageData.container;
  }
  
  const imageUrl = getImageUrlFromData(imageData) || "";

  console.log("imageUrl",imageUrl);
  
  // Extract content HTML from multiple locations
  const contentHtml = content?.content || content?.pi_flexform_content?.content || "";
  
  return (
    <div
      className={`content-section frame ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <section
        className="banner-section parallax-banner"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        }}
      >
        <div className="banner-content 1">
          {contentHtml && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(contentHtml),
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ParallaxBanner;
