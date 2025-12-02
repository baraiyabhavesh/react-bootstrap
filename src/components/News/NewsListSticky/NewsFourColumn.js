import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FancyBox from "@/components/Core/FancyBox";

const NewsFourColumn = ({ data, settings }) => {
  const titalMaxCharacters = 20;
  return (
    <div className="news">
      <div className="news news-grid-layout">
        <Row className="news-grid">
          {data.map((item) => {
            const formattedDate = new Date(item.datetime).toLocaleDateString(
              "en-GB"
            );
            return (
              <Col mb={4} lg={3} key={item.uid}>
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
                        href={item.media[0].images.defaultImage.publicUrl}
                        data-fancybox="gallery"
                      >
                        <LazyLoadImage
                          src={
                            item.media[0].images.listViewFeaturedImage.publicUrl
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

export default NewsFourColumn;
