"use client";

import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FancyBox from "./FancyBox";
import Header from "@/sections/Headings";
import Image from "next/image";

const Images = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
  id,
}) => {
  // Extract gallery from multiple possible locations
  let gallery = data?.gallery;
  if (!gallery && data?.content?.gallery) {
    gallery = data.content.gallery;
  } else if (!gallery && data?.pi_flexform_content?.gallery) {
    gallery = data.pi_flexform_content.gallery;
  } else if (!gallery && data?.content?.pi_flexform_content?.gallery) {
    gallery = data.content.pi_flexform_content.gallery;
  }
  
  // Handle container wrappers - recursively extract
  while (gallery?.container && typeof gallery.container === "object") {
    gallery = gallery.container.gallery || gallery.container;
  }
  
  const enlargeImageOnClick = data?.enlargeImageOnClick || data?.pi_flexform_content?.enlargeImageOnClick;

  const safeGallery = gallery || {};
  
  // Extract position from multiple possible locations (similar to TextPic)
  let position = {
    horizontal: "center",
    vertical: "above",
    noWrap: false,
  };
  
  let positionSource = null;
  
  // Check if gallery has position (normalized format with rows)
  if (gallery && typeof gallery === "object" && !Array.isArray(gallery) && gallery.position) {
    positionSource = gallery.position;
  }
  // Check data.position
  else if (data?.position && typeof data.position === "object") {
    positionSource = data.position;
  }
  // Check data.gallery.position
  else if (data?.gallery?.position && typeof data.gallery.position === "object") {
    positionSource = data.gallery.position;
  }
  // Check pi_flexform_content.position
  else if (data?.pi_flexform_content?.position && typeof data.pi_flexform_content.position === "object") {
    positionSource = data.pi_flexform_content.position;
  }
  // Check content.position
  else if (data?.content?.position && typeof data.content.position === "object") {
    positionSource = data.content.position;
  }
  // Check if position fields are separate properties in data
  else if (data?.horizontal || data?.vertical || data?.noWrap !== undefined) {
    positionSource = {
      horizontal: data.horizontal,
      vertical: data.vertical,
      noWrap: data.noWrap,
    };
  }
  // Check pi_flexform_content for separate fields
  else if (data?.pi_flexform_content?.horizontal || data?.pi_flexform_content?.vertical || data?.pi_flexform_content?.noWrap !== undefined) {
    positionSource = {
      horizontal: data.pi_flexform_content.horizontal,
      vertical: data.pi_flexform_content.vertical,
      noWrap: data.pi_flexform_content.noWrap,
    };
  }
  
  if (positionSource && typeof positionSource === "object") {
    position = {
      horizontal: positionSource.horizontal || position.horizontal,
      vertical: positionSource.vertical || position.vertical,
      noWrap: positionSource.noWrap !== undefined ? positionSource.noWrap : position.noWrap,
    };
  }

  const rows = safeGallery.rows || { "1": { columns: {} } };
  const border = safeGallery.border || { enabled: false };
  const width = safeGallery.width || 0;
  const height = safeGallery.height || 0;
  
  const images = (image, border, position, width, height) => {
    // Handle different image data structures
    let imageArray = [];
    
    if (Array.isArray(image)) {
      imageArray = image;
    } else if (image && typeof image === "object") {
      // If it's an object, check if it has container wrapper
      let imgData = image;
      while (imgData?.container && typeof imgData.container === "object") {
        imgData = imgData.container.image || imgData.container;
      }
      
      // Check if it's a single image object or an object with image array
      if (imgData.publicUrl || imgData.path || imgData.originalUrl || imgData.url) {
        imageArray = [imgData];
      } else if (Array.isArray(imgData)) {
        imageArray = imgData;
      } else if (imgData && typeof imgData === "object") {
        // Try to extract from common property names
        const extracted = imgData.image || imgData.images || imgData.files || imgData.items;
        if (Array.isArray(extracted)) {
          imageArray = extracted;
        } else if (extracted) {
          imageArray = [extracted];
        }
      }
    } else if (image) {
      imageArray = [image];
    }
    
    if (!imageArray || imageArray.length === 0) {
      return null;
    }
    
    return imageArray.map((img, index) => {
      if (!img) return null;
      
      // Handle container wrappers in individual images
      let imgData = img;
      while (imgData?.container && typeof imgData.container === "object") {
        imgData = imgData.container.image || imgData.container;
      }
      
      const properties = imgData?.properties || imgData || {};
      const publicUrl = imgData?.publicUrl || imgData?.path || imgData?.originalUrl || imgData?.url || properties?.publicUrl || properties?.path || "";
      
      if (!publicUrl || publicUrl.trim() === "" || publicUrl === "0") {
        return null;
      }
      return (
        <React.Fragment key={publicUrl + index}>
          <FancyBox
            options={{
              Carousel: {
                infinite: false,
              },
            }}
          >
            {properties.link
              ? publicUrl && (
                <SafeLink href={properties.link || "#"} className="image-wrap">
                    <Image
                      src={publicUrl}
                      width={0}
                      height={0}
                      alt={properties.alternative}
                      title={properties.title}
                      className={`w-100 h-100 ${
                        border.enabled
                          ? "img-fluid rounded mb-4"
                          : "image-embed-item float- "
                      }`}
                    />
                  </SafeLink>
                )
              : publicUrl &&
                (enlargeImageOnClick ? (
                  <SafeLink href={publicUrl || "#"} data-fancybox="gallery">
                    <Image
                      src={publicUrl}
                      alt={properties.alternative}
                      title={properties.title}
                      width={0}
                      height={0}
                      className={`w-100 h-100 ${
                        border.enabled
                          ? "img-fluid rounded mb-4"
                          : "image-embed-item float- "
                      }`}
                    />
                  </SafeLink>
                ) : (
                    
                  <Image
                    src={publicUrl}
                    alt={properties.alternative}
                    title={properties.title}
                    height={0}
                    width={0}
                    className={`w-100 h-100 ${
                      border.enabled
                        ? "img-fluid rounded mb-4"
                        : "image-embed-item float- "
                    }`}
                  />
                ))}
          </FancyBox>
          {properties.description && (
            <figcaption className="image-caption">
              {properties.description}
            </figcaption>
          )}
        </React.Fragment>
      );
    }).filter(Boolean); // Filter out null values
  };

  const renderImage = ({ position, rows, border, width, height }) => {
    return (
      <>
        <Header
          data={data}
          layoutType={layoutType}
          elementType={elementType}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
        >
          <div
            className={`ce-${elementType} ce-${
              position.horizontal && position.horizontal
            } ${position.vertical && `ce-${position.vertical}`} ${
              position.noWrap ? "ce-nowrap" : ""
            }`}
          >
            <div className="ce-gallery" data-ce-columns="1" data-ce-images="1">
              <div className="ce-row">
                <div className="ce-column">
                  {(() => {
                    let imageData = null;
                    
                    // First, check if gallery is directly an array (new format)
                    if (Array.isArray(gallery) && gallery.length > 0) {
                      imageData = gallery;
                    }
                    // If gallery is an object with rows structure (old format)
                    else if (safeGallery.rows) {
                      // Try to get images from rows["1"].columns first
                      imageData = rows["1"]?.columns;
                      
                      // If not found, try other row keys
                      if (!imageData || Object.keys(imageData || {}).length === 0) {
                        const rowKeys = Object.keys(rows || {});
                        for (const key of rowKeys) {
                          if (rows[key]?.columns && Object.keys(rows[key].columns || {}).length > 0) {
                            imageData = rows[key].columns;
                            break;
                          }
                        }
                      }
                    }
                    // If still not found, try direct image/gallery properties
                    if (!imageData || (Array.isArray(imageData) && imageData.length === 0) || (typeof imageData === "object" && !Array.isArray(imageData) && Object.keys(imageData).length === 0)) {
                      imageData = safeGallery.image || safeGallery.images || safeGallery.files;
                    }
                    
                    // Handle container wrappers in columns
                    if (imageData && typeof imageData === "object" && !Array.isArray(imageData)) {
                      let columnsData = imageData;
                      while (columnsData?.container && typeof columnsData.container === "object") {
                        columnsData = columnsData.container.columns || columnsData.container;
                      }
                      imageData = columnsData;
                    }
                    
                    if (imageData) {
                      const imageValues = Array.isArray(imageData) ? imageData : Object.values(imageData);
                      if (imageValues && imageValues.length > 0) {
                        return images(imageValues, border, position, width, height);
                      }
                    }
                    
                    return null;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </Header>
      </>
    );
  };

  return (
    <div
      className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      } ${spaceBefore && `frame-space-after-${spaceBefore}`}`}
      id={id}
    >
      {renderImage({ position, rows, border, width, height })}
    </div>
  );
};
export default Images;
