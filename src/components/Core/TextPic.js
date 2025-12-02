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
  
  // Ensure gallery has default structure if missing
  const safeGallery = gallery || {};
  const position = safeGallery.position || {
    horizontal: "center",
    vertical: "above",
    noWrap: false,
  };
  const rows = safeGallery.rows || { "1": { columns: {} } };
  const border = safeGallery.border || { enabled: false };

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

  const renderImage = (bodytext, galleryData) => {
    // Ensure we have valid gallery data with defaults
    const safePosition = galleryData?.position || position;
    const safeRows = galleryData?.rows || rows;
    const safeBorder = galleryData?.border || border;
    
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
            safePosition.horizontal && safePosition.horizontal
          } ${safePosition.vertical && `ce-${safePosition.vertical}`} ${
            safePosition.noWrap ? "ce-nowrap" : ""
          }`}
        >
          {safePosition.vertical === "below" ? (
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
              {safeRows[1] && safeRows[1].columns && Object.values(safeRows[1].columns).length > 0 ? (
                <div
                  className={`ce-gallery`}
                  data-ce-columns="1"
                  data-ce-images="1"
                >
                  <div className="ce-row">
                    <div className="ce-column">
                      {images(Object.values(safeRows[1].columns), safeBorder)}
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <>
              {safeRows[1] && safeRows[1].columns && Object.values(safeRows[1].columns).length > 0 ? (
                <div
                  className={`ce-gallery`}
                  data-ce-columns="1"
                  data-ce-images="1"
                >
                  <div className="ce-row">
                    <div className="ce-column">
                      {images(Object.values(safeRows[1].columns), safeBorder)}
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
    <React.Fragment id={id}>{renderImage(bodytext, gallery)}</React.Fragment>
  );
};
export default TextPic;
