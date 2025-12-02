"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const LatestNews = dynamic(() => import("./LatestNews"), {
  ssr: false,
});
const NewsMasonryLayout = dynamic(
  () => import("../NewsListSticky/NewsMasonryLayout"),
  {
    ssr: false,
  }
);

const NewsPi = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
  const list = data.data.list;
  const settings = data.data.settings;
  const orderBy = data.data.settings.orderBy;
  const sort = data.data.settings.orderDirection;
  const [sortDirection, setSortDirection] = useState(sort);
  const [sortData, setSortData] = useState(list);

  useEffect(() => {
    handleSort();
  }, [list]);
  const handleSort = () => {
    const sortedData = [...list];
    sortedData.sort((a, b) => {
      return sortDirection === "asc"
        ? a[orderBy] - b[orderBy]
        : a[orderBy] - b[orderBy];
    });
    setSortData(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  switch (settings.templateLayout) {
    case "7":
      return (
        <div
          className={`frame frame-${layoutType} frame-type-list frame-layout-0 ${
            spaceBefore && `frame-space-before-${spaceBefore}`
          } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
        >
          <LatestNews data={data} />
        </div>
      );
    case "10":
      return (
        <Container>
          <div
            className={`frame frame-${layoutType} frame-type-list frame-layout-0 ${
              spaceBefore && `frame-space-before-${spaceBefore}`
            } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
          >
            <header>
              <h2>{data?.header}</h2>
            </header>
            <NewsMasonryLayout data={sortData} settings={settings} />
          </div>
        </Container>
      );
    default:
      return null;
  }
};

export default NewsPi;
