"use client";

import { useContext, useState, useEffect } from "react";
import ColorSwitcher from "./ColorSwitcher";
import GlobalContext from "@/context/GlobalContext";
import { FaBullseye } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import SafeLink from "@/components/Core/SafeLink";
import FontFamilySwitch from "./FontFamilySwitch";
// import LoaderSwitch from "./LoaderSwitch";
import LayoutSwitch from "./LayoutSwitch";
import BackgroundSwitch from "./BackgroundSwitch";
import WebsiteSwitch from "./WebsiteSwitch";
import { Button } from "react-bootstrap";
import LanguageSwitch from "./LanguageSwitch";
import SearchSwitch from "./SearchSwitch";
import HeaderSwitcher from "./HeaderSwitcher";
import FooterSwitcher from "./FooterSwitcher";
import BreadcrumbSwitcher from "./BreadcrumbSwitcher";
import { FaCartShopping } from "react-icons/fa6";
import { useTranslations } from "next-intl";

let themeInfo;

// if (typeof window !== 'undefined') {
//     themeInfo = JSON.parse(localStorage.getItem("theme")) || {};
// }

const emptyEntry = {
  value: "",
  label: "",
  default_value: "",
  labelValueArray: [],
};

const ThemeSwitcher = ({ styleData, onePageUrl }) => {
  const {
    themeSwitcher,
    setThemeSwitcher,
    bgPatterns,
    setBgPatterns,
    setWebsiteType,
    websiteType,
  } = useContext(GlobalContext);
  const safeStyleData = styleData || {};
  const primary_color = safeStyleData["primary-color"] || emptyEntry;
  const secondary_color = safeStyleData["secondary-color"] || emptyEntry;
  const text_color = safeStyleData["text-color"] || emptyEntry;
  const secondary_light_color =
    safeStyleData["secondary-light-color"] || emptyEntry;
  const site_fonts_link = safeStyleData["site_fonts_link"] || emptyEntry;
  const site_font_family_name =
    safeStyleData["site_font_family_name"] || emptyEntry;
  const bg_pattern = safeStyleData["bg_pattern"] || emptyEntry;
  const bg_dark = safeStyleData["bg_dark"] || emptyEntry;
  // let breadcrumb_style = styleData["breadcrumbStyle"];
  const boxed_layout = safeStyleData["boxed_layout"] || emptyEntry;
  const languagemenu = safeStyleData["languagemenu"] || emptyEntry;
  const searchbar = safeStyleData["searchbar"] || emptyEntry;
  const headerMenu = safeStyleData["headerMenu"] || emptyEntry;
  const footerMenu = safeStyleData["footerMenu"] || emptyEntry;
  const breadcrumb = safeStyleData["breadcrumbStyle"] || emptyEntry;
  const loader = safeStyleData["loader"] || emptyEntry;

  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    themeInfo = JSON.parse(localStorage.getItem("theme")) || {};
  }, [themeInfo]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false),
        setWidth(window.innerWidth);
    });
  }, [width]);
  useEffect(() => {
    window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false),
      setWidth(window.innerWidth);
  }, []);

  const initThemeSwitcher = {
    sideBarVisible: themeInfo?.sideBarVisible || false,
    primary: themeInfo?.primary || "",
    fontFamilyLink: themeInfo?.fontFamilyLink || "",
    fontFamilyName: themeInfo?.fontFamilyName || "",
    loader: themeInfo?.loader || "none",
    themeColor: themeInfo?.themeColor || "light",
    boxedLayout: themeInfo?.boxedLayout || 0,
    showLanguage: themeInfo?.showLanguage || languagemenu.value,
    showSearch: themeInfo?.showSearch || searchbar.value,
    headerStyle: themeInfo?.headerStyle || headerMenu.value,
    footerStyle: themeInfo?.footerStyle || footerMenu.value,
    breadcrumbStyle: themeInfo?.breadcrumbStyle || breadcrumb.value,
  };

  const t = useTranslations();

  const [primary, setPrimary] = useState({
    visible: false,
    color: primary_color?.value,
  });

  const [secondary, setSecondary] = useState({
    visible: false,
    color: secondary_color?.value,
  });

  const [text, setText] = useState({
    visible: false,
    color: text_color?.value,
  });
  const [secondaryLight, setSecondaryLight] = useState({
    visible: false,
    color: secondary_light_color?.value,
  });

  useEffect(() => {
    function getThemeVariable(themeVar) {
      const theme = JSON.parse(localStorage.getItem("theme"));
      if (theme && theme[themeVar]) {
        return theme[themeVar];
      } else {
        return false;
      }
    }
    setWebsiteType(localStorage.getItem("wetsiteType"));
    setPrimary({
      ...primary,
      color: getThemeVariable("primary")
        ? getThemeVariable("primary")
        : primary_color.value,
    });
    setSecondary({
      ...secondary,
      color: getThemeVariable("secondary")
        ? getThemeVariable("secondary")
        : secondary_color.value,
    });
    setText({
      ...text,
      color: getThemeVariable("text")
        ? getThemeVariable("text")
        : text_color.value,
    });
    setSecondaryLight({
      ...secondaryLight,
      color: getThemeVariable("secondaryLight")
        ? getThemeVariable("secondaryLight")
        : secondary_light_color.value,
    });
    setThemeSwitcher(initThemeSwitcher);
    // setBgPatterns(bg_pattern?.labelValueArray);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      `${primary.color}`
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      `${secondary.color}`
    );
    document.documentElement.style.setProperty("--text-color", `${text.color}`);
    document.documentElement.style.setProperty(
      "--secondary-color-light",
      `${secondaryLight.color}`
    );
    document.body.style.setProperty("--text-color", `${text.color}`);
  }, [primary, secondary, secondaryLight, text]);

  useEffect(() => {
    if (themeSwitcher.boxedLayout == 1) {
      document.body.classList.add("boxed");
    } else {
      document.body.classList.remove("boxed");
    }
    if (themeSwitcher.themeColor == "dark") {
      document.body.classList.add("dark");
      document.documentElement.style.setProperty("--text-color", "#fff");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.style.setProperty(
        "--text-color",
        `${text.color}`
      );
    }
  }, [themeSwitcher]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const theme = {
      primary: primary.color,
      secondary: secondary.color,
      text: text.color,
      secondaryLight: secondaryLight.color,
      fontFamilyLink: themeSwitcher.fontFamilyLink,
      fontFamilyName: themeSwitcher.fontFamilyName,
      boxedLayout: themeSwitcher.boxedLayout,
      themeColor: themeSwitcher.themeColor,
      bgPattern: themeSwitcher.bgPattern,
      showLanguage: themeSwitcher.showLanguage,
      showSearch: themeSwitcher.showSearch,
      headerStyle: themeSwitcher.headerStyle,
      footerStyle: themeSwitcher.footerStyle,
      breadcrumbStyle: themeSwitcher.breadcrumbStyle,
      loader: themeSwitcher.loader,
      websiteType: websiteType,
    };
    localStorage.setItem("theme", JSON.stringify(theme));
    handleSettingsBar(e);
  };

  const resetTheme = () => {
    localStorage.removeItem("theme");

    setPrimary({
      ...primary,
      color: primary_color.value,
    });
    setSecondary({
      ...secondary,
      color: secondary_color.value,
    });
    setText({
      ...text,
      color: text_color.value,
    });
    setSecondaryLight({
      ...secondaryLight,
      color: secondary_light_color.value,
    });
    setThemeSwitcher({
      ...themeSwitcher,
      fontFamilyLink: site_fonts_link.default_value,
      fontFamilyName: site_font_family_name.default_value,
      boxedLayout: boxed_layout.default_value,
      sideBarVisible: !themeSwitcher.sideBarVisible,
      showLanguage: languagemenu.value,
      showSearch: searchbar.value,
      headerStyle: headerMenu.value,
      footerStyle: footerMenu.value,
      breadcrumbStyle: breadcrumb.value,
      loader: loader.value,
    });
  };
  const handleSettingsBar = (e) => {
    setThemeSwitcher({
      ...themeSwitcher,
      sideBarVisible: !themeSwitcher.sideBarVisible,
    });
    e.preventDefault();
  };

  return (
    <>
      <div
        id="styleSwitcher"
        className={`style-switcher ${
          themeSwitcher.sideBarVisible ? "active" : ""
        } ${isMobile ? "d-none" : ""}`}
      >
        <div className="style-switcher-action-links">
          <SafeLink
            href={"#"}
            onClick={(e) => {
              handleSettingsBar(e);
            }}
            className="style-switcher-open"
            scroll={false}
          >
            <FaGears />
          </SafeLink>
          <SafeLink
            href="https://t3planet.com/t3-bootstrap-multipurpose-typo3-template"
            target="_blank"
          >
            <FaCartShopping />
          </SafeLink>
          <SafeLink href="/bootstrap" target="_self">
            <FaBullseye />
          </SafeLink>
        </div>
        <div className="style-switcher-wrap">
          <form id="myForm" onSubmit={handleSubmit}>
            <div className="form-inner">
              <div className="category">
                <div className="category-headline">
                  <h4>{t("theme_color")}</h4>
                </div>
                <ColorSwitcher
                  title={primary_color.label}
                  color={primary}
                  setColor={setPrimary}
                  colorType="primary"
                />
                <ColorSwitcher
                  title={secondary_color.label}
                  color={secondary}
                  setColor={setSecondary}
                  colorType="secondary"
                />
                <ColorSwitcher
                  title={text_color.label}
                  color={text}
                  setColor={setText}
                  colorType="text"
                />
                <ColorSwitcher
                  title={secondary_light_color.label}
                  color={secondaryLight}
                  setColor={setSecondaryLight}
                  colorType="secondary-light"
                />
              </div>
              <FontFamilySwitch />
              <HeaderSwitcher headerData={headerMenu} />
              <FooterSwitcher footerData={footerMenu} />
              <BreadcrumbSwitcher breadcrumbData={breadcrumb} />
              <LayoutSwitch bgPatterns={bg_pattern?.labelValueArray} />
              <BackgroundSwitch
                setThemeSwitcher={setThemeSwitcher}
                themeSwitcher={themeSwitcher}
              />
              <LanguageSwitch languageMenu={languagemenu} />
              <SearchSwitch searchbar={searchbar} />
              <WebsiteSwitch onePageUrl={onePageUrl} />
            </div>
            <div className="style-switcher-buttons options-links">
              <input type="hidden" name="no_cache" value="1" />
              <Button type="submit" className="submit" variant="primary">
                {t("submit")}
              </Button>
              <Button type="button" className="reset" onClick={resetTheme}>
                {t("reset")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ThemeSwitcher;
