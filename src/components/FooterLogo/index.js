import React, { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SafeLink from "@/components/Core/SafeLink";

const FooterLogo = () => {
  const gcontext = useContext(GlobalContext);
  const { themeSwitcher, logoData } = gcontext;
  const footerData = gcontext.footerData?.content?.pi_flexform_content;
  const { themeColor } = themeSwitcher;

  const footerLogo =
    logoData.footerLogo && logoData.footerLogo.value
      ? process.env.NEXT_PUBLIC_API_URL + logoData.footerLogo.value
      : "";
  const footerLogoLight =
    logoData.footerLightLogo && logoData.footerLightLogo.value
      ? process.env.NEXT_PUBLIC_API_URL + logoData.footerLightLogo.value
      : "";

  return (
    <div className="logo">
      <SafeLink href="#">
        <span>
          {themeColor === "dark" ? (
            <>
              {footerLogoLight && (
                <LazyLoadImage
                  src={footerLogoLight}
                  height={logoData?.logo_height?.value}
                  width={logoData?.logo_width?.value}
                />
              )}
            </>
          ) : (
            <>
              {footerLogo && (
                <LazyLoadImage
                  src={footerLogo}
                  height={logoData?.logo_height?.value}
                  width={logoData?.logo_width?.value}
                />
              )}
            </>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: footerData?.brandname }}
            className="navbar-brand"
          ></div>
        </span>
      </SafeLink>
    </div>
  );
};

export default FooterLogo;
