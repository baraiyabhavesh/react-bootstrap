import Image from "next/image";
import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const NewsMasonryLayout = ({ data, settings }) => {
  return (
    <div className="news">
      <div className="news news-masonry-layout">
        <ResponsiveMasonry
          className="news-masonry d-flex"
          columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 3 }}
        >
          <Masonry className="news-item" style={{ gap: "30px" }}>
            {data.map((item) => {
              const formattedDate = new Date(item.datetime).toLocaleDateString(
                "en-GB"
              );
              return (
                <div key={item.uid} style={{ paddingBottom: "25px" }}>
                  {item &&
                    item.media &&
                    item.media.length > 0 &&
                    item.media[0].images && (
                      <SafeLink href={item.slug} title={item.title}>
                        <Image
                          effect="opacity"
                          src={
                            item.media[0].images.listViewFeaturedImage.publicUrl
                          }
                          alt="Image thumb"
                          width={
                            item.media[0].images.listViewFeaturedImage
                              .dimensions.width
                          }
                          height={
                            item.media[0].images.listViewFeaturedImage
                              .dimensions.height
                          }
                          className="img-fluid"
                        />
                      </SafeLink>
                    )}
                  <div className="news-img-wrap"></div>
                  <div className="news-title">
                    <span className="news-date">
                      <time dateTime={item.datetime}>{formattedDate}</time>
                    </span>
                    {item.firstCategory && (
                      <span className="news-category">
                        {item.firstCategory}
                      </span>
                    )}
                    <h4>
                      <SafeLink href={item.slug} title={item.title}>
                        {item.title}
                      </SafeLink>
                    </h4>
                  </div>
                  <div className="news-text">
                    <div>
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
                  </div>
                  <SafeLink href={item.slug} title={item.title}>
                    {item.moreLink}
                  </SafeLink>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default NewsMasonryLayout;
