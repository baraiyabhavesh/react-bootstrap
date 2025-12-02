"use client";
import React from "react";
import DOMPurify from "dompurify";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";

const SmallBanner = ({ content }) => {
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
  
  return (
    <div className="content-section frame">
      <section className="banner-section small-banner">
        <div
          className="bg-img"
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          }}
        >
          <div className="banner-content">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content.content),
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default SmallBanner;
