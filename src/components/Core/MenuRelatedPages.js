"use client";

import Header from "@/sections/Headings";
import ListGroup from "@/sections/ListGroup";

const MenuRelatedPages = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  const { menu } = data;

  return (
    <>
      <Header
        data={data}
        layoutType={layoutType}
        elementType={elementType}
        spaceAfter={spaceAfter}
        spaceBefore={spaceBefore}
      >
        {menu && menu.length > 0 && <ListGroup menu={menu} />}
      </Header>
    </>
  );
};
export default MenuRelatedPages;
