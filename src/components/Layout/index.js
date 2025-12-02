"use client";

import { useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import GoToTop from "../Core/GoToTop";
import Header from "../Header";
import Footer from "../Footer";
import CookieConsent from "react-cookie-consent";
import SafeLink from "@/components/Core/SafeLink";

const Layout = ({ children, pageData }) => {
  const {
    menuItems,
    setMenuItems,
    footerData,
    setFooterData,
    setPageData,
    setBreadcrumbs,
    setBreadcrumbStyle,
    setSidebarMenus,
    setActiveSidebar,
    themeSwitcher,
    setAvailableLanguage,
    setSidebarMenusDetails,
    cookie,
    setCookie,
    setLogoData,
  } = useContext(GlobalContext);

  const safePage = pageData?.data?.page || {};
  const currentPageFooter = safePage?.footerLayout;
  const currentPageHeader = safePage?.headerLayout;
  const nsBaseTheme = safePage?.constants?.ns_basetheme || {};
  const nsStyle = safePage?.constants?.ns_style || {};
  const websiteType = nsBaseTheme?.websiteType?.value || "normal";
  const onePageNav = nsBaseTheme?.onepage_data?.slug || [];
  const [enable_style_switcher, set_enable_style_switcher] = useState(1);

  const normalizeLinkValue = (link) => {
    if (!link) return "";
    if (typeof link === "string") return link;
    return String(link || "");
  };

  useEffect(() => {
    if (!pageData?.data) return;

    if (pageData.data.page) {
      const subNav = pageData.data.page.subNavigation || [];
      for (const item of subNav) {
        const children = item.children || [];
        for (const subItem of children) {
          if (subItem?.title === "Content" && subItem?.active) {
            setSidebarMenus({
              ...subItem,
              link: normalizeLinkValue(subItem.link),
            });
            setActiveSidebar(true);
          }
        }
      }

      if (pageData.data.content?.colPos5?.length) {
        for (const { content } of pageData.data.content.colPos5) {
          setSidebarMenusDetails(content);
        }
      }

      let footer = null;
      // Try multiple possible locations for footer data
      if (pageData.data.content?.colPos2?.length) {
        footer = pageData.data.content.colPos2[0];
      } else if (pageData.data.content?.colPos3?.length) {
        footer = pageData.data.content.colPos3[0];
      } else if (pageData.data.footer) {
        footer = pageData.data.footer;
      } else if (pageData.data.page?.footer) {
        footer = pageData.data.page.footer;
      } else if (pageData.page?.footer) {
        // Additional fallback for original response structure
        footer = pageData.page.footer;
      } else if (pageData.footer) {
        // Last resort: check root level
        footer = pageData.footer;
      }
      if (footer) setFooterData(footer);

      let breadcrumb = pageData.data.breadcrumbs || [];
      breadcrumb = breadcrumb.map((item) => ({
        ...item,
        link: normalizeLinkValue(item.link),
      }));

      const styleConstants = nsStyle || {};

      setPageData(pageData.data);
      setBreadcrumbs(breadcrumb);
      setBreadcrumbStyle(styleConstants?.breadcrumbStyle?.value || "1");
      setAvailableLanguage(pageData.data.i18n);
      setLogoData(pageData?.data?.page?.constants?.ns_basetheme);
      set_enable_style_switcher(
        styleConstants?.enable_style_switcher?.value || 1
      );
      setCookie(pageData?.data?.page?.cookie);
    }
  }, [pageData, setFooterData, setPageData, setBreadcrumbs, setBreadcrumbStyle, setAvailableLanguage, setLogoData, setSidebarMenusDetails, setActiveSidebar, setSidebarMenus, setCookie]);

  useEffect(() => {
    if (!pageData?.data) return;
  
    const page = pageData.data.page || {};
    const data = pageData.data || {};
  
    let finalMenu = [];
    
    // Strategy: Use subNavigation's root children as the main navigation
    // subNavigation contains the full site tree, with root item having children that should be in header
    const subNav = data.subNavigation || page.subNavigation || [];
    
    if (Array.isArray(subNav) && subNav.length > 0) {
      // Find the root item (pid === 0 or is_siteroot === 1) and use its children
      const rootItem = subNav.find(item => 
        item.data?.pid === 0 || 
        item.data?.is_siteroot === 1 || 
        item.data?.is_siteroot === true ||
        (!item.data?.pid && item.link === "/")
      );
      
      if (rootItem && rootItem.children && Array.isArray(rootItem.children) && rootItem.children.length > 0) {
        // Use root item's children as the main navigation
        finalMenu = rootItem.children;
      } else if (subNav.length > 0) {
        // If no root item found, use top-level subNavigation items (pid === 1 or direct children of root)
        finalMenu = subNav.filter(item => {
          const pid = item.data?.pid;
          // Include items that are direct children of root (pid === 1) or have no pid
          return pid === 1 || (!pid && item.link !== "/");
        });
        
        // If still empty, use all subNavigation items except the root
        if (finalMenu.length === 0) {
          finalMenu = subNav.filter(item => item.data?.pid !== 0 && item.link !== "/");
        }
      }
    }
    
    // Fallback: If subNavigation doesn't work, try mainNavigation with children attached
    if (finalMenu.length === 0) {
      if (data.mainNavigation && Array.isArray(data.mainNavigation) && data.mainNavigation.length > 0) {
        finalMenu = data.mainNavigation;
      } else if (page.mainNavigation && Array.isArray(page.mainNavigation) && page.mainNavigation.length > 0) {
        finalMenu = page.mainNavigation;
      } else {
        const tree = Array.isArray(page.subNavigationTree) ? page.subNavigationTree : [];
        if (tree.length > 0) {
          finalMenu = tree;
        }
      }
    }
    
    // Filter out unwanted items (footer pages, one-page menu, test/qa pages)
    if (finalMenu.length > 0) {
      finalMenu = finalMenu.filter(item => {
        if (!item || !item.title) return false;
        
        const title = (item.title || "").toLowerCase().trim();
        const link = (item.link || item.data?.slug || "").toLowerCase();
        
        // Filter out footer menu items
        if (title.includes("footer") || title.includes("footer pages")) {
          return false;
        }
        // Filter out one-page menu items
        if (title.includes("one page") || title.includes("one-page")) {
          return false;
        }
        // Filter out test/qa pages
        if (title.startsWith("qa") || title.startsWith("test") || link.includes("/qa") || link.includes("/test")) {
          return false;
        }
        
        // Check if item has footerMenu flag set (TYPO3 property)
        if (item.data?.footerMenu && item.data.footerMenu !== 0) {
          return false;
        }
        
        return true;
      });
    }
  
    if (JSON.stringify(menuItems) !== JSON.stringify(finalMenu)) {
      setMenuItems(finalMenu);
    }
  }, [pageData, menuItems, setMenuItems]);
  

  useEffect(() => {
    if (typeof document === "object" && cookie) {
      try {
        document.documentElement.style.setProperty(
          "--cookieBtnBgColor",
          `${cookie?.settings?.palette.button.background}`
        );
        document.documentElement.style.setProperty(
          "--cookieBtnTextColor",
          `${cookie?.settings?.palette.button.text}`
        );
      } catch (e) {}
    }
  }, [cookie]);

  return (
    <>
      <div className="body">
        {pageData?.data?.appearance?.backendLayout === "empty" ? null : (
          <Header
            currentPageHeaderLayout={currentPageHeader}
            websiteType={websiteType}
            pageData={pageData}
          />
        )}
        {children}
        {pageData?.data?.appearance?.backendLayout === "empty" ? null : footerData && (
          <Footer
            currentPageFooterLayout={currentPageFooter}
            enable_style_switcher={enable_style_switcher}
            styleData={nsStyle}
            onePageUrl={onePageNav}
          />
        )}
      </div>

      <GoToTop />

      {cookie && cookie.message && (
        <CookieConsent
          location="bottom"
          buttonText={cookie.dismiss}
          enableDeclineButton
          declineButtonText={cookie.deny}
          style={{
            background: cookie.settings?.palette?.popup?.background,
            right: "16px",
            bottom: "16px",
            maxWidth: "384px",
            left: "auto",
          }}
        >
          <p className="mb-0" style={{ color: cookie.settings?.palette?.popup?.text }}>
            {cookie.message}
            {cookie.settings?.url && (
              <SafeLink
                href={`${cookie.settings.url}`}
                className="mb-0 ml-5 text-white text-decoration-underline"
              >
                {cookie.link}
              </SafeLink>
            )}
          </p>
        </CookieConsent>
      )}
    </>
  );
};

export default Layout;
