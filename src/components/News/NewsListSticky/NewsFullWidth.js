import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FancyBox from "@/components/Core/FancyBox";
import Image from "next/image";

const NewsFullWidth = ({ data, settings }) => {
  const titalMaxCharacters = 24;
  return (
    <div className="container-fluid">
      <div className="news news-grid-layout">
        <Row className="px-3 news-grid">
          {data.map((item) => {
            const formattedDate = new Date(item.datetime).toLocaleDateString(
              "en-GB"
            );
            return (
              <Col
                sm={6}
                md={4}
                lg={3}
                className="col-xl-1-5 article"
                key={item.uid}
              >
                <div className="news-item">
                  <div className="news-title">
                    <h4>
                      <SafeLink href={item.slug}>
                        {item.title
                          .substring(0, titalMaxCharacters)
                          .split(" ")
                          .slice(0, -1)
                          .join(" ") + "..."}
                      </SafeLink>
                    </h4>
                    <span className="news-date">
                      <time dateTime={item.datetime}>{formattedDate}</time>
                    </span>
                    {item.firstCategory && (
                      <span className="news-category">
                        {item.firstCategory}
                      </span>
                    )}
                  </div>
                  <div className="news-img-wrap">
                    <FancyBox
                      options={{
                        Carousel: {
                          infinite: false,
                        },
                      }}
                    >
                      <SafeLink
                        href={
                          item.media[0].images.listViewFeaturedImage.publicUrl
                        }
                        data-fancybox="gallery"
                      >
                        <Image
                          src={
                            item.media[0].images.listViewFeaturedImage.publicUrl
                          }
                          alt="news image"
                          width={
                            item.media[0].images.listViewFeaturedImage
                              .dimensions.width
                          }
                          height={
                            item.media[0].images.listViewFeaturedImage
                              .dimensions.height
                          }
                        />
                      </SafeLink>
                    </FancyBox>
                  </div>
                  <div className="news-text">
                    <div>
                      <div className="description">
                        {item.teaser
                          ? item.teaser
                              .substring(0, settings.cropMaxCharacters)
                              .split(" ")
                              .slice(0, -1)
                              .join(" ") + "..."
                          : item.bodytext
                              .substring(0, settings.cropMaxCharacters)
                              .split(" ")
                              .slice(0, -1)
                              .join(" ") + "..."}
                      </div>
                      <SafeLink href={item.slug}>{item.moreLink}</SafeLink>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default NewsFullWidth;
