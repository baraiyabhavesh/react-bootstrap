"use client";
import Link from "next/link";

/**
 * SafeLink - A wrapper around Next.js Link that ensures href is always a string or object
 * This prevents the "href expects a string or object but got function" error
 */
const SafeLink = ({ href, children, ...props }) => {
  // Normalize href to always be a string or object
  const normalizeHref = (hrefValue) => {
    if (!hrefValue) return "#";
    if (typeof hrefValue === "string") return hrefValue;
    if (typeof hrefValue === "object" && hrefValue !== null) return hrefValue;
    if (typeof hrefValue === "function") return "#"; // Functions should not be links
    if (typeof hrefValue === "number") return String(hrefValue);
    return "#";
  };

  const safeHref = normalizeHref(href);

  return (
    <Link href={safeHref} {...props}>
      {children}
    </Link>
  );
};

export default SafeLink;



