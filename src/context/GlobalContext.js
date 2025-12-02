"use client";
import { createContext, useState } from "react";
const GlobalContext = createContext();
export default GlobalContext;

// const initThemeSwitcher = {
//   sideBarVisible: themeInfo?.sideBarVisible || false,
//   primary: themeInfo?.primary || "",
//   fontFamilyLink: themeInfo?.fontFamilyLink || "",
//   fontFamilyName: themeInfo?.fontFamilyName || "",
//   loader: themeInfo?.loader || "none",
//   themeColor: themeInfo?.themeColor || 'light',
//   boxedLayout: themeInfo?.boxedLayout || 0,
//   showLanguage: themeInfo?.showLanguage || false
// };

const GlobalProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  const [themeSwitcher, setThemeSwitcher] = useState({});
  const [breadcrumbStyle, setBreadcrumbStyle] = useState(null);
  const [websiteType, setWebsiteType] = useState("normal");
  const [sidebarMenus, setSidebarMenus] = useState(null);
  const [sidebarMenusDetails, setSidebarMenusDetails] = useState(null);
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [loader, setLoader] = useState("cubes");
  const [cookie, setCookie] = useState(null);
  const [bgPatterns, setBgPatterns] = useState([]);
  const [availbaleLanguage, setAvailableLanguage] = useState(null);
  const [pageChange, setPageChange] = useState(false);
  const [logoData, setLogoData] = useState({});
  const [videoModalURL, setVideoModalURL] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        menuItems,
        setMenuItems,
        footerData,
        setFooterData,
        pageData,
        setPageData,
        setBreadcrumbs,
        breadcrumbs,
        themeSwitcher,
        setThemeSwitcher,
        breadcrumbStyle,
        setBreadcrumbStyle,
        websiteType,
        setWebsiteType,
        sidebarMenus,
        setSidebarMenus,
        sidebarMenusDetails,
        setSidebarMenusDetails,
        activeSidebar,
        setActiveSidebar,
        loader,
        setLoader,
        setBgPatterns,
        bgPatterns,
        availbaleLanguage,
        setAvailableLanguage,
        pageChange,
        setPageChange,
        cookie,
        setCookie,
        logoData,
        setLogoData,
        videoModalURL,
        setVideoModalURL,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider };
