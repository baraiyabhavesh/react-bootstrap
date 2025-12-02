"use client";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa6";

const Link = dynamic(() => import("react-scroll").then((re) => re.Link), {
  ssr: false,
});

const ScrollspyComponent = ({ data, spaceAfter, spaceBefore, layoutType }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(true);
  const widthRef = useRef();
  const childRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  
  // Extract scrollspy from multiple possible locations
  let scrollspy = data?.scrollspy;
  if (!scrollspy && data?.pi_flexform_content?.scrollspy) {
    scrollspy = data.pi_flexform_content.scrollspy;
  }
  
  // Normalize scrollspy - handle container wrappers
  const normalizedScrollspy = scrollspy ? Object.values(scrollspy).map(item => {
    if (!item || typeof item !== "object") return null;
    
    // If item has container, extract container data
    if (item.container && typeof item.container === "object") {
      const { container, ...itemWithoutContainer } = item;
      return {
        ...itemWithoutContainer,
        ...container,
      };
    }
    
    return item;
  }).filter(Boolean) : [];
  
  // Safe access to DOM elements (only in browser)
  let client = null;
  let top = null;
  if (typeof document !== "undefined") {
    const containers = document.getElementsByClassName("container");
    client = containers && containers.length > 0 ? containers[0] : null;
    const stickyHeaders = document.getElementsByClassName("sticky-header");
    top = stickyHeaders && stickyHeaders.length > 0 ? stickyHeaders[0] : null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (widthRef.current || client?.clientWidth) {
        const width = widthRef.current?.offsetWidth;
        setElementWidth(width);
      }
    };

    const handleMobileMenu = () => {
      if (window.innerWidth <= 992) {
        // Adjust the screen width breakpoint as needed
        setIsMobileScreen(true);
        setIsOpen(false);
      } else {
        setIsMobileScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    handleMobileMenu();
    window.addEventListener("resize", handleMobileMenu);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleMobileMenu);
    };
  }, []);

  // Validate we have scrollspy data - moved after hooks
  if (!normalizedScrollspy || normalizedScrollspy.length === 0) {
    return null;
  }


  const handleSetActive = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div
      className={`scrollspy-sections frame frame-${layoutType} frame-layout-0 ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <Container>
        <div
          className="scrollspy-sections__tabs"
          style={{ top: `${top?.clientHeight}px` }}
        >
          <nav>
            {!isMobileScreen && (
              <ul>
                {normalizedScrollspy
                  .filter(item => item && item.heading)
                  .map((item, index) => {
                  const heading = item.heading || item.title || item.name || "";
                  const sectionId = heading ? `${heading}${index}` : `section${index}`;
                  
                  return (
                    <li
                      key={index}
                      className={`${
                        index === activeIndex ? "active-section" : ""
                      }`}
                      ref={widthRef}
                    >
                      <Link
                        to={sectionId}
                        activeClass="active"
                        spy={true}
                        smooth={true}
                        ref={childRef}
                        delay={0}
                        duration={0}
                        offset={-85}
                        onSetActive={() => {
                          handleSetActive(index);
                        }}
                      >
                        <span>{heading}</span>
                      </Link>
                    </li>
                  );
                })}
                <span
                  className="nav-indicator"
                  style={{ width: `${elementWidth}px` }}
                />
              </ul>
            )}
            {isMobileScreen && (
              <ul className={`menu ${isOpen ? "open" : ""}`}>
                <li className="dropdown-toggle" onClick={toggleMenu}>
                  Menu
                  <FaAngleDown />
                </li>
                {isOpen &&
                  normalizedScrollspy
                    .filter(item => item && item.heading)
                    .map((item, index) => {
                    const heading = item.heading || item.title || item.name || "";
                    const sectionId = heading ? `${heading}${index}` : `section${index}`;
                    
                    return (
                      <li
                        key={index}
                        className={`${
                          index === activeIndex ? "active-section" : ""
                        }`}
                        ref={widthRef}
                      >
                        <Link
                          to={sectionId}
                          activeClass="active"
                          spy={true}
                          smooth={true}
                          ref={childRef}
                          delay={0}
                          duration={0}
                          offset={-300}
                          onSetActive={() => {
                            handleSetActive(index);
                          }}
                          onClick={toggleMenu}
                        >
                          <span>{heading}</span>
                        </Link>
                      </li>
                    );
                  })}
                <span className="nav-indicator" style={{ width: `${0}px` }} />
              </ul>
            )}
          </nav>
        </div>
        {normalizedScrollspy
          .filter(item => item && (item.heading || item.rte))
          .map((value, index) => {
          const heading = value.heading || value.title || value.name || "";
          const sectionId = heading ? `${heading}${index}` : `section${index}`;
          const rte = value.rte || value.content || value.text || "";
          
          return (
            <section id={sectionId} key={index}>
              <div
                className="scrollspy-sections__content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(rte),
                }}
              />
            </section>
          );
        })}
      </Container>
    </div>
  );
};

export default ScrollspyComponent;
