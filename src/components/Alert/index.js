"use client";
import React from "react";
import { Alert } from "react-bootstrap";
import * as FontAwesome from "react-icons/fa6";

const AlertComponents = ({
  data,
  layoutType,
  elementType,
  spaceBefore,
  spaceAfter,
}) => {
  function IconComponent({ iconName }) {
    const Icon = FontAwesome[iconName];
    return Icon ? <Icon /> : null;
  }
  return (
    <div
      className={`content-section frame frame-${layoutType} frame-type-${elementType} frame-layout-0  ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      {data.variance === "default" ? (
        <Alert
          variant={data.color}
          className={`alert-dismissible d-flex align-items-center`}
        >
          {data.icon ? (
            <IconComponent iconName={data?.icon} className="cards-icon__fa" />
          ) : null}
          {data.description}
        </Alert>
      ) : (
        <Alert variant={data.color}>
          <Alert.Heading>{data.title}</Alert.Heading>
          <p>{data.description}</p>
          <hr />
          <p className="mb-0">{data.text}</p>
        </Alert>
      )}
    </div>
  );
};

export default AlertComponents;
