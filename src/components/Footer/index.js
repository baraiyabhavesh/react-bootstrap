/* eslint-disable react/no-children-prop */
"use client";

import GlobalContext from "@/context/GlobalContext";
import SafeLink from "@/components/Core/SafeLink";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaPinterest,
  FaMobileAlt,
} from "react-icons/fa";
import DOMPurify from "dompurify";
import ThemeSwitcher from "../ThemeSwitcher";
import FooterLogo from "../FooterLogo";
import { FaXTwitter } from "react-icons/fa6";
import { safeIncludes, safeReplace } from "@/utils/safeString";

const Footer = ({
  currentPageFooterLayout,
  enable_style_switcher,
  styleData,
  onePageUrl,
}) => {
  let leftMenuItems = [];
  let rightMenuItems = [];
  const gcontext = useContext(GlobalContext);
  const themeSwitcher = gcontext?.themeSwitcher;
  // Footer data can be in multiple locations - check all possibilities
  const footerDataRaw = gcontext.footerData;
  const footerData = footerDataRaw?.content?.pi_flexform_content || footerDataRaw?.pi_flexform_content || footerDataRaw?.content || footerDataRaw;
  
  // Helper to normalize menu items with container wrappers
  const normalizeMenuItem = (item) => {
    if (!item || typeof item !== "object") return null;
    
    // If item has container, extract container data
    let normalized = item;
    if (item.container && typeof item.container === "object") {
      const { container, ...itemWithoutContainer } = item;
      normalized = {
        ...itemWithoutContainer,
        ...container,
      };
    }
    
    // Extract link - try multiple possible locations
    let link = "";
    if (normalized.link !== undefined) {
      if (typeof normalized.link === "string") {
        link = normalized.link;
      } else if (typeof normalized.link === "object" && normalized.link !== null) {
        link = normalized.link.path || normalized.link.href || normalized.link.url || "";
      } else if (typeof normalized.link === "number") {
        link = String(normalized.link);
      }
    }
    
    // Extract linktext/title - try multiple possible locations
    const linktext = normalized.linktext || normalized.title || normalized.name || normalized.label || "";
    
    // Only return if we have at least linktext or link
    if (!linktext && !link) {
      return null;
    }
    
    return {
      ...normalized,
      link: link || "#",
      linktext: linktext || link,
    };
  };
  
  if (footerData && footerData.leftmenu) {
    Object.entries(footerData.leftmenu).forEach((data) => {
      const item = normalizeMenuItem(data[1]);
      if (item) {
        leftMenuItems.push(item);
      }
    });
  }
  if (footerData && footerData.rightmenu) {
    Object.entries(footerData.rightmenu).forEach((data) => {
      const item = normalizeMenuItem(data[1]);
      if (item) {
        rightMenuItems.push(item);
      }
    });
  }
    
  const renderMediumFooter = () => {
    return (
      <Row>
        <Col md={4} lg={4}>
          <div className="footer-block">
            {footerData && footerData.brandname ? (
              <div className="logo">
                <SafeLink
                  href="#"
                  dangerouslySetInnerHTML={{ __html: footerData.brandname }}
                  className="navbar-brand"
                />
              </div>
            ) : (
              <div></div>
            )}
            {footerData && footerData.address ? (
              <div className="address-block">
                <address>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(footerData.address),
                    }}
                  />
                </address>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Col>
        <Col md={4} lg={4}>
          <div className="footer-block">
            {footerData && footerData.newsletter ? (
              <h3>{footerData.newsletter}</h3>
            ) : (
              <div></div>
            )}
            <div className="address-block">
              {footerData && footerData.email ? (
                <>
                  <SafeLink href={`mailto:${footerData.email}`} target="blank">
                    {footerData && footerData.hideEmail !== "0" && (
                      <FaEnvelope />
                    )}
                    {` ${footerData.email}`}
                  </SafeLink>
                </>
              ) : (
                <></>
              )}
              {footerData && footerData.phone ? (
                <>
                  <SafeLink href={`tel:${footerData.phone}`} target="blank">
                    {footerData && footerData.hidephone !== "0" && (
                      <FaPhoneAlt />
                    )}
                    {` ${footerData.phone}`}
                  </SafeLink>
                </>
              ) : (
                <></>
              )}
              {footerData && footerData.phonenumber ? (
                <>
                  <SafeLink href={`tel:${footerData.phonenumber}`}>
                    <FaMobileAlt />
                    {` ${footerData.phonenumber}`}
                  </SafeLink>
                </>
              ) : (
                <></>
              )}
              {footerData && footerData.fax ? (
                <>
                  <SafeLink href={`tel:${footerData.fax}`}>
                    {footerData && footerData.hidefax !== "0" && <FaPhoneAlt />}
                    {` ${footerData.fax}`}
                  </SafeLink>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Col>
        <Col md={4} lg={4}>
          <div className="footer-block social-icons">
            {footerData && footerData.sociallinkheader ? (
              <h3>{footerData.sociallinkheader}</h3>
            ) : (
              <div></div>
            )}
            {footerData && footerData.facebook ? (
              <SafeLink
                href={safeReplace(footerData.facebook, " _blank", "/") || footerData.facebook}
                target={safeIncludes(footerData.facebook, "_blank") ? "blank" : undefined}
              >
                <FaFacebook />
              </SafeLink>
            ) : (
              <></>
            )}
            {footerData && footerData.twitterlink ? (
              <SafeLink
                href={safeReplace(footerData.twitterlink, " _blank", "/") || footerData.twitterlink}
                target={safeIncludes(footerData.twitterlink, "_blank") ? "blank" : undefined}
              >
                {/* <FaTwitter /> */}
                <FaXTwitter />
              </SafeLink>
            ) : (
              <></>
            )}
            {footerData && footerData.youtubelink ? (
              <SafeLink
                href={safeReplace(footerData.youtubelink, " _blank", "/") || footerData.youtubelink}
                target={safeIncludes(footerData.youtubelink, "_blank") ? "blank" : undefined}
              >
                <FaYoutube />
              </SafeLink>
            ) : (
              <></>
            )}
            {footerData && footerData.pinterest ? (
              <SafeLink
                href={safeReplace(footerData.pinterest, " _blank", "/") || footerData.pinterest}
                target={safeIncludes(footerData.pinterest, "_blank") ? "blank" : undefined}
              >
                <FaPinterest />
              </SafeLink>
            ) : (
              <></>
            )}
            {footerData && footerData.instagramlink ? (
              <SafeLink
                href={safeReplace(footerData.instagramlink, " _blank", "/") || footerData.instagramlink}
                target={safeIncludes(footerData.instagramlink, "_blank") ? "blank" : undefined}
              >
                <FaInstagram />
              </SafeLink>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    );
  };

  const renderLargeFooter = () => {
    return (
      <Row>
        <Col md={6} lg={3}>
          <div className="footer-block">
            <FooterLogo />
            {footerData && footerData.address ? (
              <div className="address-block">
                <address>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(footerData.address),
                    }}
                  />
                </address>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Col>
        <Col md={6} lg={4}>
          <div className="footer-block footer-page-block">
            <div className="footer-inner-block">
              {footerData && footerData.leftMenuTitle ? (
                <h3>{footerData.leftMenuTitle}</h3>
              ) : (
                <div></div>
              )}
              {leftMenuItems && leftMenuItems.length > 0 ? (
                <ul>
                  {leftMenuItems
                    .filter(menuitem => menuitem && (menuitem.linktext || menuitem.title || menuitem.link))
                    .map((menuitem, index) => {
                    const linkText = menuitem.linktext || menuitem.title || "";
                    const link = typeof menuitem.link === "string" ? menuitem.link : (menuitem.link?.path || menuitem.link?.href || "#");
                    if (!linkText && !link) return null;
                    return (
                      <li key={index}>
                        <SafeLink href={link}>{linkText}</SafeLink>
                      </li>
                    );
                  }).filter(Boolean)}
                </ul>
              ) : null}
            </div>
            <div className="footer-inner-block">
              {footerData && footerData.rightMenuTitle ? (
                <h3>{footerData.rightMenuTitle}</h3>
              ) : (
                <div></div>
              )}
              {rightMenuItems && rightMenuItems.length ? (
                <ul>
                  {rightMenuItems.map((menuitem, index) => {
                    const linkText = menuitem.linktext || menuitem.title || "";
                    const link = typeof menuitem.link === "string" ? menuitem.link : (menuitem.link?.path || menuitem.link?.href || "#");
                    if (!linkText && !link) return null;
                    return (
                      <li key={index}>
                        <SafeLink href={link}>{linkText}</SafeLink>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </Col>
        <Col md={6} lg={3}>
          <div className="footer-block">
            {footerData && footerData.newsletter ? (
              <h3>{footerData.newsletter}</h3>
            ) : (
              <div></div>
            )}
            <div className="address-block">
              {footerData && footerData.email ? (
                <>
                  <SafeLink href={`mailto:${footerData.email}`}>
                    {footerData && footerData.hideEmail !== "0" && (
                      <FaEnvelope />
                    )}
                    {` ${footerData.email}`}
                  </SafeLink>
                </>
              ) : (
                <></>
              )}
              {footerData && footerData.phone ? (
                <>
                  <SafeLink href={`tel:${footerData.phone}`}>
                    {footerData && footerData.hidephone !== "0" && (
                      <FaPhoneAlt />
                    )}
                    {` ${footerData.phone}`}
                  </SafeLink>
                </>
              ) : (
                <></>
              )}
              {footerData && footerData.phonenumber ? (
                <>
                  <SafeLink href={`tel:${footerData.phonenumber}`}>
                    <FaMobileAlt />
                    {` ${footerData.phonenumber}`}
                  </SafeLink>
                </>
              ) : (
                <></>
              )}
              {footerData && footerData.fax ? (
                <>
                  <SafeLink href={`tel:${footerData.fax}`}>
                    {footerData && footerData.hidefax !== "0" && <FaPhoneAlt />}
                    {` ${footerData.fax}`}
                  </SafeLink>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Col>
        <Col md={6} lg={2}>
          <div className="footer-block social-icons">
            {footerData && footerData.sociallinkheader ? (
              <h3>{footerData.sociallinkheader}</h3>
            ) : (
              <></>
            )}
            {footerData && footerData.facebook ? (
              <SafeLink
                href={footerData.facebook.replace(" _blank", "/")}
                target={safeIncludes(footerData.facebook, "_blank") ? "blank" : undefined}
              >
                <FaFacebook />
              </SafeLink>
            ) : (
              <></>
            )}
            {footerData && footerData.twitterlink ? (
              <SafeLink
                href={safeReplace(footerData.twitterlink, " _blank", "/") || footerData.twitterlink}
                target={safeIncludes(footerData.twitterlink, "_blank") ? "blank" : undefined}
              >
                <FaXTwitter />
              </SafeLink>
            ) : (
              <></>
            )}
            {footerData && footerData.youtubelink ? (
              <SafeLink
                href={safeReplace(footerData.youtubelink, " _blank", "/") || footerData.youtubelink}
                target={safeIncludes(footerData.youtubelink, "_blank") ? "blank" : undefined}
              >
                <FaYoutube />
              </SafeLink>
            ) : (
              <></>
            )}
            {footerData && footerData.pinterest ? (
              <SafeLink
                href={safeReplace(footerData.pinterest, " _blank", "/") || footerData.pinterest}
                target={safeIncludes(footerData.pinterest, "_blank") ? "blank" : undefined}
              >
                <FaPinterest />
              </SafeLink>
            ) : (
              <></>
            )}
            {footerData && footerData.instagramlink ? (
              <SafeLink
                href={safeReplace(footerData.instagramlink, " _blank", "/") || footerData.instagramlink}
                target={safeIncludes(footerData.instagramlink, "_blank") ? "blank" : undefined}
              >
                <FaInstagram />
              </SafeLink>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    );
  };

  const renderSmallFooter = () => {
    return (
      <Container className="footer-medium">
        <Row>
          <Col lg={8}>
            <div className="copyright-block">
              <Container>
                {footerData && footerData.copyright ? (
                  <div className="copyright-text">
                    {<> 2023 &#169; {footerData.copyright} </>}
                    {footerData.sitelink && footerData.sitelinktext && (
                      <SafeLink href={footerData.sitelink} target="_blank">
                        {footerData.sitelinktext}
                      </SafeLink>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </Container>
            </div>
          </Col>
          <Col lg={4}>
            <div className="footer-block social-icons">
              {footerData && footerData.facebook ? (
                <SafeLink
                  href={footerData.facebook}
                  target={safeIncludes(footerData.facebook, "_blank") ? "blank" : undefined}
                >
                  <FaFacebook />
                </SafeLink>
              ) : (
                <></>
              )}
              {footerData && footerData.twitterlink ? (
                <SafeLink
                  href={footerData.twitterlink}
                  target={safeIncludes(footerData.twitterlink, "_blank") ? "blank" : undefined}
                >
                  <FaXTwitter />
                </SafeLink>
              ) : (
                <></>
              )}
              {footerData && footerData.youtubelink ? (
                <SafeLink
                  href={footerData.youtubelink}
                  target={safeIncludes(footerData.youtubelink, "_blank") ? "blank" : undefined}
                >
                  <FaYoutube />
                </SafeLink>
              ) : (
                <></>
              )}
              {footerData && footerData.pinterest ? (
                <SafeLink
                  href={footerData.pinterest}
                  target={safeIncludes(footerData.pinterest, "_blank") ? "blank" : undefined}
                >
                  <FaPinterest />
                </SafeLink>
              ) : (
                <></>
              )}
              {footerData && footerData.instagramlink ? (
                <SafeLink
                  href={footerData.instagramlink}
                  target={
                    footerData.instagramlink.includes("_blank") && "blank"
                  }
                >
                  <FaInstagram />
                </SafeLink>
              ) : (
                <></>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  const renderCopyRightSection = () => {
    return (
      <div className="copyright-block">
        <div className="container">
          {footerData && footerData.copyright ? (
            <div className="copyright-text">
              {<> 2023 &#169; {footerData.copyright} </>}
              {footerData.sitelink && footerData.sitelinktext && (
                <SafeLink href={footerData.sitelink} target="_blank">
                  {footerData.sitelinktext}
                </SafeLink>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return (
    <footer className="footer">
      {currentPageFooterLayout === "0" ? (
        <>
          {themeSwitcher?.footerStyle === "2" ||
          themeSwitcher?.footerStyle === "1" ? (
            <>
              <div className="footer-main frame">
                <Container>
                  {themeSwitcher?.footerStyle === "2"
                    ? renderMediumFooter()
                    : themeSwitcher?.footerStyle === "1"
                    ? renderLargeFooter()
                    : null}
                </Container>
              </div>
              {renderCopyRightSection()}
            </>
          ) : (
            renderSmallFooter()
          )}
        </>
      ) : (
        <>
          {currentPageFooterLayout === "2" ||
          currentPageFooterLayout === "1" ? (
            <>
              <div className="footer-main frame ">
                <Container>
                  {currentPageFooterLayout === "2"
                    ? renderMediumFooter()
                    : themeSwitcher?.footerStyle === "1"
                    ? renderLargeFooter()
                    : null}
                </Container>
              </div>
              {renderCopyRightSection()}
            </>
          ) : (
            renderSmallFooter()
          )}
        </>
      )}
      {enable_style_switcher == 1 ? (
        <ThemeSwitcher styleData={styleData} onePageUrl={onePageUrl} />
      ) : (
        ""
      )}
    </footer>
  );
};

export default Footer;
