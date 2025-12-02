import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import { FaArrowRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { safeReplace } from "@/utils/safeString";

const FontFamilySwitch = () => {
  const gcontext = useContext(GlobalContext);
  const [showGoogleFonts, setShowGoogleFonts] = useState(false);
  const t = useTranslations();
  useEffect(() => {
    if (gcontext.themeSwitcher.fontFamilyName) {
      const fontName = gcontext.themeSwitcher.fontFamilyName;
      if (fontName === "Open Sans") {
        document.body.style.setProperty("font-family", "var(--open-sans)");
      } else if (fontName === "Work Sans") {
        document.body.style.setProperty("font-family", "var(--font-work-sans)");
      } else if (fontName === "Montserrat") {
        document.body.style.setProperty("font-family", "var(--montserrat)");
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css?family=${fontName}`;

        document.head.appendChild(link);
        document.body.style.fontFamily = `${safeReplace(gcontext.themeSwitcher.fontFamilyName, ";", "") || gcontext.themeSwitcher.fontFamilyName}`;
      }
    }
  }, [gcontext.themeSwitcher.fontFamilyName]);

  const getselected = (option) => {
    if (option == "Work Sans") {
      return "Work Sans";
    } else if (option == "Open Sans") {
      return "Open Sans";
    } else if (option == "Montserrat") {
      return "Montserrat";
    } else {
      return "custom_font";
    }
  };
  return (
    <>
      <div className="category">
        <h5>{t("main_font_family")}</h5>
        <div className="input-group input-group-2 custom-select-1 font-selector">
          <select
            className="form-select form-control main-font-family-select h-auto"
            value={getselected(gcontext.themeSwitcher.fontFamilyName)}
            onChange={(e) => {
              if (e.target.value == "custom_font") {
                setShowGoogleFonts(true);
                gcontext.setThemeSwitcher({
                  ...gcontext.themeSwitcher,
                  fontFamilyName: e.target.value,
                });
              } else {
                setShowGoogleFonts(false);
                gcontext.setThemeSwitcher({
                  ...gcontext.themeSwitcher,
                  fontFamilyName: e.target.value,
                });
              }
            }}
          >
            <option value="Work Sans">Work Sans</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Montserrat">Montserrat</option>
            <option value="custom_font">{t("custom_font")}</option>
          </select>
        </div>
      </div>
      {showGoogleFonts && (
        <div className="category font-customised">
          <div className="category-headline">
            <h5>google_font (without https://fonts.googleapis.com/css2)</h5>
          </div>
          <div className="input-group input-group-2 font-switcher font-element">
            <textarea
              name="tx_style[font-face]"
              className="font-family-wrapper"
              rows="6"
              cols="50"
              value={gcontext.themeSwitcher.fontFamilyLink}
              placeholder="?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              onChange={(e) =>
                gcontext.setThemeSwitcher({
                  ...gcontext.themeSwitcher,
                  fontFamilyLink: e.target.value,
                })
              }
            />
            <h5>
              <strong>{t("CSS_rules_to_specify")}</strong>
            </h5>
            <input
              type="text"
              className="font-family__input"
              name="tx_style[font-family-name]"
              value={gcontext.themeSwitcher.fontFamilyName}
              placeholder="'Work Sans', sans-serif"
              onChange={(e) =>
                gcontext.setThemeSwitcher({
                  ...gcontext.themeSwitcher,
                  fontFamilyName: e.target.value
                    ? e.target.value.replace(";", "")
                    : e.target.value,
                })
              }
            />
          </div>
          <a href="https://fonts.google.com/" target="_blank">
            {t("select_from_google_fonts")}
            <FaArrowRight />
          </a>
        </div>
      )}
    </>
  );
};

export default FontFamilySwitch;
