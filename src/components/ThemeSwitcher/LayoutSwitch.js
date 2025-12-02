import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import { theme as baseTheme } from "@/utils";
import SafeLink from "@/components/Core/SafeLink";
import pw_maze_white from "../../assets/images/patterns/pw_maze_white.png";
import az_subtle from "../../assets/images/patterns/az_subtle.png";
import blizzard from "../../assets/images/patterns/blizzard.png";
import bright_squares from "../../assets/images/patterns/bright_squares.png";
import denim from "../../assets/images/patterns/denim.png";
import fancy_deboss from "../../assets/images/patterns/fancy_deboss.png";
import fancy from "../../assets/images/patterns/fancy.jpg";
import gray_jean from "../../assets/images/patterns/gray_jean.png";
import honey_im_subtle from "../../assets/images/patterns/honey_im_subtle.png";
import linedpaper from "../../assets/images/patterns/linedpaper.png";
import linen from "../../assets/images/patterns/linen.png";
import none from "../../assets/images/patterns/none.png";
import random_grey_variations from "../../assets/images/patterns/random_grey_variations.png";
import skin_side_up from "../../assets/images/patterns/skin_side_up.png";
import stitched_wool from "../../assets/images/patterns/stitched_wool.png";
import straws from "../../assets/images/patterns/straws.png";
import stripes from "../../assets/images/patterns/stripes.png";
import subtle_grunge from "../../assets/images/patterns/subtle_grunge.png";
import swirl_pattern from "../../assets/images/patterns/swirl_pattern.png";
import textured_stripes from "../../assets/images/patterns/textured_stripes.png";
import tiling from "../../assets/images/patterns/tiling.png";
import wild_oliva from "../../assets/images/patterns/wild_oliva.png";
import worn_dots from "../../assets/images/patterns/worn_dots.png";
import { useTranslations } from "next-intl";

const LayoutSwitch = ({ bgPatterns }) => {
  const { themeSwitcher, setThemeSwitcher, setBgPatterns } =
    useContext(GlobalContext);
  const [showPatterns, setShowPatterns] = useState(
    themeSwitcher.boxedLayout == 1 ? true : false
  );
    const t = useTranslations();
  const wideContainerVariant =
    themeSwitcher.boxedLayout !== 1 ? "primary" : "dark";
  const boxedContainerVariant =
    themeSwitcher.boxedLayout == 1 ? "primary" : "dark";
  const handleLayout = (e, type) => {
    e.preventDefault();
    setShowPatterns(type === baseTheme.layouts.boxed ? true : false);
    setThemeSwitcher({
      ...themeSwitcher,
      boxedLayout: type === baseTheme.layouts.boxed ? 1 : 0,
      bgPattern:
        type === baseTheme.layouts.boxed ? themeSwitcher.bgPattern : "none",
    });
  };
  useEffect(() => {
    if (themeSwitcher.boxedLayout == 1) {
      setShowPatterns(true);
    } else {
      setShowPatterns(false);
    }
  }, [themeSwitcher]);

  const patternsArray = {
    pw_maze_white: pw_maze_white,
    az_subtle: az_subtle,
    blizzard: blizzard,
    bright_squares: bright_squares,
    denim: denim,
    fancy_deboss: fancy_deboss,
    fancy: fancy,
    gray_jean: gray_jean,
    honey_im_subtle: honey_im_subtle,
    linedpaper: linedpaper,
    linen: linen,
    none: none,
    random_grey_variations: random_grey_variations,
    skin_side_up: skin_side_up,
    stitched_wool: stitched_wool,
    straws: straws,
    stripes: stripes,
    subtle_grunge: subtle_grunge,
    swirl_pattern: swirl_pattern,
    textured_stripes: textured_stripes,
    tiling: tiling,
    wild_oliva: wild_oliva,
    worn_dots: worn_dots,
  };

  useEffect(() => {
    function getThemeVariable(themeVar) {
      const theme = JSON.parse(localStorage.getItem("theme"));
      if (theme && theme[themeVar]) {
        return theme[themeVar];
      } else {
        return false;
      }
    }
    const bgPattern = getThemeVariable("bgPattern");
    if (bgPattern && bgPatterns && bgPatterns.length) {
      const flag = bgPatterns.map((pat) => {
        return pat.label == bgPattern;
      });
      if (flag) {
        document.querySelector(
          "body"
        ).style.backgroundImage = `url(${patternsArray[bgPattern]?.src})`;
      }
    }
  }, [bgPatterns]);

  const changepattern = (pattern) => {
    const newpatterns = bgPatterns.map((pat) => {
      pat.label == pattern.label
        ? (pat.selected = true)
        : (pat.selected = false);
      return pat;
    });
    document.querySelector("body").style.backgroundImage = `url(${
      patternsArray[pattern.label]?.src
    })`;
    setThemeSwitcher({ ...themeSwitcher, bgPattern: pattern.label });
    setBgPatterns(newpatterns);
  };
  return (
    <>
      <div className="category">
        <div className="category-headline">
          <h5>{t("layouts_switcher")}</h5>
        </div>
        <div className="options-links layout">
          <SafeLink
            href="#"
            variant={wideContainerVariant}
            onClick={(e) => handleLayout(e, baseTheme.layouts.wide)}
            className={`${
              themeSwitcher.boxedLayout !== 1 ? "active" : ""
            } layout--wide`}
          >
            {t("wide")}
          </SafeLink>
          <SafeLink
            href="#"
            variant={boxedContainerVariant}
            onClick={(e) => handleLayout(e, baseTheme.layouts.boxed)}
            className={`${
              themeSwitcher.boxedLayout == 1 ? "active" : ""
            } layout--boxed`}
          >
            {t("boxed")}
          </SafeLink>
        </div>
      </div>
      {showPatterns && (
        <div className="category pattern-wrapper">
          <div className="category-headline">
            <h5>{t("background_pattern")}</h5>
          </div>

          <div className="options-links layout-patterns">
            {bgPatterns &&
              bgPatterns.length &&
              bgPatterns.map((pattern, id) => (
                <SafeLink
                  className={`pattern ${
                    pattern.selected ? "active-pattern" : ""
                  }`}
                  key={id}
                  href="#"
                  title={pattern.label}
                  style={{
                    backgroundImage: `url(${
                      patternsArray[pattern.label]?.src
                    })`,
                  }}
                  onClick={(e) => changepattern(pattern)}
                ></SafeLink>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default LayoutSwitch;
