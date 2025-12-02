import GlobalContext from "@/context/GlobalContext";
import React, { useContext } from "react";

const BreadcrumbSwitcher = (data) => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const handleBreadcrumbSwitcher = (e) => {
    setThemeSwitcher({ ...themeSwitcher, breadcrumbStyle: e.target.value });
  };
  return (
    <div className="category">
      <h5>{data.breadcrumbData.label}</h5>
      <div className="custom-select-1 pre-loader">
        <select
          className="form-select form-control loading-overlay-select h-auto"
          value={themeSwitcher.breadcrumbStyle}
          onChange={handleBreadcrumbSwitcher}
        >
          {data.breadcrumbData &&
            data.breadcrumbData.labelValueArray &&
            data.breadcrumbData.labelValueArray.length > 0 &&
            data.breadcrumbData.labelValueArray.map((breadcrumb, index) => {
              return (
                <option value={breadcrumb.value} key={index}>
                  {breadcrumb.label}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default BreadcrumbSwitcher;
