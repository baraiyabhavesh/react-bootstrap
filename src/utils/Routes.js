// src/utils/Routes.js
import getAPIData from "./API";

const safeArr = (v) => (Array.isArray(v) ? v : []);

const getRoutes = (menuData, lang) => {
  const page = menuData?.data?.page || {};

  const main = safeArr(page.mainNavigation);
  const sub = safeArr(page.subNavigation);

  const paths = [
    ...main.map((item) => ({
      params: { slug: [item?.link?.replace("/", "") || ""] },
      locale: lang,
    })),
    ...sub.map((item) => ({
      params: { slug: [item?.link?.replace("/", "") || ""] },
      locale: lang,
    })),
  ];

  return paths;
};

export const Routes = async ({ locale, defaultLocale }) => {
  const res = await getAPIData(
    `${locale === defaultLocale ? "" : locale}`
  );

  let paths = [
    {
      params: { slug: [`${locale === defaultLocale ? "" : locale}`] },
      locale,
    },
  ];

  if (res?.data) paths = [...paths, ...getRoutes(res, locale)];

  return paths;
};

export default Routes;
