import { theme as baseTheme } from "@/utils";
import { useContext } from "react";
import SafeLink from "@/components/Core/SafeLink";
import { useTranslations } from "next-intl";

const BackgroundSwitch = ({ setThemeSwitcher, themeSwitcher }) => {
  // const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const t = useTranslations();
  const lightThemeVariant =
    themeSwitcher.themeColor !== "dark" ? "Primary" : "Dark";
  const darkThemeVariant =
    themeSwitcher.themeColor == "dark" ? "Primary" : "Dark";

  const handleBackground = (e, type) => {
    e.preventDefault();
    setThemeSwitcher({
      ...themeSwitcher,
      themeColor: type === baseTheme.background.dark ? "dark" : "light",
    });
  };

  return (
    <div className="category">
      <div className="category-headline">
        <h5>{t("background_color")}</h5>
      </div>
      <div className="options-links site-bg">
        <SafeLink
          href="#"
          variant={lightThemeVariant}
          onClick={(e) => handleBackground(e, baseTheme.background.light)}
          className={`${
            themeSwitcher.themeColor !== "dark" ? "active" : ""
          } bg-color-light`}
        >
          {t("light")}
        </SafeLink>
        <SafeLink
          href="#"
          variant={darkThemeVariant}
          onClick={(e) => handleBackground(e, baseTheme.background.dark)}
          className={`${
            themeSwitcher.themeColor == "dark" ? "active" : ""
          } bg-color-dark`}
        >
          {t("dark")}
        </SafeLink>
      </div>
    </div>
  );
};
export default BackgroundSwitch;
