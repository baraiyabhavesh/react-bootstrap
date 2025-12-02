import Header from "@/sections/Headings";
import ListGroup from "@/sections/ListGroup";

const AbstractMenu = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  const { menu } = data;

  return (
    <div
      className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <Header
        data={data}
        layoutType={layoutType}
        elementType={elementType}
        spaceAfter={spaceAfter}
        spaceBefore={spaceBefore}
      >
        {menu && menu.length > 0 && <ListGroup menu={menu} />}
      </Header>
    </div>
  );
};
export default AbstractMenu;
