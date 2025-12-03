"use client";
import React from "react";
import DOMPurify from "dompurify";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";

const ParallaxBanner = ({ content, spaceAfter, spaceBefore }) => {
  let imageData = null;
  if (content?.image) {
    imageData = content.image;
  } else if (content?.pi_flexform_content?.image) {
    imageData = content.pi_flexform_content.image;
  } else if (content?.content?.image) {
    imageData = content.content.image;
  } else if (content?.content?.pi_flexform_content?.image) {
    imageData = content.content.pi_flexform_content.image;
  }
    
  while (imageData?.container && typeof imageData.container === "object") {
    imageData = imageData.container.image || imageData.container;
  }
  
  const imageUrl = getImageUrlFromData(imageData) || "";

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
