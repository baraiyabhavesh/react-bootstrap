"use client";
/* eslint-disable react/no-children-prop */
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import DOMPurify from "dompurify";
import { normalizeContainerData, hasContainerWrappers } from "@/utils/normalizeContainerData";

const TabComponent = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  return (
    <div
      className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <div
        className={`tab-wrap ${
          data.vertical === "1" ? "d-flex align-items-start" : ""
        }`}
      >
        <Tabs
          variant={`${data.pills === "1" ? "pills" : "tabs"}`}
          className={`${
            data.vertical === "1" ? "flex-column me-3 text-nowrap mt-4" : ""
          }`}
        >
          {Object.values(
            (() => {
              const accordions = data.accordions || {};
              if (typeof accordions !== "object" || Array.isArray(accordions)) {
                return accordions;
              }
              return hasContainerWrappers(accordions)
                ? normalizeContainerData(accordions)
                : accordions;
            })()
          )
            .filter(item => item && (item.question || item.answer)) // Only render items with question or answer
            .map((item, index) => {
            if (!item || (!item.question && !item.answer)) return null;
            return (
              <Tab
                eventKey={`${item.question || `tab-${index}`}-${index}`}
                title={item.question || ""}
                key={index}
              >
                {item.answer ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.answer),
                    }}
                  />
                ) : null}
              </Tab>
            );
          }).filter(Boolean)}
        </Tabs>
      </div>
    </div>
  );
};
export default TabComponent;
