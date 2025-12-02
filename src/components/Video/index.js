"use client";

import SafeLink from "@/components/Core/SafeLink";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ModalVideo from "./ModalVideo";
import Image from "next/image";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";

const Video = ({ data }) => {
  const [videoModal, setVideoModal] = useState(false);
  const [videoModalURL, setVideoModalURL] = useState();
  
  // Extract image from multiple possible locations
  let imageData = data?.image;
  if (!imageData && data?.pi_flexform_content?.image) {
    imageData = data.pi_flexform_content.image;
  } else if (!imageData && data?.content?.image) {
    imageData = data.content.image;
  } else if (!imageData && data?.content?.pi_flexform_content?.image) {
    imageData = data.content.pi_flexform_content.image;
  }
  
  // Handle container wrappers - recursively extract
  while (imageData?.container && typeof imageData.container === "object") {
    imageData = imageData.container.image || imageData.container;
  }
  
  // Extract media from multiple locations
  let media = data?.media;
  if (!media && data?.pi_flexform_content?.media) {
    media = data.pi_flexform_content.media;
  } else if (!media && data?.content?.media) {
    media = data.content.media;
  } else if (!media && data?.content?.pi_flexform_content?.media) {
    media = data.content.pi_flexform_content.media;
  }
  
  // Ensure media is an array
  if (media && !Array.isArray(media)) {
    media = [media];
  }
  
  const renderVideo = () => {
    return (
      <div className="video-modal">
        <Container>
          <div
            className={`video-modal__thumbnail ${
              data?.overlay === "1" ? "thumbnail-overlay" : ""
            }`}
          >
            {(() => {
              const imageUrl = getImageUrlFromData(imageData);
              // Only render image if we have a valid URL (not null, not empty)
              if (imageUrl && imageUrl.trim() !== "" && imageUrl !== "/placeholder.png") {
                return (
                  <Image
                    src={imageUrl}
                    alt="video-image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                );
              }
              return null;
            })()}
            {media && media.length > 0 && media[0] && (
              <SafeLink
                href={"#"}
                className="video-modal__button"
                onClick={(e) => {
                  e.preventDefault();
                  setVideoModal(!videoModal);
                  const firstMedia = media[0];
                  setVideoModalURL({
                    url: `${
                      firstMedia?.ext === "youtube"
                        ? `https://www.youtube.com/watch?v=${firstMedia?.videoContent}`
                        : firstMedia?.ext === "vimeo"
                        ? `https://vimeo.com/${firstMedia?.videoContent}`
                        : firstMedia?.path
                        ? `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${firstMedia.path}`
                        : firstMedia?.publicUrl || firstMedia?.url || "#"
                    }`,
                    autoplay: 1,
                  });
                }}
                aria-label="video"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  className="play-btn"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                </svg>
              </SafeLink>
            )}
          </div>
        </Container>
      </div>
    );
  };

  return (
    <>
      <section>
        {renderVideo()}
        {videoModal && (
          <ModalVideo
            videoModal={videoModal}
            setVideoModal={setVideoModal}
            videoModalURL={videoModalURL}
          />
        )}
      </section>
    </>
  );
};

export default Video;
