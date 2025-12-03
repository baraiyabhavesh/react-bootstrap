"use client";

/* eslint-disable react/no-children-prop */
import React from "react";
import DOMPurify from "dompurify";
import FancyBox from "../Core/FancyBox";
import Header from "@/sections/Headings";
import { useTranslations } from "next-intl";

const Textmedia = ({
  data,
  layoutType,
  elementType,
  spaceBefore,
  spaceAfter,
}) => {
  const { enlargeImageOnClick, gallery, bodytext } = data || {};
  const t = useTranslations();
  
  // Handle both array format (new API) and object format (old format)
  let galleryImages = [];
  let galleryPosition = {
    horizontal: "center",
    vertical: "above",
    noWrap: false,
  };
  let galleryBorder = { enabled: false };
  
  // Extract position from multiple possible locations
  let positionSource = null;
  if (gallery && typeof gallery === "object" && !Array.isArray(gallery) && gallery.position) {
    positionSource = gallery.position;
  } else if (data?.position && typeof data.position === "object") {
    positionSource = data.position;
  } else if (data?.gallery?.position && typeof data.gallery.position === "object") {
    positionSource = data.gallery.position;
  } else if (data?.pi_flexform_content?.position && typeof data.pi_flexform_content.position === "object") {
    positionSource = data.pi_flexform_content.position;
  }
  
  if (positionSource && typeof positionSource === "object") {
    galleryPosition = {
      horizontal: positionSource.horizontal || galleryPosition.horizontal,
      vertical: positionSource.vertical || galleryPosition.vertical,
      noWrap: positionSource.noWrap !== undefined ? positionSource.noWrap : galleryPosition.noWrap,
    };
  }
  
  // Extract images based on gallery structure
  if (gallery && typeof gallery === "object" && gallery.rows) {
    // Normalized format: gallery has rows/columns structure
    const rows = gallery.rows || { "1": { columns: {} } };
    if (rows["1"] && rows["1"].columns) {
      galleryImages = Object.values(rows["1"].columns);
    }
  } else if (Array.isArray(gallery) && gallery.length > 0) {
    // Raw array format: gallery is directly an array
    galleryImages = gallery;
  }
  
  const rows = gallery?.rows || { "1": { columns: {} } };
  const border = gallery?.border || galleryBorder;
  
  const mediaElement = (urlList, border) => {
    if (!urlList || !Array.isArray(urlList) || urlList.length === 0) {
      return null;
    }
    
    return urlList.map((item, index) => {
      if (!item) return null;
      
      const publicUrl = item?.publicUrl || item?.path || item?.url || "";
      const properties = item?.properties || item || {};
      
      if (!publicUrl || publicUrl.trim() === "" || publicUrl === "0") {
        return null;
      }
      
      // Determine media type from extension, mimeType, or type
      const extension = properties.extension || publicUrl.split('.').pop()?.toLowerCase() || "";
      const mimeType = properties.mimeType || "";
      const mediaType = properties.type || 
        (mimeType.includes("audio") || extension === "mp3" ? "audio" : 
         mimeType.includes("video") || extension === "mp4" ? "video" : "video");
      
      // Check if it's a YouTube/iframe URL
      const isIframe = publicUrl.includes("youtube") || publicUrl.includes("youtu.be") || 
                      publicUrl.includes("vimeo") || properties.type === "iframe";
      
      return (
        <React.Fragment key={publicUrl + index}>
          <div className="ce-row">
            <div className="ce-column">
              <figure className={mediaType} key={index}>
                <FancyBox
                  options={{
                    Carousel: {
                      infinite: false,
                    },
                  }}
                >
                  <div className={`${mediaType}-embed`}>
                    {mediaType === "audio" ? (
                      <audio className="audio-embed-item" controls>
                        <source src={publicUrl} type={mimeType || "audio/mpeg"} />
                      </audio>
                    ) : isIframe || (extension !== "mp4" && !mimeType.includes("video")) ? (
                      <iframe
                        src={publicUrl}
                        className={`${
                          border.enabled
                            ? "video-embed-item rounded"
                            : "video-embed-item"
                        }`}
                        height={properties.dimensions?.height || 113}
                        width={properties.dimensions?.width || 200}
                        allowFullScreen
                        allow="fullscreen"
                      />
                    ) : (
                      <video
                        width={properties.dimensions?.width || 2000}
                        className={`${
                          border.enabled
                            ? "video-embed-item rounded"
                            : "video-embed-item"
                        }`}
                        controls
                      >
                        <source src={publicUrl} type={mimeType || "video/mp4"} />
                      </video>
                    )}
                  </div>
                </FancyBox>
                {properties.description && (
                  <figcaption className="video-caption">
                    {properties.description}
                  </figcaption>
                )}
              </figure>
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  const renderVideoElement = (bodytext) => {
    // Use extracted position and images
    const safePosition = galleryPosition;
    const safeBorder = border;
    
    // Determine which images to use
    const imagesToRender = galleryImages.length > 0 ? galleryImages : 
      (gallery?.rows?.["1"]?.columns ? Object.values(gallery.rows["1"].columns) : []);
    
    return (
      <Header
        data={data}
        layoutType={layoutType}
        elementType={elementType}
        spaceAfter={spaceAfter}
        spaceBefore={spaceBefore}
      >
        <div
          className={`ce-textpic ${
            safePosition.horizontal && `ce-${safePosition.horizontal}`
          } ${safePosition.vertical && `ce-${safePosition.vertical}`} ${
            safePosition.noWrap ? `ce-nowrap` : ""
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
              {imagesToRender.length > 0 && (
                <div
                  className="ce-gallery"
                  data-ce-columns="1"
                  data-ce-images={imagesToRender.length}
                >
                  {mediaElement(imagesToRender, safeBorder)}
                </div>
              )}
            </>
          ) : (
            <>
              {imagesToRender.length > 0 && (
                <div
                  className="ce-gallery"
                  data-ce-columns="1"
                  data-ce-images={imagesToRender.length}
                >
                  {mediaElement(imagesToRender, safeBorder)}
                </div>
              )}
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
    <React.Fragment>{renderVideoElement(bodytext)}</React.Fragment>
  );
};
export default Textmedia;
