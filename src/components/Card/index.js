"use client";
import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as FontAwesome from "react-icons/fa6";
import Image from "next/image";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";

const Card = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
  function IconComponent({ iconName }) {
    const Icon = FontAwesome[iconName];
    return Icon ? <Icon /> : null;
  }

  return (
    <div
      className={`content-section frame ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <div
        className={`${
          data.cardicon && data.cardicon === "1" ? "cards-icon" : ""
        } card-block ${data.Center === "1" ? "text-center" : ""}`}
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
                    {data.cardicon === "1" && data.icon !== undefined ? (
                      <SafeLink href={"/"} className="card-icon-wrapper">
                        <IconComponent
                          iconName={data?.icon}
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
                    {data.buttonText && (
                      <SafeLink
                        href={data.cardLink}
                        title={data.heading}
                        className={`btn btn-${data.buttonstyle} ${
                          data.cardLink === "" && "disabled"
                        }`}
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
            {data.cardicon === "1" && data.icon ? (
              <SafeLink href={"/"} className="card-icon-wrapper">
                <IconComponent iconName={data?.icon} />
              </SafeLink>
            ) : (
              <>
                {(() => {
                  const imageUrl = getImageUrlFromData(data.image);
                  // Only render image if we have a valid URL (not null, not empty, not placeholder)
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
              </>
            )}

            <div className="card-body">
              <h4 className="card-title">
                <SafeLink href={"/"}>{data.heading}</SafeLink>
              </h4>
              {data.teaserText && (
                <p className="card-text">{data.teaserText}</p>
              )}
              {data.buttonText && (
                <SafeLink
                  href={typeof data.cardLink === "string" ? data.cardLink : (data.cardLink || "#")}
                  title={data.heading}
                  className={`btn btn-${data.buttonstyle} ${
                    !data.cardLink || data.cardLink === "" ? "disabled" : ""
                  }`}
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
      {/* ) } */}
    </div>
  );
};

export default Card;
