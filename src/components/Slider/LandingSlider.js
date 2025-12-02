"use client";
/* eslint-disable react/no-children-prop */
import { Carousel } from "react-bootstrap";
import DOMPurify from "dompurify";
import SafeLink from "@/components/Core/SafeLink";
import Image from "next/image";
import { normalizeContainerData, hasContainerWrappers } from "@/utils/normalizeContainerData";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";
import { safeStartsWith } from "@/utils/safeString";

const LandingSlider = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  function youTubeVideoId(url) {
    let regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    let match = url?.match(regExp);
    if (match && match[1].length === 11) {
      return match[1];
    } else {
      // Handle invalid YouTube URL
      return null;
    }
  }

  let normalizedSlides = data?.slides;
  if (!normalizedSlides && data?.pi_flexform_content?.slides) {
    normalizedSlides = data.pi_flexform_content.slides;
  }
  
  if (normalizedSlides && hasContainerWrappers(normalizedSlides)) {
    normalizedSlides = normalizeContainerData(normalizedSlides, {
      normalizeImage: true,
      normalizeLink: true,
    });
  }

  let slider = Object.values(normalizedSlides || {});
  
  return (
    <section
      className={`landing-section frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      {data && normalizedSlides && (
        <Carousel
          className="landingslider slider-overlay"
          controls={
            data.sliderNav === "0" || slider.length === 1 ? false : true
          }
          indicators={
            data.sliderDots === "0" || slider.length === 1 ? false : true
          }
          variant={data.SlidedarkVariant === "1" ? "dark" : ""}
          fade={data.fadeEffect === "1" ? true : false}
          touch={data.SlideTouch === "1" ? true : false}
          interval={null}
        >
          {Object.values(normalizedSlides).map((item, index) => {
            let videoId = youTubeVideoId(item?.youtubeUrl);
            return (
              <Carousel.Item
                className={`${
                  data.sliderOverlay === "1" ? "landingslider__overlay" : ""
                }`}
                key={index}
                style={{
                  backgroundImage: `${
                    item.mediatype === "img" && item?.image
                      ? (() => {
                          const imageUrl = getImageUrlFromData(item.image);
                          return imageUrl ? `url(${imageUrl})` : "none";
                        })()
                      : "none"
                  }`,
                }}
              >
                {item.mediatype === "vimeo" ||
                item.mediatype === "youtube" ||
                item.mediatype === "localvideo" ? (
                  <>
                    {item.mediatype === "youtube" ? (
                      <iframe
                        allow="autoplay;fullscreen"
                        className="w-100 h-100 position-absolute top-0"
                        allowfullscreen
                        frameborder="0"
                        src={`${item?.youtubeUrl}&autoplay=1&mute=1&showinfo=0&controls=0&loop=1&playlist=${videoId}`}
                      />
                    ) : item.mediatype === "vimeo" ? (
                      <iframe
                        allow="autoplay; fullscreen; picture-in-picture"
                        className="w-100 h-100 position-absolute top-0"
                        frameborder="0"
                        allowfullscreen
                        src={`${item.vimeoUrl}&autoplay=1&muted=1&controls=0`}
                      />
                    ) : (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="landingslider__video"
                      >
                        <source
                          src={`${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "")}${safeStartsWith(item.localvideo, "/") ? "" : "/"}${item.localvideo || ""}`}
                          type="video/mp4"
                        />
                      </video>
                    )}
                  </>
                ) : null}
                <Carousel.Caption className="carousel-slide-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.titletext),
                    }}
                  />
                  <p>{item.subText}</p>
                  {item.buttonlabel && item.buttonlink && (
                    <SafeLink
                      href={item.buttonlink || "#"}
                      className={`btn ${!item.buttonlink || item.buttonlink === "" ? "disabled" : ""}`}
                    >
                      {item.buttonlabel}
                    </SafeLink>
                  )}
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </section>
  );
};
export default LandingSlider;
