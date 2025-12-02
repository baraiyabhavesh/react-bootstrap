import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { i18n } from "../i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export default createMiddleware(i18n);

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

const locales = i18n.locales;

const getLocale = (request) => {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
};

export function middleware(req) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;
  const searchParams = req.nextUrl.search;
  // if (basicAuth) {
  //   const authValue = basicAuth.split(' ')[1]
  //   const [user, password] = atob(authValue).split(':')

  //   if ((user === 'admin-reva', password === '3dfp5Pnc#b8J3Dyzg')) {
  //     const pathnameHasLocale = locales.some(
  //       (locale) =>
  //         url.pathname.startsWith(`/${locale}/`) ||
  //         url.pathname === `/${locale}`
  //     )
  //     if (pathnameHasLocale) return
  //     const locale = getLocale(req)
  //     req.nextUrl.pathname = `/${locale}${url.pathname}`

  //     return NextResponse.rewrite(
  //       new URL(`${req.nextUrl.pathname}${searchParams}`, req.url)
  //     )
  //   }
  // }
  // url.pathname = '/api/auth'
  // return NextResponse.rewrite(url)

  //============ code block for loading page without authentication ===========

  //============ code block for loading page without authentication ===========

  const pathnameHasLocale = locales.some(
    (locale) =>
      url.pathname.startsWith(`/${locale}/`) || url.pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;
  const locale = getLocale(req);
  req.nextUrl.pathname = `/${locale}${url.pathname}`;

  return NextResponse.rewrite(
    new URL(`${req.nextUrl.pathname}${searchParams}`, req.url)
  );

  //============ code block is for loading page without authentication ===========
}
