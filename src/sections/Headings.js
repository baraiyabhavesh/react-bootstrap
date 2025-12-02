"use client";
import SafeLink from "@/components/Core/SafeLink";
import { Container } from "react-bootstrap";

const HeadingType = ({ level, data, position, subheader, headerLink }) => {
  const CustomComponent = `${level === 0 ? "p" : `h${level}`}`;
  return (
    <>
      <CustomComponent
        className={`${position ? `ce-headline-${position}` : ""}`}
      >
        {data && headerLink ? (
          <SafeLink href={typeof headerLink.href === "string" ? headerLink.href : (headerLink.href || "#")} className="heading-with-link">
            {data}
          </SafeLink>
        ) : (
          data
        )}
      </CustomComponent>
      {subheader && (
        <h4 className={`${position ? `ce-headline-${position}` : ""}`}>
          {subheader}
        </h4>
      )}
    </>
  );
};

const Header = ({
  data,
  layoutType,
  elementType,
  spaceAfter,
  spaceBefore,
  children,
  sidebar,
}) => {
  {
    sidebar ? (
      <div
        className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
          spaceBefore && `frame-space-before-${spaceBefore}`
        } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
      >
        <header>
          <HeadingType
            level={data.headerLayout}
            data={data.header}
            position={data.headerPosition}
            subheader={data.subheader}
            headerLink={data.headerLink}
          />
        </header>
        {children}
      </div>
    ) : (
      <Container>
        <div
          className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
            spaceBefore && `frame-space-before-${spaceBefore}`
          } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
        >
          <header>
            <HeadingType
              level={data.headerLayout}
              data={data.header}
              position={data.headerPosition}
              subheader={data.subheader}
              headerLink={data.headerLink}
            />
          </header>
          {children}
        </div>
      </Container>
    );
  }
  return (
    <>
      {sidebar ? (
        <div
          className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
            spaceBefore && `frame-space-before-${spaceBefore}`
          } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
        >
          <header>
            <HeadingType
              level={data.headerLayout}
              data={data.header}
              position={data.headerPosition}
              subheader={data.subheader}
              headerLink={data.headerLink}
            />
          </header>
          {children}
        </div>
      ) : (
        <Container>
          <div
            className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
              spaceBefore && `frame-space-before-${spaceBefore}`
            } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
          >
            <header>
              <HeadingType
                level={data.headerLayout}
                data={data.header}
                position={data.headerPosition}
                subheader={data.subheader}
                headerLink={data.headerLink}
              />
            </header>
            {children}
          </div>
        </Container>
      )}
    </>
  );
};
export default Header;
