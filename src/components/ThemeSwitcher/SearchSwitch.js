import GlobalContext from "@/context/GlobalContext";
import { useTranslations } from 'next-intl';
import SafeLink from "@/components/Core/SafeLink";
import React, { useContext } from "react";

const SearchSwitch = (data) => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const t = useTranslations()
  const handleSetLanguage = (e) => {
    e.preventDefault();
    setThemeSwitcher({ ...themeSwitcher, showSearch: "1" });
  };
  const handleNotSetLanguage = (e) => {
    e.preventDefault();
    setThemeSwitcher({ ...themeSwitcher, showSearch: "0" });
  };
  return (
    <div className="category">
      <div className="category-headline">
        <h5>{data.searchbar.label}</h5>
      </div>
      <div className="options-links">
        <SafeLink
          href={"#"}
          className={`${
            themeSwitcher.showSearch === "1"
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
            themeSwitcher.showSearch === "0"
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

export default SearchSwitch;
