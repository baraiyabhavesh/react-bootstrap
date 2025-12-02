"use client";
import SafeLink from "@/components/Core/SafeLink";
import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";
import { safeIncludes } from "@/utils/safeString";
import { normalizeContainerData, hasContainerWrappers } from "@/utils/normalizeContainerData";

const Team = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
  // Extract profiles from multiple possible locations
  let profiles = data?.profiles;
  if (!profiles && data?.pi_flexform_content?.profiles) {
    profiles = data.pi_flexform_content.profiles;
  }
  
  // Handle container wrappers
  if (profiles && hasContainerWrappers(profiles)) {
    profiles = normalizeContainerData(profiles);
  }
  
  // Normalize profiles - handle container wrappers in individual items
  const normalizedProfiles = profiles ? Object.values(profiles).map(item => {
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
  
  // Validate we have profiles to render
  if (!normalizedProfiles || normalizedProfiles.length === 0) {
    return null;
  }
  
  return (
    <div
      className={`content-section frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <Container>
        <Row>
          {normalizedProfiles.map((item, index) => {
            return (
              <Col md={6} lg={3} className="mb-4" key={index}>
                <div className="team-card card text-center">
                  {(() => {
                    const imageUrl = getImageUrlFromData(item.image);
                    // Only render image if we have a valid URL (not null, not empty, not placeholder)
                    if (imageUrl && imageUrl !== "/placeholder.png" && imageUrl.trim() !== "") {
                      return (
                        <LazyLoadImage
                          effect="opacity"
                          src={imageUrl}
                          alt="Image thumb"
                          width={"100%"}
                        />
                      );
                    }
                    return null;
                  })()}

                  <div className="card-body">
                    {(item.name || item.title) && (
                      <h4 className="card-title">{item.name || item.title}</h4>
                    )}
                    {(item.designation || item.subtitle) && (
                      <h6 className="card-subtitle mb-2 text-muted">
                        {item.designation || item.subtitle}
                      </h6>
                    )}
                    {(item.about || item.description || item.text) && (
                      <p className="card-text">{item.about || item.description || item.text}</p>
                    )}
                  </div>
                  <div className="card-footer">
                    {(item.facebookid || item.facebook) && (item.facebookid !== "" || item.facebook !== "") && (
                      <SafeLink
                        href={item.facebookid || item.facebook}
                        target={safeIncludes(item.facebookid || item.facebook, "_blank") ? "blank" : undefined}
                      >
                        <FaFacebookF />
                      </SafeLink>
                    )}
                    {(item.twitterid || item.twitter) && (item.twitterid !== "" || item.twitter !== "") && (
                      <SafeLink
                        href={item.twitterid || item.twitter}
                        target={safeIncludes(item.twitterid || item.twitter, "_blank") ? "blank" : undefined}
                      >
                        <FaXTwitter />
                      </SafeLink>
                    )}
                    {(item.linkedinid || item.linkedin) && (item.linkedinid !== "" || item.linkedin !== "") && (
                      <SafeLink
                        href={item.linkedinid || item.linkedin}
                        target={safeIncludes(item.linkedinid || item.linkedin, "_blank") ? "blank" : undefined}
                      >
                        <FaLinkedinIn />
                      </SafeLink>
                    )}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Team;
