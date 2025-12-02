import GlobalContext from "@/context/GlobalContext";
import SafeLink from "@/components/Core/SafeLink";
import React, { useContext } from "react";
import { useTranslations } from "next-intl";

const LanguageSwitch = (data) => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const t = useTranslations();
  const handleSetLanguage = (e) => {
    e.preventDefault();
    setThemeSwitcher({ ...themeSwitcher, showLanguage: "1" });
  };
  const handleNotSetLanguage = (e) => {
    e.preventDefault();
    setThemeSwitcher({ ...themeSwitcher, showLanguage: "0" });
  };
  return (
    <div className="category">
      <div className="category-headline">
        <h5>{data.languageMenu.label}</h5>
      </div>
      <div className="options-links">
        <SafeLink
          href={"#"}
          className={`${
            themeSwitcher.showLanguage === "1"
              ? "active bg-color-light"
              : "bg-color-dark"
          }`}
          onClick={(e) => handleSetLanguage(e)}
        >
          {t("show")}
        </SafeLink>
        <SafeLink
          href={"#"}
          className={`${
            themeSwitcher.showLanguage === "0"
              ? "active bg-color-light"
              : "bg-color-dark"
          }`}
          onClick={(e) => handleNotSetLanguage(e)}
        >
          {t("hide")}
        </SafeLink>
      </div>
    </div>
  );
};

export default LanguageSwitch;
