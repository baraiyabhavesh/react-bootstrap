import GlobalContext from "@/context/GlobalContext";
import React, { useContext } from "react";

const HeaderSwitcher = (data) => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const handleHeaderSwitcher = (e) => {
    setThemeSwitcher({ ...themeSwitcher, headerStyle: e.target.value });
  };
  return (
    <div className="category">
      <h5>{data.headerData.label}</h5>
      <div className="custom-select-1 pre-loader">
        <select
          className="form-select form-control loading-overlay-select h-auto"
          onChange={handleHeaderSwitcher}
          value={themeSwitcher.headerStyle}
        >
          {data.headerData &&
            data.headerData.labelValueArray &&
            data.headerData.labelValueArray.length > 0 &&
            data.headerData.labelValueArray.map((header, index) => {
              return (
                <option value={header.value} key={index}>
                  {header.label}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default HeaderSwitcher;
