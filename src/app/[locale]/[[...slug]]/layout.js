import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { GlobalProvider } from "@/context/GlobalContext";
import { i18n } from "../../../../i18n-config";
import Layout from "@/components/Layout";
import getAPIData from "@/utils/API";
import { NextIntlClientProvider } from "next-intl";
import "@/scss/main.scss";
import Maintenance from "@/components/Maintenance";

const work_sans_font = localFont({
  src: [
    {
      path: "../../../assets/fonts/work-sans/WorkSans-Regular.woff2",
      weight: "400",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/work-sans/WorkSans-Light.woff2",
      weight: "300",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/work-sans/WorkSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/work-sans/WorkSans-Bold.woff2",
      weight: "700",
      style: "normal",
      display: "swap",
      preload: false,
    },
  ],
  fallback: ["sans-serif"],
  variable: "--font-work-sans",
  display: "swap",
  preload: false,
});

export const open_sans_font = localFont({
  src: [
    {
      path: "../../../assets/fonts/open-sans/Open-Sans-Regular.woff2",
      weight: "400",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/open-sans/Open-Sans-Light.woff2",
      weight: "300",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/open-sans/Open-Sans-SemiBold.woff2",
      weight: "600",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/open-sans/Open-Sans-Bold.woff2",
      weight: "700",
      style: "normal",
      display: "swap",
      preload: false,
    },
  ],
  fallback: ["sans-serif"],
  variable: "--open-sans",
  display: "swap",
  preload: false,
});

const montserrat_font = localFont({
  src: [
    {
      path: "../../../assets/fonts/montserrat/Montserrat-Regular.woff2",
      weight: "400",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/montserrat/Montserrat-Light.woff2",
      weight: "300",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/montserrat/Montserrat-SemiBold.woff2",
      weight: "600",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/montserrat/Montserrat-Bold.woff2",
      weight: "700",
      style: "normal",
      display: "swap",
      preload: false,
    },
  ],
  fallback: ["sans-serif"],
  variable: "--montserrat",
  display: "swap",
  preload: false,
});

const { locales, defaultLocale } = i18n;

export async function generateMetadata({ params }) {
  const { pageData } = await getAllData(params);
  let pageTitle,
    generalTitlePrefix,
    generalTitleSufix,
    generalMetaDescription,
    generalMetaKeywords,
    favicon,
    ogImage,
    ogTitle,
    ogDescription;
  if (pageData && pageData.data) {
    const nsSeo = pageData?.data?.page?.constants?.ns_seo;
    const nsBaseTheme = pageData?.data?.page?.constants?.ns_basetheme;
    pageTitle = pageData.data.meta?.title || "";
    generalTitlePrefix = nsSeo?.seo_title_prefix?.value || "";
    generalTitleSufix = nsSeo?.seo_title_sufix?.value || "";
    generalMetaDescription = nsSeo?.seo_meta_description?.value || "";
    generalMetaKeywords = nsSeo?.seo_meta_keywords?.value || "";
    favicon = nsBaseTheme?.favicon?.value || "";
    ogImage = pageData?.data?.meta?.ogImage?.publicUrl || "";
    ogTitle = pageData?.data?.meta?.ogTitle || "";
    ogDescription = pageData?.data?.meta?.ogDescription || "";
  }

  const resolvedTitle = [generalTitlePrefix, pageTitle, generalTitleSufix]
    .filter((value) => value && value.trim().length)
    .join(" - ");

  return {
    title: resolvedTitle || undefined,
    description: ogDescription || generalMetaDescription || undefined,
    keywords: generalMetaKeywords || undefined,
    icons: {
      icon: favicon ? `${process.env.NEXT_PUBLIC_API_URL}/${favicon}` : undefined,
    },
    openGraph: {
      title: ogTitle || pageTitle || undefined,
      description: ogDescription || generalMetaDescription || undefined,
      images: [
        {
          url: ogImage || undefined,
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
  };
}

const getAllData = async (params) => {
  const { locale, slug } = params;
  let pageData;
  const { defaultLocale } = i18n;

  var paramSlug;
  if (slug && slug.length > 2) {
    paramSlug = slug.toString().replaceAll(",", "/");
  } else if (slug && slug.length > 1) {
    paramSlug = slug.toString().replaceAll(",", "/");
  } else if (slug) {
    if (slug[0] === "page") {
      paramSlug = "";
    } else {
      paramSlug = slug[0];
    }
  }

  pageData = await getAPIData(
    `${locale === defaultLocale ? "" : `${locale}/`}${
      paramSlug ? paramSlug : ""
    }`
  );
  return {
    pageData,
  };
};

export default async function LocaleLayout({ children, params }) {
  const { pageData } = await getAllData(params);
  let locale = params.locale;
  let messages;
  try {
    messages = (await import(`../../../assets/localization/${locale}.json`))
      .default;
  } catch (error) {
    notFound();
  }
  if (!locales.includes(locale)) notFound();

  unstable_setRequestLocale(locale);
  let maintenance = pageData?.data?.page?.constants?.ns_basetheme;

  return (
    <html
      lang={defaultLocale}
      className={`${work_sans_font.variable} ${open_sans_font.variable} ${montserrat_font.variable}`}
    >
      <body>
        <GlobalProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {maintenance?.maintenance_mode?.value === "1" ? (
              <Maintenance
                headline={maintenance?.maintenance_headline?.value}
                message={maintenance?.maintenance_message?.value}
              />
            ) : (
              <Layout pageData={pageData}>{children}</Layout>
            )}
          </NextIntlClientProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
