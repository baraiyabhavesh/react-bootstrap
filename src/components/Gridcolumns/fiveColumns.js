'use client'
/* eslint-disable react/no-children-prop */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import renderComponent from "@/utils/RenderComponents";

const FiveColumns = ({ data, layoutType, elementType, spaceAfter, spaceBefore, id }) => {
  // Validate items exist and is an array
  if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) {
    return null;
  }

  return (
    <>
      <Row className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0`} id={id}>
        {data.items
          .filter(item => item && item.config) // Filter out null/undefined items or items without config
          .sort((a, b) => a.config.colPos - b.config.colPos)
          .map((item, index) => {
          return (
            <Col md={2} key={index}>
              {renderComponent(item)}
            </Col>
          )
        })}
      </Row>
    </>
  );
};

export default FiveColumns;
