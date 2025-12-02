"use client";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import GlobalContext from "@/context/GlobalContext";
import SafeLink from "@/components/Core/SafeLink";

const Breadcrumb = ({ currentPageBreadcrumbStyle, currentHeaderLayout }) => {
  const { breadcrumbs, themeSwitcher } = useContext(GlobalContext);
  return (
    <section
      className={`breadcrumb-section 
			${
        currentPageBreadcrumbStyle === "0"
          ? themeSwitcher?.breadcrumbStyle !== null &&
            (themeSwitcher?.breadcrumbStyle === "0"
              ? ""
              : themeSwitcher?.breadcrumbStyle === "1"
              ? "fancy"
              : themeSwitcher?.breadcrumbStyle === "2"
              ? "classic"
              : "")
          : currentPageBreadcrumbStyle !== null &&
            (currentPageBreadcrumbStyle === "0"
              ? ""
              : currentPageBreadcrumbStyle === "2"
              ? "fancy"
              : currentPageBreadcrumbStyle === "3"
              ? "classic"
              : "")
      }`}
    >
      <Container
        fluid={
          currentHeaderLayout === "4" || currentHeaderLayout === "5"
            ? true
            : false
        }
      >
        <ol className="breadcrumb">
          {breadcrumbs &&
            breadcrumbs.map(({ title, link, current }, index) => {
              return (
                <li
                  key={title + index}
                  className={`breadcrumb-item ${current === 1 ? "active" : ""}`}
                >
                  {current === 1 ? title : <SafeLink href={typeof link === "string" ? link : (link || "#")}>{title}</SafeLink>}
                </li>
              );
            })}
        </ol>
      </Container>
    </section>
  );
};
export default Breadcrumb;
