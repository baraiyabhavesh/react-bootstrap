"use client";

import SafeLink from "@/components/Core/SafeLink";
import Header from "@/sections/Headings";

const MenuSections = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  const { menu } = data;
  return (
    <Header
      data={data}
      layoutType={layoutType}
      elementType={elementType}
      spaceAfter={spaceAfter}
      spaceBefore={spaceBefore}
    >
      {menu && menu.length > 0 && (
        <ul>
          {menu.map(({ title, link, content }, index) => {
            return (
              <li key={title + index}>
                <SafeLink href={typeof link === "string" ? link : (link || "#")}>
                  <span>{title}</span>
                </SafeLink>
                {content && (
                  <ul>
                    {content.map(({ header }, index) => {
                      return (
                        <li key={index}>
                          <SafeLink href={typeof link === "string" ? link : (link || "#")}>{header}</SafeLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Header>
  );
};
export default MenuSections;
