"use client";
import SafeLink from "@/components/Core/SafeLink";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Pagination from "../Pagination";
import getAPIData from "@/utils/API";
import Image from "next/image";

const MediumImageLayout = ({ data, pagination }) => {
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
      <div className="blog blog-medium-image">
        {nsData.map((item) => {
          return (
            <article className="blog-item articletype-0" key={item.uid}>
              <Row>
                <Col lg={5}>
                  <SafeLink
                    href={item.slug}
                    title={item.title}
                    className="blog-image"
                  >
                    <Image
                      src={item.media[0].images.listViewFeaturedImage.publicUrl}
                      alt="Image thumb"
                      width={370}
                      height={270}
                      className="img-fluid"
                    />
                  </SafeLink>
                </Col>
                <Col lg={7}>
                  <div className="blog-content">
                    <h2>
                      <SafeLink href={item.slug} title={item.title}>
                        {item.title}
                      </SafeLink>
                    </h2>
                    {item.teaser}
                  </div>
                  <div className="blog-meta">
                    <div>
                      {item.firstCategory && (
                        <span>
                          <SafeLink href={"#"}>{item.firstCategory}</SafeLink>
                        </span>
                      )}
                    </div>
                    <SafeLink href={item.slug} title={item.title} className="btn">
                      {item.moreLink}
                    </SafeLink>
                  </div>
                </Col>
              </Row>
            </article>
          );
        })}
        <Pagination data={pgData} setPaginationLink={setPaginationLink} />
      </div>
    </div>
  );
};

export default MediumImageLayout;
