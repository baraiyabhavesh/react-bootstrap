"use client";
import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as FontAwesome from "react-icons/fa6";
import Image from "next/image";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";

const Card = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
  function IconComponent({ iconName, className }) {
    const Icon = FontAwesome[iconName];
    return Icon ? <Icon className={className} /> : null;
  }

  // Extract icon and cardicon from multiple possible locations
  // Check various possible field names for the icon checkbox
  let icon = data?.icon || data?.pi_flexform_content?.icon || data?.content?.icon;
  const cardicon = data?.cardicon || 
                   data?.pi_flexform_content?.cardicon || 
                   data?.content?.cardicon ||
                   data?.useIcon ||
                   data?.pi_flexform_content?.useIcon ||
                   data?.showIcon ||
                   data?.pi_flexform_content?.showIcon;
  
  // Check if cardicon is enabled (handle various formats: "1", 1, true, "true", "yes", "on", any truthy value)
  // Also check if icon exists - if icon exists, assume cardicon should be enabled
  const hasCardIcon = icon ? true : (
    cardicon === "1" || cardicon === 1 || cardicon === true || cardicon === "true" || 
    cardicon === "yes" || cardicon === "on" || cardicon === "enabled" ||
    (cardicon && cardicon !== "0" && cardicon !== 0 && cardicon !== false && cardicon !== "false")
  );
  
  // If icon is not found but cardicon is enabled, try to extract icon name from image filename
  // e.g., "gear.svg" -> "FaGear"
  if (hasCardIcon && !icon) {
    const imageUrl = getImageUrlFromData(data.image);
    if (imageUrl) {
      const filename = imageUrl.split('/').pop() || "";
      const nameWithoutExt = filename.replace(/\.(svg|png|jpg|jpeg)$/i, "");
      if (nameWithoutExt) {
        // Convert "gear" to "FaGear" format
        const iconName = "Fa" + nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
        // Check if this icon exists in FontAwesome
        if (FontAwesome[iconName]) {
          icon = iconName;
        }
      }
    }
  }
  
  // Debug logging (remove in production)
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("Card data:", {
      hasIcon: !!icon,
      icon,
      hasCardicon: !!cardicon,
      cardicon,
      hasCardIcon,
      dataKeys: data ? Object.keys(data) : null,
      pi_flexform_keys: data?.pi_flexform_content ? Object.keys(data.pi_flexform_content) : null,
      fullData: data,
    });
  }

  return (
    <div
      className={`content-section frame ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <div
        className={`${hasCardIcon ? "cards-icon" : ""} card-block ${data.Center === "1" ? "text-center" : ""}`.trim()}
      >
        {data.horizontal === "1" ? (
          <div className="horizontal horizontal-block">
            <div
              className={`card mb-3 ${
                data.color ? `bg-${data.color}` : "bg-default "
              }`}
              style={{ maxWidth: "540px" }}
            >
              {data.headerText && (
                <div className="card-header">{data.headerText}</div>
              )}
              <Row className="g-0">
                <Col md={4}>
                  <div className="application-block__img">
                    {hasCardIcon && icon ? (
                      <SafeLink href={"/"} className="card-icon-wrapper">
                        <IconComponent
                          iconName={icon}
                          className="cards-icon__fa"
                        />
                      </SafeLink>
                    ) : (
                      (() => {
                        const imageUrl = getImageUrlFromData(data.image);
                        // Only render image if we have a valid URL (not null, not empty, not placeholder)
                        if (imageUrl && imageUrl !== "/placeholder.png" && imageUrl.trim() !== "") {
                          return (
                            <Image
                              src={imageUrl}
                              width={0}
                              height={0}
                              alt="card-image"
                              className="w-100 h-100 image-embed-item"
                            />
                          );
                        }
                        return null;
                      })()
                    )}
                  </div>
                </Col>
                <Col md={8}>
                  <div className="card-body">
                    <h4 className="card-title">{data.heading}</h4>
                    <p className="card-text">{data.teaserText}</p>
                    {data.buttonText && data.cardLink && data.cardLink !== "" && (
                      <SafeLink
                        href={data.cardLink}
                        title={data.heading}
                        className={`btn btn-${data.buttonstyle}`}
                      >
                        {data.buttonText}
                      </SafeLink>
                    )}
                  </div>
                </Col>
              </Row>
              {data.footerText && (
                <div
                  className={`card-footer ${
                    data.color ? `bg-${data.color}` : "bg-default "
                  }`}
                >
                  {data.footerText}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={`card  ${
              data.color ? `bg-${data.color}` : "bg-default "
            }`}
          >
            {data.headerText && (
              <div className="card-header">{data.headerText}</div>
            )}
            {(() => {
              // Priority: If icon exists and cardicon is enabled (or icon exists), show icon
              // If icon name exists, it means icon mode is enabled
              if (icon && (hasCardIcon || icon)) {
                return (
                  <SafeLink href={"/"} className="card-icon-wrapper">
                    <IconComponent iconName={icon} className="cards-icon__fa" />
                  </SafeLink>
                );
              }
              // Otherwise, show image if available
              const imageUrl = getImageUrlFromData(data.image);
              if (imageUrl && imageUrl !== "/placeholder.png" && imageUrl.trim() !== "") {
                return (
                  <SafeLink href={"/"} className="card-img">
                    <Image
                      src={imageUrl}
                      width={0}
                      height={0}
                      alt="Image thumb"
                      className="w-100 h-100"
                    />
                  </SafeLink>
                );
              }
              return null;
            })()}

            <div className="card-body">
              <h4 className="card-title">
                <SafeLink href={"/"}>{data.heading}</SafeLink>
              </h4>
              {data.teaserText && (
                <p className="card-text">{data.teaserText}</p>
              )}
              {data.buttonText && data.cardLink && data.cardLink !== "" && (
                <SafeLink
                  href={typeof data.cardLink === "string" ? data.cardLink : "#"}
                  title={data.heading}
                  className={`btn btn-${data.buttonstyle}`}
                >
                  {data.buttonText}
                </SafeLink>
              )}
            </div>

            {data.footerText && (
              <div
                className={`card-footer ${
                  data.color ? `bg-${data.color}` : "bg-default "
                }`}
              >
                {data.footerText}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
