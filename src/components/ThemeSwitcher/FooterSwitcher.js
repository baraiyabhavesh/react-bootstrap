import GlobalContext from "@/context/GlobalContext";
import React, { useContext } from "react";

const FooterSwitcher = (data) => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const handleFooterSwitcher = (e) => {
    setThemeSwitcher({ ...themeSwitcher, footerStyle: e.target.value });
  };
  return (
    <div className="category">
      {/* <h5>{t("footer_menu")}</h5> */}
      <h5>{data.footerData.label}</h5>
      <div className="custom-select-1 pre-loader">
        <select
          className="form-select form-control loading-overlay-select h-auto"
          onChange={handleFooterSwitcher}
          value={themeSwitcher.footerStyle}
        >
          {data.footerData &&
            data.footerData.labelValueArray &&
            data.footerData.labelValueArray.length > 0 &&
            data.footerData.labelValueArray.map((footer, index) => {
              return (
                <option value={footer.value} key={index}>
                  {footer.label}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default FooterSwitcher;
