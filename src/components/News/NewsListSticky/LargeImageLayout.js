"use client";
import SafeLink from "@/components/Core/SafeLink";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Pagination from "../Pagination";
import getAPIData from "@/utils/API";
import Image from "next/image";

const LargeImageLayout = ({ data, pagination }) => {
  const [paginationLink, setPaginationLink] = useState();
  const [nsData, setNewsData] = useState(data || []);
  const [pgData, setpagination] = useState(pagination || {});
  useEffect(() => {
    async function getnews() {
      const newsData = await getAPIData(paginationLink);
      if (
        newsData &&
        newsData.data &&
        newsData.data.content &&
        newsData.data.content.colPos0 &&
        newsData.data.content.colPos0.length > 0 &&
        newsData.data.content.colPos0[0].content &&
        newsData.data.content.colPos0[0].content.data &&
        newsData.data.content.colPos0[0].content.data.list
      ) {
        setNewsData(newsData.data.content.colPos0[0].content.data.list);
      }
      if (
        newsData &&
        newsData.data &&
        newsData.data.content &&
        newsData.data.content.colPos0 &&
        newsData.data.content.colPos0.length > 0 &&
        newsData.data.content.colPos0[0].content &&
        newsData.data.content.colPos0[0].content.data &&
        newsData.data.content.colPos0[0].content.data.pagination
      ) {
        setpagination(newsData.data.content.colPos0[0].content.data.pagination);
      }
    }
    getnews();
  }, [paginationLink]);
  return (
    <div className="news">
      <Row>
        <Col>
          <div className="blog blog-layout">
            {nsData.map((item) => {
              const date = item.datetime.split(" ");
              return (
                <div className="blog-item article" key={item.uid}>
                  <SafeLink
                    href={item.slug}
                    title={item.title}
                    className="blog-image"
                  >
                    <Image
                      src={item.media[0].images.listViewFeaturedImage.publicUrl}
                      alt="Image thumb"
                      width={
                        item.media[0].images.listViewFeaturedImage.dimensions
                          .width
                      }
                      height={
                        item.media[0].images.listViewFeaturedImage.dimensions
                          .height
                      }
                    />
                  </SafeLink>
                  <div className="blog-content-wrap">
                    <div className="blog-date">
                      <span className="day">{date[1]}</span>
                      <span className="month">{date[0]}</span>
                    </div>
                    <div className="blog-content">
                      <h2>
                        <SafeLink href={item.slug} title={item.title}>
                          {item.title}
                        </SafeLink>
                      </h2>
                      <div>{item.teaser}</div>
                      <div className="blog-meta">
                        <div>
                          <span>
                            <SafeLink href={"#"}></SafeLink>
                          </span>
                        </div>
                        <SafeLink
                          className="btn"
                          title={item.title}
                          href={item.slug}
                        >
                          {item.moreLink}
                        </SafeLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination data={pgData} setPaginationLink={setPaginationLink} />
        </Col>
      </Row>
    </div>
  );
};

export default LargeImageLayout;
