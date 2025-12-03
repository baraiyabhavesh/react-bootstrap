"use client";
import React from "react";
import DOMPurify from "dompurify";
import { Container } from "react-bootstrap";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";

const MediumBanner = ({ content, spaceAfter }) => {
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
  
  return (
    <div
      className={`content-section frame  ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }`}
    >
      <Container>
        <div className="banner-section medium-banner-section">
          <div
            className="bg-img"
            style={{
              backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
            }}
          >
            <div className="banner-content 1">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content.content),
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MediumBanner;
