import GlobalContext from "@/context/GlobalContext";
import { useTranslations } from "next-intl";
import { useContext } from "react";
const LoaderSwitch = (data) => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const t = useTranslations()
  const handleHeaderSwitcher = (e) => {
    setThemeSwitcher({ ...themeSwitcher, loader: e.target.value });
    document.body.classList.add("loading-overlay-showing");
    setTimeout(() => {
      document.body.classList.remove("loading-overlay-showing");
    }, 3000);
  };

  return (
    <>
      <div className="category">
        <h5>{data.loader.label}</h5>
        <div className="custom-select-1 pre-loader">
          <select
            className="form-select form-control loading-overlay-select h-auto"
            onChange={handleHeaderSwitcher}
            value={themeSwitcher.loader}
          >
            {data.loader &&
              data.loader.labelValueArray &&
              data.loader.labelValueArray.length > 0 &&
              data.loader.labelValueArray.map((load, index) => {
                return (
                  <option value={load.value} key={index}>
                    {load.label}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </>
  );
};
export default LoaderSwitch;
