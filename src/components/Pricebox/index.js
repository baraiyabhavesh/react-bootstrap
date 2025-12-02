"use client";
import SafeLink from "@/components/Core/SafeLink";
import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import {
  FaCheck,
  FaDollarSign,
  FaTimes,
  FaRupeeSign,
  FaYenSign,
  FaEuroSign,
  FaPoundSign,
  FaWonSign,
} from "react-icons/fa";
import { normalizeContainerData, hasContainerWrappers } from "@/utils/normalizeContainerData";
import GlobalContext from "@/context/GlobalContext";

const Pricebox = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  const gcontext = useContext(GlobalContext);
  const menuItems = gcontext?.menuItems || [];
  
  // Helper to recursively find a page by UID in navigation tree
  const findPageByUid = (items, targetUid) => {
    if (!items || !Array.isArray(items)) return null;
    
    for (const item of items) {
      const itemUid = item?.data?.uid || item?.uid;
      if (itemUid && String(itemUid) === String(targetUid)) {
        return item;
      }
      
      if (item?.children && Array.isArray(item.children) && item.children.length > 0) {
        const found = findPageByUid(item.children, targetUid);
        if (found) return found;
      }
    }
    
    return null;
  };
  
  // Helper to resolve link - convert UID to slug if needed
  const resolveLink = (link) => {
    if (!link) return "#";
    
    if (typeof link === "string") {
      if (link.startsWith("http") || link.startsWith("/") || link.startsWith("#")) {
        return link;
      }
      if (/^\d+$/.test(link.trim())) {
        const uid = link.trim();
        const page = findPageByUid(menuItems, uid);
        if (page) {
          return page.link || page.data?.slug || page.data?.url || "#";
        }
      }
      return link;
    }
    
    if (typeof link === "number") {
      const page = findPageByUid(menuItems, link);
      if (page) {
        return page.link || page.data?.slug || page.data?.url || "#";
      }
      return String(link);
    }
    
    if (typeof link === "object" && link !== null) {
      return link.path || link.href || link.url || "#";
    }
    
    return "#";
  };
  
  // Extract featurelist from multiple possible locations
  let featurelist = data?.featurelist;
  if (!featurelist && data?.pi_flexform_content?.featurelist) {
    featurelist = data.pi_flexform_content.featurelist;
  }
  
  // Handle container wrappers
  if (featurelist && hasContainerWrappers(featurelist)) {
    featurelist = normalizeContainerData(featurelist);
  }
  
  // Extract other data properties from multiple locations
  const heading = data?.heading || data?.pi_flexform_content?.heading || "";
  const price = data?.price || data?.pi_flexform_content?.price || "";
  const currency = data?.currency || data?.pi_flexform_content?.currency || "";
  const boxColor = data?.boxColor || data?.pi_flexform_content?.boxColor || "";
  let buttonlink = data?.buttonlink || data?.pi_flexform_content?.buttonlink || "";
  const buttonlabel = data?.buttonlabel || data?.pi_flexform_content?.buttonlabel || "";
  
  // Resolve buttonlink if it's a UID
  if (buttonlink) {
    buttonlink = resolveLink(buttonlink);
  }
  
  // Normalize featurelist - handle container wrappers in individual items
  const normalizedFeaturelist = featurelist ? Object.values(featurelist).map(item => {
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
  const currencyList = [
    {
      type: "fa fa-dollar",
      element: <FaDollarSign />,
    },
    {
      type: "fa fa-cny",
      element: <FaYenSign />,
    },
    {
      type: "fa fa-eur",
      element: <FaEuroSign />,
    },
    {
      type: "fa fa-gbp",
      element: <FaPoundSign />,
    },
    {
      type: "fa fa-inr",
      element: <FaRupeeSign />,
    },
    {
      type: "fa fa-krw",
      element: <FaWonSign />,
    },
  ];

  const renderPriceIcon = (priceIcon) => {
    return (
      <>
        {priceIcon === "fa fa-dollar" ? (
          <FaDollarSign />
        ) : priceIcon === "fa fa-cny" ? (
          <FaYenSign />
        ) : priceIcon === "fa fa-eur" ? (
          <FaEuroSign />
        ) : priceIcon === "fa fa-gbp" ? (
          <FaPoundSign />
        ) : priceIcon === "fa fa-inr" ? (
          <FaRupeeSign />
        ) : priceIcon === "fa fa-krw" ? (
          <FaWonSign />
        ) : (
          ""
        )}
      </>
    );
  };
  return (
    <div className="content-section frame">
      <div className={`price-block ${boxColor}`}>
        <div className="price-block-header">
          {heading && heading}
          <h3>
            {currency && renderPriceIcon(currency)}
            {price && price}
          </h3>
        </div>
        <div className="price-block-content">
          <ul>
            {normalizedFeaturelist
              .filter(item => item && item.featuretext && item.featuretext.trim() !== "") // Only render items with valid featuretext
              .map((item, index) => {
                const featuretext = item.featuretext || "";
                const icon = item.icon || "";
                
                return (
                  <li key={index}>
                    {icon === "fa fa-check" ? (
                      <FaCheck className="svg-inline--fa fa-check" />
                    ) : (
                      <FaTimes className="svg-inline--fa fa-xmark" />
                    )}{" "}
                    {featuretext}
                  </li>
                );
              })}
          </ul>
          {buttonlink && buttonlink !== "" && (
            <SafeLink
              href={buttonlink || "#"}
              className={`btn ${!buttonlink || buttonlink === "" ? "disabled" : ""}`}
            >
              {buttonlabel || "SIGN UP"}
            </SafeLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricebox;
