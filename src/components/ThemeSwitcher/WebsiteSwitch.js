import React, { useContext } from "react";
import SafeLink from "@/components/Core/SafeLink";
import GlobalContext from "@/context/GlobalContext";
import { useTranslations } from "next-intl";
import { useRouter, redirect } from "next/navigation";

const WebsiteSwitch = ({ onePageUrl }) => {
  const { websiteType } = useContext(GlobalContext);

  const router = useRouter();
  const t = useTranslations();

  const handlewebsitetype = (e) => {
    e.preventDefault();
    let website_type = e.target.attributes.value.value;
    localStorage.setItem("wetsiteType", website_type);
    if (website_type !== "normal") {
      router.push(`${onePageUrl}`);
    } else {
      router.push("/");
    }
  };
  return (
    <>
      <div className="category">
        <div className="category-headline">
          <h5>{t("website_type")}</h5>
        </div>
        <div className="options-links">
          <SafeLink
            href={"#"}
            className={`website-normal ${
              websiteType !== "single" ? "active" : ""
            }`}
            onClick={(e) => handlewebsitetype(e)}
            value="normal"
          >
            {t("normal")}
          </SafeLink>
          <SafeLink
            href={"#"}
            className={`website-single ${
              websiteType === "single" ? "active" : ""
            }`}
            onClick={(e) => handlewebsitetype(e)}
            value="single"
          >
            {t("one_page")}
          </SafeLink>
        </div>
      </div>
    </>
  );
};

export default WebsiteSwitch;
