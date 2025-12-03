"use client";
import SafeLink from "@/components/Core/SafeLink";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NewsDateMenu = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  // Extract list from multiple possible locations (same pattern as other news components)
  const list = data?.data?.list || data?.list || [];
  const [newsDataItem, setNewsDataItem] = useState(3);

  const monthlyData = {};
  
  // Ensure list is an array before calling forEach
  if (Array.isArray(list) && list.length > 0) {
    list.forEach((item) => {
      if (!item) return;
      
      // Try multiple possible datetime property names
      const datetime = item.datetime || item.date || item.publishDate || item.createdAt;
      if (!datetime) return;
      
      try {
        const dateObj = new Date(datetime);
        // Check if date is valid
        if (isNaN(dateObj.getTime())) return;
        
        const month = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        });

        if (!monthlyData[month]) {
          monthlyData[month] = [];
        }

        monthlyData[month].push(item);
      } catch (e) {
        // Skip items with invalid datetime
        return;
      }
    });
  }

  let totalNews = Object.keys(monthlyData).length;
  
  // If no data to display, return early
  if (totalNews === 0) {
    return null;
  }
  
  return (
    <Container>
      <div
        className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
          spaceBefore && `frame-space-before-${spaceBefore}`
        } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
      >
        <header>
          <h2>{data?.header || ""}</h2>
        </header>

        <div className="news">
          <div className="timeline-container">
            {Object.entries(monthlyData)
              .slice(0, newsDataItem)
              .map(([month, items], index) => {
                let count = 0;
                return (
                  <div className="timeline-wrap" id="pressload" key={index}>
                    <div className="timeline-date timeline-date-display">
                      <h5>{month}</h5>
                    </div>
                    <div className="news">
                      {items.map((item, itemIndex) => {
                        count++;
                        // Try multiple possible datetime property names
                        const datetime = item.datetime || item.date || item.publishDate || item.createdAt;
                        let formattedDate = "";
                        try {
                          if (datetime) {
                            formattedDate = new Date(datetime).toLocaleDateString("en-GB");
                          }
                        } catch (e) {
                          formattedDate = "";
                        }
                        return (
                          <div
                            className={`timeline-block articletype-0 ${
                              count % 2 === 0 ? "right-block" : "left-block"
                            }`}
                            key={itemIndex}
                          >
                            <div className="timeline-arrow"></div>
                            <div className="timeline-block-inner">
                              {item.media && item.media.length > 0 && (
                                <SafeLink href={item.slug} title={item.title}>
                                  <LazyLoadImage
                                    effect="opacity"
                                    src={
                                      item.media[0]?.images
                                        ?.listViewFeaturedImage?.publicUrl
                                    }
                                    alt="Image thumb"
                                  />
                                </SafeLink>
                              )}
                              <div className="blog-meta">
                                <span className="time-detail">
                                  {formattedDate}
                                </span>
                              </div>
                              <div className="news-title">
                                <h4>
                                  <SafeLink href={item.slug} title={item.title}>
                                    {item.title}
                                  </SafeLink>
                                </h4>
                              </div>
                              <div className="news-text">{item.teaser}</div>
                              <div className="more-link">
                                <SafeLink href={item.slug}>{item.moreLink}</SafeLink>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            <SafeLink
              href={"#"}
              scroll={false}
              className={`${
                newsDataItem >= totalNews ? "d-none" : "d-block"
              } timeline-date btn btn-secondary`}
              onClick={() => {
                const newBlocksToShow =
                  newsDataItem + 3 <= totalNews
                    ? newsDataItem + 3
                    : totalNews;
                setNewsDataItem(newBlocksToShow);
              }}
            >
              Load More...
            </SafeLink>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewsDateMenu;
