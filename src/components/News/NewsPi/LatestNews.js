import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LatestNews = ({ data }) => {
  const list = data.data.list;
  return (
    <div className="news">
      <div className="sidebar-tabs-wrap">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <SafeLink href={"#"} className="nav-link active">
              {data.header}
            </SafeLink>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="popular">
            <ul className="simple-post-list">
              {list.map((item) => {
                return (
                  <li itemScope="itemscope" key={item.uid}>
                    {item &&
                      item.media &&
                      item.media.length > 0 &&
                      item.media[0].images && (
                        <div className="post-image">
                          <SafeLink
                            className="blog-image"
                            title={item.title}
                            href={item.slug}
                          >
                            <LazyLoadImage
                              effect="opacity"
                              src={
                                item.media[0].images.listViewFeaturedImage
                                  .publicUrl
                              }
                              alt="Image thumb"
                              width={70}
                              height={60}
                              style={{ objectFit: "cover", height: "100%" }}
                            />
                          </SafeLink>
                        </div>
                      )}

                    <div className="post-info">
                      <SafeLink href={item.slug} title={item.title}>
                        {item.title}
                      </SafeLink>
                      <div className="post-meta">{item.datetime}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
