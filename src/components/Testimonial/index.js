"use client";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-bootstrap";
import { normalizeContainerData, hasContainerWrappers } from "@/utils/normalizeContainerData";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";
import { safeStartsWith } from "@/utils/safeString";

const Testimonial = ({ data, spaceBefore, spaceAfter }) => {
  // Normalize slides data if container wrapper is present
  let normalizedSlides = data?.slides;
  if (normalizedSlides && hasContainerWrappers(normalizedSlides)) {
    normalizedSlides = normalizeContainerData(normalizedSlides, {
      normalizeImage: true,
    });
  }

  const slidesArray = Object.values(normalizedSlides || {});
  
  return (
    // <div className="content-section frame frame-space-after-medium">
    <section className="team-slider-section gray-bg">
      <Carousel
        className={`teamslider carousel slide ${
          spaceBefore && `frame-space-before-${spaceBefore}`
        } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
        id="teamslider-334"
        indicators={slidesArray.length > 1 ? true : false}
        controls={slidesArray.length > 1 ? true : false}
      >
        {slidesArray.map((item, index) => {
  // Get image URL using universal helper
  const imgUrl = getImageUrlFromData(item?.image || item?.gallery);

  return (
    <Carousel.Item key={index}>
      <div className="team-slide-content">
        {imgUrl && imgUrl !== "/placeholder.png" && imgUrl.trim() !== "" ? (
          <Image
            src={imgUrl}
            width={160}
            height={160}
            alt="team-slide-image"
          />
        ) : null}

        <blockquote>{item.quotes}</blockquote>
        <h4>{item.name}</h4>
        <p>{item.designation}</p>
      </div>
    </Carousel.Item>
  );
        })}
      </Carousel>
    </section>
    // </div>
  );
};

export default Testimonial;
