"use client";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import DOMPurify from "dompurify";
import { normalizeContainerData, hasContainerWrappers } from "@/utils/normalizeContainerData";

const AccordionStyleTwo = ({ content, spaceAfter }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    content.alwaysOpen === "1" ? setActiveIndex(0) : "";
  }, []);
  const CustomComponent = `${content.headerSize}`;
  return (
    <div
      className={`content-section frame ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }`}
    >
      <div className="accordion custom-accordion faq-accordion">
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
                  <span>
                    {activeIndex === index ? (
                      <FaMinus className="fa-var-plus" />
                    ) : (
                      <FaPlus className="fa-var-minus" />
                    )}
                  </span>
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

export default AccordionStyleTwo;
