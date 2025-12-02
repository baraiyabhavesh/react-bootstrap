import React, { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import SafeLink from "@/components/Core/SafeLink";
import Image from "next/image";

const Logo = () => {
  const gcontext = useContext(GlobalContext);
  const { themeSwitcher, logoData = {} } = gcontext;
  const { themeColor } = themeSwitcher || {};
  const headerLogo =
    logoData?.logo?.value
      ? process.env.NEXT_PUBLIC_API_URL + logoData.logo.value
      : "";
  const headerLogoLight =
    logoData?.lightLogo?.value
      ? process.env.NEXT_PUBLIC_API_URL + logoData.lightLogo.value
      : "";

  return (
    <React.Fragment>
      <SafeLink className="logo" href={"/"}>
        <span>
          {themeColor === "dark" ? (
            <>
              {headerLogoLight ? (
                <Image
                  src={headerLogoLight}
                  height={logoData?.logo_height?.value || 40}
                  width={logoData?.logo_width?.value || 120}
                  alt="logo_light"
                />
              ) : null}
            </>
          ) : (
            <>
              {headerLogo ? (
                <Image
                  src={headerLogo}
                  height={logoData?.logo_height?.value || 40}
                  width={logoData?.logo_width?.value || 120}
                  alt="logo"
                />
              ) : null}
            </>
          )}

          {logoData && logoData.brandName && logoData.brandName.value
            ? logoData.brandName.value
            : ""}
        </span>
      </SafeLink>
    </React.Fragment>
  );
};

export default Logo;
