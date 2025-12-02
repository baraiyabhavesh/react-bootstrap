// src/utils/API.js
import normalizeApiResponse from "./normalizeApi";

const fetchData = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return { error: true, data: null, status: res.status };
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
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
  
  const base = (process.env.NEXT_PUBLIC_API_URL || "https://t3reactbootstrapv13.thebetaspace.com").replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");  
  let url;
  if (cleanPath) {
    url = `${base}/${cleanPath}`;
  } else {
    url = base;
  }

  const raw = await fetchData(url);
  if (raw.error) {
    if (cleanPath && !url.endsWith('/')) {
      const altUrl = `${url}/`;
      const retry = await fetchData(altUrl);
      if (!retry.error) return {
        error: false,
        data: normalizeApiResponse(retry.data),
      };
    }
    return raw;
  }

  return {
    error: false,
    data: normalizeApiResponse(raw.data),
  };
};

export default getAPIData;
