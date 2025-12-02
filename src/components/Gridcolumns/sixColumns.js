"use client";
/* eslint-disable react/no-children-prop */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import renderComponent from "@/utils/RenderComponents";

const SixColumns = ({
  data,
  layoutType,
  elementType,
  spaceAfter,
  spaceBefore,
}) => {
  // Validate items exist and is an array
  if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) {
    return null;
  }

  return (
    <>
      <Row
        className={`frame frame-${layoutType} frame-type-${elementType} ${
          spaceBefore && `frame-space-before-${spaceBefore}`
        } ${spaceAfter && `frame-space-after-${spaceAfter}`} frame-layout-0`}
      >
        {data.items
          .filter(item => item && item.config) // Filter out null/undefined items or items without config
          .sort((a, b) => a.config.colPos - b.config.colPos)
          .map((item, index) => {
            return (
              <Col md={2} sm={6} key={index}>
                {renderComponent(item)}
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default SixColumns;
