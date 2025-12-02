"use client";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { normalizeContainerData, hasContainerWrappers } from "@/utils/normalizeContainerData";

const AccordionStyleOne = ({
  content,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const CustomComponent = `${content.headerSize}`;
  useEffect(() => {
    content.alwaysOpen === "1" ? setActiveIndex(0) : "";
  }, []);
  return (
    <div
      className={`content-section frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      }`}
    >
      <div className="accordion custom-accordion">
        {Object.values(
          (() => {
            const accordions = content.accordions || {};
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
            <div className="card" key={index}>
              <div
                className={`card-header ${
                  activeIndex === index ? "collapsed" : ""
                }`}
                onClick={() => onItemClick(index)}
              >
                <CustomComponent className="mb-0">
                  {item.question || ""}
                </CustomComponent>
              </div>
              <div
                className={`collapse ${activeIndex === index ? "show" : ""}`}
              >
                <div className="card-body">
                  {item.answer ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.answer),
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          );
        }).filter(Boolean)}
      </div>
    </div>
  );
};

export default AccordionStyleOne;
