import normalizeApiResponse from "./normalizeApi";

const fetchData = async (url) => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (process.env.API_USER && process.env.API_PASS) {
      headers.Authorization =
        "Basic " +
        Buffer.from(
          `${process.env.API_USER}:${process.env.API_PASS}`
        ).toString("base64");
    }

    const res = await fetch(url, { headers, cache: "no-store" });

      if (!res.ok) {
        return { error: true, data: null, status: res.status };
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        return { error: true, data: null, status: res.status };
      }

      const json = await res.json();
    return { error: false, data: json };
  } catch (e) {
    return { error: true, data: null };
  }
};

const getAPIData = async (path) => {
  if (!path || typeof path !== "string") {
    path = "";
  }

  const base = (process.env.NEXT_PUBLIC_API_URL ||
    "https://t3reactbootstrapv13.thebetaspace.com"
  ).replace(/\/+$/, "");

  const cleanPath = path.replace(/^\/+/, "");
  let url = cleanPath ? `${base}/${cleanPath}` : base;

  let raw = await fetchData(url);

  if (raw.error && cleanPath && !url.endsWith("/")) {
    const retryUrl = `${url}/`;
    const retry = await fetchData(retryUrl);
    if (!retry.error) {
      return {
        error: false,
        data: normalizeApiResponse(retry.data),
      };
    }
  }

  if (raw.error) return raw;

  return {
    error: false,
    data: normalizeApiResponse(raw.data),
  };
};

export default getAPIData;
