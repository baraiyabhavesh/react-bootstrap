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
  const icon = data?.icon || data?.pi_flexform_content?.icon;
  const imageUrl = getImageUrlFromData(data?.image || data?.pi_flexform_content?.image);
  const headline = data?.headline || data?.pi_flexform_content?.headline;
  const teasertext = data?.teasertext || data?.pi_flexform_content?.teasertext;

  return (
    <div className="content-section frame ">
      <div className="teaser-block">
        {icon ? (
          <div className="teaser-icon">
            <IconComponent iconName={icon} />
          </div>
        ) : (
          <>
            {imageUrl && imageUrl.trim() !== "" ? (
              <LazyLoadImage
                effect="opacity"
                src={imageUrl}
                className="image-embed-item"
              />
            ) : null}
          </>
        )}
        <h3>{headline}</h3>
        <p>{teasertext}</p>
        {(() => {
          const buttonsgroup = data?.buttonsgroup || data?.pi_flexform_content?.buttonsgroup;
          if (buttonsgroup && typeof buttonsgroup === 'object') {
            const buttons = Object.values(buttonsgroup)
              .map((button, index) => {
                const buttonData = button?.container || button;
                const buttonlabel = buttonData?.buttonlabel;
                const buttonlink = buttonData?.buttonlink;
                
                if (buttonlabel && buttonlink) {
                  return (
                    <div key={index} className="btn-group">
                      <SafeLink
                        href={buttonlink || "#"}
                        className={`btn btn-outline-primary ${
                          !buttonlink || buttonlink === "" ? "disabled" : ""
                        }`}
                      >
                        {buttonlabel}
                      </SafeLink>
                    </div>
                  );
                }
                return null;
              })
              .filter(Boolean);
            
            return buttons.length > 0 ? <>{buttons}</> : null;
          }
          
          const buttonlabel = data?.buttonlabel || data?.pi_flexform_content?.buttonlabel;
          const buttonlink = data?.buttonlink || data?.pi_flexform_content?.buttonlink;
          const btnlabel = data?.btnlabel || data?.pi_flexform_content?.btnlabel;
          const btnlink = data?.btnlink || data?.pi_flexform_content?.btnlink;
          
          return (
            <>
              {buttonlabel && buttonlabel !== "" && (
                <div className="btn-group">
                  <SafeLink
                    href={buttonlink || "#"}
                    className={`btn btn-outline-primary ${
                      !buttonlink || buttonlink === "" ? "disabled" : ""
                    }`}
                  >
                    {buttonlabel}
                  </SafeLink>
                </div>
              )}
              {btnlabel && btnlabel !== "" && (
                <div className="btn-group">
                  <SafeLink
                    href={btnlink || "#"}
                    className={`btn btn-outline-primary ${
                      !btnlink || btnlink === "" ? "disabled" : ""
                    }`}
                  >
                    {btnlabel}
                  </SafeLink>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default TeaserList;
