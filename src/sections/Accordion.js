"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Container } from "react-bootstrap";
const AccordionStyleOne = dynamic(
  () => import("@/components/Accordion/AccordionStyleOne"),
  {
    ssr: false,
  }
);
const AccordionStyleTwo = dynamic(
  () => import("@/components/Accordion/AccordionStyleTwo"),
  {
    ssr: false,
  }
);
const AccordinStyleThree = dynamic(
  () => import("@/components/Accordion/AccordionStyleThree"),
  {
    ssr: false,
  }
);
const Accordion = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  const renderAccordian = (data) => {
    switch (data.variation) {
      case "0": {
        return (
          <AccordionStyleOne
            key={data.id}
            content={data}
            spaceBefore={spaceBefore}
            spaceAfter={spaceAfter}
            layoutType={layoutType}
            elementType={elementType}
          />
        );
      }
      case "1": {
        return (
          <AccordionStyleTwo
            key={data.id}
            content={data}
            spaceBefore={spaceBefore}
            spaceAfter={spaceAfter}
            layoutType={layoutType}
            elementType={elementType}
          />
        );
      }
      case "2": {
        return (
          <AccordinStyleThree
            key={data.id}
            content={data}
            spaceBefore={spaceBefore}
            spaceAfter={spaceAfter}
            layoutType={layoutType}
            elementType={elementType}
          />
        );
      }

      default:
        return null;
    }
  };
  return <Container>{renderAccordian(data)}</Container>;
};

export default Accordion;
