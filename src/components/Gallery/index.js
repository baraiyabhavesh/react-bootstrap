"use client";
import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FancyBox from "../Core/FancyBox";

const Gallery = ({ data, spaceAfter }) => {
  // Extract image from multiple possible locations
  let images = data?.image || data?.pi_flexform_content?.image || data?.content?.image;
  
  // Normalize images to array of objects with path property
  let normalizedImages = [];
  if (images) {
    if (Array.isArray(images)) {
      normalizedImages = images.map(item => {
        // If item is a string (path), convert to object
        if (typeof item === "string") {
          return { path: item };
        }
        // If item is an object, extract path
        if (typeof item === "object" && item !== null) {
          return {
            path: item.path || item.publicUrl || item.url || item.originalUrl || "",
            ...item
          };
        }
        return null;
      }).filter(Boolean);
    } else if (typeof images === "string") {
      // Single string path
      normalizedImages = [{ path: images }];
    } else if (typeof images === "object" && images !== null) {
      // Single object
      normalizedImages = [{
        path: images.path || images.publicUrl || images.url || images.originalUrl || "",
        ...images
      }];
    }
  }
  
  // Extract headline and imagePerRow from multiple locations
  const headline = data?.headline || data?.pi_flexform_content?.headline || data?.content?.headline || "";
  const imagePerRow = data?.imagePerRow || data?.pi_flexform_content?.imagePerRow || data?.content?.imagePerRow || "";
  
  // Validate we have images to render
  if (!normalizedImages || normalizedImages.length === 0) {
    return null;
  }
  
  // Helper to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath.trim() === "") return "";
    
    // If already a full URL, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    
    // Construct URL from base API URL
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
    const cleanPath = imagePath.replace(/^\/+/, "");
    
    // If path already starts with fileadmin, use it directly
    if (cleanPath.startsWith("fileadmin/")) {
      return `${baseUrl}/${cleanPath}`;
    }
    
    // Otherwise, prepend fileadmin
    return `${baseUrl}/fileadmin/${cleanPath}`;
  };
  
  // Determine column classes
  const getColClasses = () => {
    if (imagePerRow) {
      // imagePerRow might be "col-lg-3" or just "col-lg-3 col-md-4 col-sm-6"
      if (imagePerRow.includes("col-")) {
        return imagePerRow;
      }
    }
    // Default: col-lg-3 col-md-4 col-sm-6
    return "col-lg-3 col-md-4 col-sm-6";
  };
  
  const colClasses = getColClasses();
  
  return (
    <div
      className={`content-section frame ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }`}
    >
      <div className="gallery-wrap">
        {headline && <h2 className="text-center">{headline}</h2>}
        <FancyBox
          options={{
            Carousel: {
              infinite: false,
            },
          }}
        >
          <Row>
            {normalizedImages
              .filter(item => item && item.path && item.path.trim() !== "")
              .map((item, index) => {
              const imageUrl = getImageUrl(item.path);
              
              if (!imageUrl) return null;
              
              return (
                <Col
                  key={index}
                  className={colClasses}
                >
                  <figure>
                    <SafeLink
                      href={imageUrl}
                      data-fancybox="gallery"
                    >
                      <LazyLoadImage
                        effect="opacity"
                        src={imageUrl}
                        alt="Image thumb"
                        width={"100%"}
                        className="image-embed-item img-fluid"
                      />
                    </SafeLink>
                  </figure>
                </Col>
              );
            })}
          </Row>
        </FancyBox>
      </div>
    </div>
  );
};

export default Gallery;
