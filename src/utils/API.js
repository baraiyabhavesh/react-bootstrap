// src/utils/API.js
import normalizeApiResponse from "./normalizeApi";

const fetchData = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      return { error: true, data: null };
    }

    const json = await res.json();
    return { error: false, data: json };
  } catch (e) {
    return { error: true, data: null };
  }
};

const getAPIData = async (path) => {
  // Handle undefined or null path
  if (!path || typeof path !== "string") {
    path = "";
  }
  
  const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  const url = cleanPath ? `${base}/${cleanPath}` : base;

  const raw = await fetchData(url);
  if (raw.error) return raw;

  return {
    error: false,
    data: normalizeApiResponse(raw.data),
  };
};

export default getAPIData;
