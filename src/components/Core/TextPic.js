"use client";
/* eslint-disable react/no-children-prop */

import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FancyBox from "./FancyBox";
import Header from "@/sections/Headings";
// import { useTranslations } from "next-intl";
import DOMPurify from "dompurify";

const TextPic = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
  id,
}) => {
  //   const t = useTranslations();
  const { bodytext, gallery, enlargeImageOnClick } = data || {};
  
  // Debug: Log data structure to understand where position is stored
  // Remove this after fixing
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("TextPic data:", {
      hasGallery: !!gallery,
      galleryType: Array.isArray(gallery) ? "array" : typeof gallery,
      galleryKeys: gallery && typeof gallery === "object" ? Object.keys(gallery) : null,
      dataKeys: data ? Object.keys(data) : null,
      hasPosition: !!(data?.position || gallery?.position || data?.pi_flexform_content?.position),
      position: data?.position || gallery?.position || data?.pi_flexform_content?.position,
      pi_flexform_keys: data?.pi_flexform_content ? Object.keys(data.pi_flexform_content) : null,
    });
  }
  
  // Handle both array format (new API) and object format (old format)
  let galleryImages = [];
  let galleryPosition = {
    horizontal: "center",
    vertical: "above",
    noWrap: false,
  };
  let galleryBorder = { enabled: false };
  
  // Try to extract position from multiple possible locations FIRST
  // Priority order:
  // 1. gallery.position (if gallery is normalized object with rows)
  // 2. data.position (direct property)
  // 3. data.gallery.position (if gallery exists as object)
  // 4. data.pi_flexform_content.position (flexform data)
  // 5. data.content.position (content level)
  // 6. Separate fields: data.horizontal/vertical/noWrap
  // 7. pi_flexform_content separate fields
  
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
    galleryPosition = {
      horizontal: positionSource.horizontal || galleryPosition.horizontal,
      vertical: positionSource.vertical || galleryPosition.vertical,
      noWrap: positionSource.noWrap !== undefined ? positionSource.noWrap : galleryPosition.noWrap,
    };
  }
  
  // Check for border
  const borderSource = 
    (gallery && typeof gallery === "object" && gallery.border) ||
    data?.border || 
    data?.gallery?.border || 
    data?.pi_flexform_content?.border ||
    data?.content?.border;
  if (borderSource) {
    galleryBorder = borderSource;
  }
  
  // Now extract images based on gallery structure
  if (gallery && typeof gallery === "object" && gallery.rows) {
    // Normalized format: gallery has rows/columns structure
    const rows = gallery.rows || { "1": { columns: {} } };
    if (rows["1"] && rows["1"].columns) {
      galleryImages = Object.values(rows["1"].columns);
    }
  } else if (Array.isArray(gallery) && gallery.length > 0) {
    // Raw array format: gallery is directly an array
    galleryImages = gallery;
  } else if (gallery && typeof gallery === "object" && !Array.isArray(gallery)) {
    // Fallback: might have other structure
    if (gallery.rows) {
      const rows = gallery.rows || { "1": { columns: {} } };
      if (rows["1"] && rows["1"].columns) {
        galleryImages = Object.values(rows["1"].columns);
      }
    }
  }

  const images = (image, border) => {
    if (!image || !Array.isArray(image) || image.length === 0) {
      return null;
    }
    
    return image.map((item, index) => {
      if (!item || !item.publicUrl) return null;
      
      const { properties, publicUrl } = item;
      
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
                  <SafeLink href={`${properties.link}`} className="image-wrap">
                    <LazyLoadImage
                      alt={properties.alternative}
                      src={publicUrl}
                      title={properties.title}
                      effect="blur"
                      className={`w-100 ${
                        border.enabled
                          ? "img-fluid rounded mb-4"
                          : "image-embed-item float- "
                      }`}
                    />
                  </SafeLink>
                )
              : publicUrl &&
                (enlargeImageOnClick ? (
                  <SafeLink href={publicUrl} data-fancybox="gallery">
                    <LazyLoadImage
                      alt={properties.alternative}
                      src={publicUrl}
                      title={properties.title}
                      effect="blur"
                      className={`w-100 ${
                        border.enabled
                          ? "img-fluid rounded mb-4"
                          : "image-embed-item float- "
                      }`}
                    />
                  </SafeLink>
                ) : (
                  <LazyLoadImage
                    alt={properties.alternative}
                    src={publicUrl}
                    title={properties.title}
                    effect="blur"
                    className={`w-100 ${
                      border.enabled
                        ? "img-fluid rounded mb-4"
                        : "image-embed-item float- "
                    }`}
                  />
                ))}
          </FancyBox>
          {properties.description && <p>{properties.description}</p>}
        </React.Fragment>
      );
    });
  };

  const renderImage = (bodytext) => {
    return (
      <Header
        data={data}
        layoutType={layoutType}
        elementType={elementType}
        spaceAfter={spaceAfter}
        spaceBefore={spaceBefore}
      >
        <div
          className={`ce-${elementType} ce-${
            galleryPosition.horizontal && galleryPosition.horizontal
          } ${galleryPosition.vertical && `ce-${galleryPosition.vertical}`} ${
            galleryPosition.noWrap ? "ce-nowrap" : ""
          }`}
        >
          {galleryPosition.vertical === "below" ? (
            <>
              {bodytext && (
                <div className="ce-bodytext">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(bodytext),
                    }}
                  />
                </div>
              )}
              {galleryImages && galleryImages.length > 0 ? (
                <div
                  className={`ce-gallery`}
                  data-ce-columns="1"
                  data-ce-images={galleryImages.length}
                >
                  <div className="ce-row">
                    <div className="ce-column">
                      {images(galleryImages, galleryBorder)}
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <>
              {galleryImages && galleryImages.length > 0 ? (
                <div
                  className={`ce-gallery`}
                  data-ce-columns="1"
                  data-ce-images={galleryImages.length}
                >
                  <div className="ce-row">
                    <div className="ce-column">
                      {images(galleryImages, galleryBorder)}
                    </div>
                  </div>
                </div>
              ) : null}
              {bodytext && (
                <div className="ce-bodytext">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(bodytext),
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Header>
    );
  };
  return (
    <React.Fragment id={id}>{renderImage(bodytext)}</React.Fragment>
  );
};
export default TextPic;
