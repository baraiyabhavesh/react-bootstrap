"use client";
import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ data, setPaginationLink }) => {
  const handlePagination = async (e, link) => {
    e.preventDefault();
    setPaginationLink(link);
  };
  return (
    <ul className="pagination">
      {data.prev !== null && (
        <li className="page-item">
          <SafeLink
            href={"#"}
            scroll={false}
            onClick={(e) => handlePagination(e, data.prev)}
          >
            <FaAngleLeft />
          </SafeLink>
        </li>
      )}
      {data.pages.map((page) => {
        return (
          <li
            className={`page-item ${page.current === 1 ? "active" : ""}`}
            key={page.page}
          >
            <SafeLink
              href={"#"}
              scroll={false}
              onClick={(e) => handlePagination(e, page.link)}
            >
              {page.page}
            </SafeLink>
          </li>
        );
      })}
      {data.next !== null && (
        <li className="page-item">
          <SafeLink
            href={"#"}
            scroll={false}
            onClick={(e) => handlePagination(e, data.next)}
          >
            <FaAngleRight />
          </SafeLink>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
