"use client";
import SafeLink from "@/components/Core/SafeLink";
import React from "react";

import * as FontAwesome from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageUrlFromData } from "@/utils/imageUrlHelper";

const TeaserList = ({ data }) => {
  function IconComponent({ iconName }) {
    const Icon = FontAwesome[iconName];
    return Icon ? <Icon /> : null;
  }
  return (
    <div className="content-section frame ">
      <div className="teaser-block">
        {data.cardicon === "1" ? (
          <div className="teaser-icon">
            {data.icon && <IconComponent iconName={data?.icon} />}
          </div>
        ) : (
          <>
            {(() => {
              const imageUrl = getImageUrlFromData(data.image);
              // Only render image if we have a valid URL (not null, not empty)
              if (imageUrl && imageUrl.trim() !== "") {
                return (
                  <LazyLoadImage
                    effect="opacity"
                    src={imageUrl}
                    className="image-embed-item"
                  />
                );
              }
              return null;
            })()}
          </>
        )}
        <h3>{data.headline}</h3>
        <p>{data.teasertext}</p>
        {data.buttonlabel && data.buttonlabel !== "" && (
          <div className="btn-group">
            <SafeLink
              href={data.buttonlink || "#"}
              className={`btn btn-outline-primary ${
                !data.buttonlink || data.buttonlink === "" ? "disabled" : ""
              }`}
            >
              {data.buttonlabel}
            </SafeLink>
          </div>
        )}

        {data.btnlabel && data.btnlabel !== "" && (
          <div className="btn-group">
            <SafeLink
              href={data.btnlink || "#"}
              className={`btn btn-outline-primary ${
                !data.btnlink || data.btnlink === "" ? "disabled" : ""
              }`}
            >
              {data.btnlabel}
            </SafeLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeaserList;
