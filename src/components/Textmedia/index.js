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
  
  // Ensure gallery has default structure if missing
  const safeGallery = gallery || {};
  const position = safeGallery.position || {
    horizontal: "center",
    vertical: "above",
    noWrap: false,
  };
  const rows = safeGallery.rows || { "1": { columns: {} } };
  const border = safeGallery.border || { enabled: false };
  
  const mediaElement = (urlList, border) => {
    if (!urlList || !Array.isArray(urlList) || urlList.length === 0) {
      return null;
    }
    
    return urlList.map((item, index) => {
      if (!item || !item.publicUrl) return null;
      
      const { properties, publicUrl } = item;
      
      if (!publicUrl || publicUrl.trim() === "" || publicUrl === "0") {
        return null;
      }
      return (
        <React.Fragment key={publicUrl + index}>
          <div className="ce-row">
            <div className="ce-column">
              <figure className={properties.type} key={index}>
                <FancyBox
                  options={{
                    Carousel: {
                      infinite: false,
                    },
                  }}
                >
                  <div className={`${properties.type}-embed`}>
                    {properties.type === "audio" ? (
                      <audio className="audio-embed-item" controls>
                        <source src={publicUrl} type="audio/mpeg" />
                      </audio>
                    ) : properties.extension !== "mp4" ? (
                      <iframe
                        src={publicUrl}
                        className={`${
                          border.enabled
                            ? "video-embed-item rounded"
                            : "video-embed-item"
                        }`}
                        height={properties.dimensions.height}
                        width={properties.dimensions.width}
                        allowFullScreen
                        allow="fullscreen"
                      />
                    ) : (
                      <video
                        width={2000}
                        className={`${
                          border.enabled
                            ? "video-embed-item rounded"
                            : "video-embed-item"
                        }`}
                        controls
                      >
                        <source src={publicUrl} type="video/mp4" />
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

  const renderVideoElement = (galleryData, bodytext) => {
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
              {safeRows && Object.keys(safeRows).length > 0 && (
                <div
                  className="ce-gallery"
                  data-ce-columns="1"
                  data-ce-images="1"
                >
                  {Object.values(safeRows).map((row, index) => {
                    if (!row || !row.columns) return null;
                    return (
                      <React.Fragment key={index}>
                        {mediaElement(Object.values(row.columns), safeBorder)}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <>
              {safeRows && Object.keys(safeRows).length > 0 && (
                <div
                  className="ce-gallery"
                  data-ce-columns="1"
                  data-ce-images="1"
                >
                  {Object.values(safeRows).map((row, index) => {
                    if (!row || !row.columns) return null;
                    return (
                      <React.Fragment key={index}>
                        {mediaElement(Object.values(row.columns), safeBorder)}
                      </React.Fragment>
                    );
                  })}
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
    <React.Fragment>{renderVideoElement(gallery, bodytext)}</React.Fragment>
  );
};
export default Textmedia;
