"use client";
import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FancyBox from "../Core/FancyBox";

const Gallery = ({ data, spaceAfter }) => {
  // Extract image from multiple possible locations
  let images = data?.image;
  if (!images && data?.pi_flexform_content?.image) {
    images = data.pi_flexform_content.image;
  }
  
  // Ensure images is an array
  if (!images) {
    images = [];
  } else if (!Array.isArray(images)) {
    // If it's a single object, convert to array
    images = [images];
  }
  
  // Extract headline from multiple locations
  const headline = data?.headline || data?.pi_flexform_content?.headline || "";
  
  // Validate we have images to render
  if (!images || images.length === 0) {
    return null;
  }
  
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
            {images
              .filter(item => item && (item.path || item.publicUrl || item.url))
              .map((item, index) => {
              const imagePath = item.path || item.publicUrl || item.url || "";
              const imageUrl = imagePath.startsWith("http") 
                ? imagePath 
                : `${process.env.NEXT_PUBLIC_API_URL}/fileadmin/${imagePath.replace(/^\/+/, "")}`;
              
              return (
                <Col
                  sm={6}
                  md={4}
                  key={index}
                  className={`${data?.imagePerRow ? `${data.imagePerRow}` : ""}`}
                >
                  {data?.imagePerRow ? (
                    <>
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
                    </>
                  ) : (
                    <>
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
                            className="img-fluid"
                          />
                        </SafeLink>
                      </figure>
                    </>
                  )}
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
