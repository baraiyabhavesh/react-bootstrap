"use client";
import GlobalContext from "@/context/GlobalContext";
import SafeLink from "@/components/Core/SafeLink";
import React, { useContext, useState, useMemo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import languages from "@/utils/languageConstant";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { i18n } from "../../../i18n-config";
import Logo from "../Logo";

const Header = ({ lang, currentPageHeaderLayout, websiteType }) => {
  const router = useRouter();
  let totalLanguages = [];
  const [toggleSearchForm, setToggleSearchForm] = useState(false);
  const [openCanvasMenu, setOpenCanvasMenu] = useState(false);
  const [activeSubMenus, setActiveSubMenus] = useState("");
  const [activeInnerMenus, setActiveInnerMenus] = useState("");
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    menuItems,
    availbaleLanguage,
    themeSwitcher,
    logoData,
    setThemeSwitcher,
  } = useContext(GlobalContext);
  
  
  const normalizedMenuItems = useMemo(() => {
    if (!menuItems || !Array.isArray(menuItems)) {
      return [];
    }
    function normalizeMenuItem(item) {
      if (!item || typeof item !== "object") return item;
    
      let normalized = { ...item };
    
      if (item.container) {
        normalized = { ...item, ...item.container };
        delete normalized.container;
      }
    
      if (normalized.link !== undefined && typeof normalized.link !== "string") {
        normalized.link = normalizeLink(normalized.link);
      }
    
      if (Array.isArray(normalized.children)) {
        normalized.children = normalized.children.map(normalizeMenuItem);
      }
    
      return normalized;
    }
    
    const normalized = menuItems.map(normalizeMenuItem);
    return normalized;
  }, [menuItems]);
  const checkLang = (languages, availbaleLanguages) => {
    if (languages.flag === availbaleLanguages.flag) {
      totalLanguages.push({
        path: languages.path,
        lang: languages.lang,
        active: availbaleLanguages.active,
      });
    }
  };

  if (availbaleLanguage) {
    availbaleLanguage.map((availbaleLanguages) => {
      languages.filter((languages) => checkLang(languages, availbaleLanguages));
    });
  }

  const updateDropdownMenu = (e) => {
    setOpenDropDownMenu(!openDropDownMenu);
    e.preventDefault();
  };
  const handleChange = (lang, e) => {
    localStorage.setItem("language", lang);
    router.refresh();
    router.push("/", { locale: lang !== `${i18n.defaultLocale}` ? lang : "/" });
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm && !searchTerm.trim()) return;
    setToggleSearchForm(false);
    router.push(`/search?search_query=${searchTerm}`);
  };

  const renderNavigator = () => {
    return (
      <>
        <div className="header-main-content">
          <Logo />
          <div
            className="menu-trigger"
            onClick={() => setOpenCanvasMenu(!openCanvasMenu)}
          >
            <div className="bars"></div>
            <div className="bars"></div>
            <div className="bars"></div>
          </div>
          <div className="navigation">
            <nav>
              <ul>
                {normalizedMenuItems &&
                  normalizedMenuItems.length > 0 &&
                  normalizedMenuItems.map(
                    (
                      { title, link, children, data, hasSubpages, active },
                      index
                    ) => {
                      const childrenArray = Array.isArray(children) ? children : [];
                      const hasChildren = childrenArray.length > 0;

                      const shouldShowSubmenu = hasChildren || (hasSubpages && hasSubpages !== 0);
                      const shouldRenderChildren = hasChildren || (hasSubpages && hasSubpages !== 0);
                      
                        
                      return (
                          <React.Fragment key={title + index}>
                            {shouldShowSubmenu ? (
                              <li
                                className={`has-sub 1${
                                  activeSubMenus === title
                                    ? "active slide--up"
                                    : ""
                                } ${data?.megaMenu ? "dropdown-mega" : ""} ${
                                  active ? "active" : ""
                                }`}
                              >
                                <SafeLink href={typeof link === "string" ? link : (link || "#")}>{title}</SafeLink>
                                {shouldRenderChildren && childrenArray.length > 0 ? (
                                <ul
                                  className={`${
                                    data?.megaMenu ? "dropdown-menu" : ""
                                  }`}
                                >
                                  {data?.megaMenu ? (
                                    <li>
                                      <div className="dropdown-mega-content">
                                        <Row>
                                          {childrenArray.length > 0
                                            ? childrenArray.map(
                                                (
                                                  { children, title },
                                                  dropMenuIndex
                                                ) => {
                                                  return (
                                                    <Col
                                                      lg={3}
                                                      key={
                                                        title + dropMenuIndex
                                                      }
                                                    >
                                                      <span className="dropdown-mega-sub-title">
                                                        {title}
                                                      </span>
                                                      <ul className="dropdown-mega-sub-nav">
                                                        {children &&
                                                          children.length &&
                                                          children.map(
                                                            (
                                                              { title, link },
                                                              index
                                                            ) => {
                                                              return (
                                                                <li
                                                                  key={
                                                                    title +
                                                                    index
                                                                  }
                                                                >
                                                                  <SafeLink
                                                                    href={typeof link === "string" ? link : (link || "#")}
                                                                    className="dropdown-item"
                                                                  >
                                                                    {title}
                                                                  </SafeLink>
                                                                </li>
                                                              );
                                                            }
                                                          )}
                                                      </ul>
                                                    </Col>
                                                  );
                                                }
                                              )
                                            : ""}
                                        </Row>
                                      </div>
                                    </li>
                                  ) : (
                                    childrenArray.map(
                                      (
                                        childItem,
                                        subIndex
                                      ) => {
                                        let child = childItem;
                                        if (childItem?.container && typeof childItem.container === "object") {
                                          const { container, ...itemWithoutContainer } = childItem;
                                          child = {
                                            ...itemWithoutContainer,
                                            ...container,
                                          };
                                        }
                                        
                                        const { title: childTitle, children: childChildren, link: childLink, hasSubpages: childHasSubpages, active: childActive } = child;
                                        
                                        const childChildrenArray = Array.isArray(childChildren) ? childChildren : [];
                                        
                                        return (
                                          <React.Fragment
                                            key={childTitle + subIndex}
                                          >
                                            {childChildrenArray.length > 0 ? (
                                              <li
                                                className={`has-sub ${
                                                  activeInnerMenus === childTitle
                                                    ? "active slide--up"
                                                    : ""
                                                } ${childActive ? "active" : ""}`}
                                              >
                                                <SafeLink href={typeof childLink === "string" ? childLink : (childLink || "#")}>{childTitle}</SafeLink>
                                                <ul>
                                                  {childChildrenArray.map(
                                                    (
                                                      innerItem,
                                                      innerIndex
                                                    ) => {
                                                      // Handle container wrapper for inner child (if present)
                                                      let innerChild = innerItem;
                                                      if (innerItem?.container && typeof innerItem.container === "object") {
                                                        const { container, ...itemWithoutContainer } = innerItem;
                                                        innerChild = {
                                                          ...itemWithoutContainer,
                                                          ...container,
                                                        };
                                                      }
                                                      const { title: innerTitle, link: innerLink, active: innerActive } = innerChild;
                                                      
                                                      return (
                                                        <li
                                                          className={`${
                                                            innerActive
                                                              ? "active"
                                                              : ""
                                                          }`}
                                                          key={
                                                            innerTitle + innerIndex
                                                          }
                                                        >
                                                          <SafeLink href={typeof innerLink === "string" ? innerLink : (innerLink || "#")}>
                                                            {innerTitle}
                                                          </SafeLink>
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                                <div
                                                  className="nav-arrow"
                                                  onClick={() => {
                                                    activeInnerMenus !== childTitle
                                                      ? setActiveInnerMenus(
                                                          childTitle
                                                        )
                                                      : setActiveInnerMenus("");
                                                  }}
                                                >
                                                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                                                  </svg>
                                                </div>
                                              </li>
                                            ) : (
                                              <li
                                                className={`${
                                                  childActive === 1 || childActive === true ? "active" : ""
                                                }`}
                                              >
                                                <SafeLink href={typeof childLink === "string" ? childLink : (childLink || "#")}>{childTitle}</SafeLink>
                                              </li>
                                            )}
                                          </React.Fragment>
                                        );
                                      }
                                    )
                                  )}
                                </ul>
                                ) : null}
                                <div
                                  className="nav-arrow"
                                  onClick={() => {
                                    activeSubMenus !== title
                                      ? setActiveSubMenus(title)
                                      : setActiveSubMenus("");
                                  }}
                                >
                                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                                  </svg>
                                </div>
                              </li>
                            ) : (
                              <li>
                                <SafeLink
                                  href={
                                    typeof link === "string"
                                      ? websiteType === "normal"
                                        ? `${link}`
                                        : `${link.replace("/", "#")}`
                                      : "#"
                                  }
                                >
                                  {title}
                                </SafeLink>
                              </li>
                            )}
                          </React.Fragment>
                        );
                      }
                  )}
                {themeSwitcher?.showSearch === "1" && (
                  <li
                    className={`header-search ${
                      toggleSearchForm ? "search--open" : ""
                    }`}
                  >
                    <SafeLink
                      href={"#"}
                      className="dropdown-toggle search-trigger"
                      onClick={(e) => {
                        e.preventDefault(),
                          setToggleSearchForm(!toggleSearchForm);
                      }}
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <FaSearch />
                    </SafeLink>
                    <div className="search-form">
                      <form className="search-box" onSubmit={handleSubmit}>
                        <input
                          className="text search-input"
                          type="text"
                          onChange={handleSearchTerm}
                          value={searchTerm}
                        />
                        <span className="input-group-btn">
                          <button
                            type="submit"
                            className="tx-indexedsearch-searchbox-button btn"
                          >
                            <FaSearch />
                          </button>
                        </span>
                      </form>
                    </div>
                  </li>
                )}
                {themeSwitcher?.showLanguage === "1" && (
                  <li className="languange-bar">
                    <div className="dropdown">
                      <SafeLink
                        className="dropdown-toggle"
                        href={"#"}
                        as={Button}
                        id="dropdownLanguage"
                        data-bs-toggle="dropdown"
                        onClick={(e) => {
                          updateDropdownMenu(e);
                        }}
                      >
                        {totalLanguages.map(({ active, path, lang }, index) => {
                          if (active) {
                            return (
                              <LazyLoadImage
                                key={index}
                                src={path}
                                alt={`${lang}-flag`}
                                height={13}
                                width={19}
                              />
                            );
                          }
                        })}
                      </SafeLink>
                      <div
                        className={`dropdown-menu language-ddr ${
                          openDropDownMenu ? "show" : ""
                        }`}
                        aria-labelledby="dropdownLanguage"
                      >
                        {totalLanguages.map(({ path, lang, active }, index) => {
                          return (
                            <SafeLink
                              href={`/${
                                lang === i18n.defaultLanguage ? "" : lang
                              }`}
                              key={index}
                            >
                              <div
                                className={`lang-flag-wrapper ${
                                  active ? "active-languge" : ""
                                }`}
                              >
                                <LazyLoadImage
                                  src={path}
                                  alt="image"
                                  height={13}
                                  width={19}
                                />
                              </div>
                            </SafeLink>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <header
        className={`header-main ${openCanvasMenu ? "menu--open " : ""} ${
          currentPageHeaderLayout === "0"
            ? themeSwitcher?.headerStyle === "2"
              ? ""
              : themeSwitcher?.headerStyle === "3"
              ? "sticky-header"
              : themeSwitcher?.headerStyle === "4"
              ? "header-fullwidth"
              : themeSwitcher?.headerStyle === "5"
              ? "header-fullwidth sticky-header"
              : themeSwitcher?.headerStyle === "6"
              ? "transparent-header"
              : themeSwitcher?.headerStyle === "7"
              ? "sticky-header header-pills"
              : ""
            : currentPageHeaderLayout === "2"
            ? ""
            : currentPageHeaderLayout === "3"
            ? "sticky-header"
            : currentPageHeaderLayout === "4"
            ? "header-fullwidth"
            : currentPageHeaderLayout === "5"
            ? "header-fullwidth sticky-header"
            : currentPageHeaderLayout === "6"
            ? "transparent-header"
            : currentPageHeaderLayout === "7"
            ? "sticky-header header-pills"
            : ""
        }`}
      >
        {currentPageHeaderLayout === "0" &&
        (themeSwitcher.headerStyle === "4" ||
          themeSwitcher.headerStyle === "5") ? (
          renderNavigator()
        ) : currentPageHeaderLayout === "4" ||
          currentPageHeaderLayout === "5" ? (
          renderNavigator()
        ) : (
          <>
            <Container>{renderNavigator()}</Container>
          </>
        )}
      </header>
    </>
  );
};
export default Header;
