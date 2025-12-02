import renderComponent from "@/utils/RenderComponents";
import React from "react";

const OneColumns = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
  id,
}) => {
  // Validate items exist and is an array
  if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) {
    return null;
  }

  return (
    <section
      className={`content-section frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
      id={id}
    >
      {data.items
        .filter(item => item) // Filter out null/undefined items
        .map((item, index) => (
        <React.Fragment key={index}>{renderComponent(item)}</React.Fragment>
      ))}
    </section>
  );
};

export default OneColumns;
