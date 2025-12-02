"use client";
/* eslint-disable react/no-children-prop */
import DOMPurify from "dompurify";
import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Headings";

const Text = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
  frameClass,
  id,
}) => {
  const renderHTML = () => {
    return (
      <div
        className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
          spaceBefore && `frame-space-before-${spaceBefore}`
        } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
        id={id}
      >
        {data.header || data.subheader ? <Header data={data}></Header> : ""}
        {data.bodytext && (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.bodytext),
            }}
            className={frameClass === "jumbotron" ? "" : frameClass}
          />
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      {frameClass === "jumbotron" ? (
        <Container>
          <div className="jumbotron">{renderHTML()}</div>
        </Container>
      ) : (
        renderHTML()
      )}
    </React.Fragment>
  );
};
export default Text;
