export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/typo3_src/" },
    sitemap: `${process.env.NEXT_PUBLIC_API_URL}/sitemap.xml`,
  };
}
