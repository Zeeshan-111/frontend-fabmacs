import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  schema?: object | object[];
}

const BASE_URL = "https://www.fabmacs.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object | object[]) {
  let el = document.querySelector(`script[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(Array.isArray(data) ? data : data);
}

export function useSEO({ title, description, canonical, ogImage, ogType = "website", keywords, schema }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes("FABMACS") ? title : `${title} | FABMACS INNOVATION`;
    document.title = fullTitle;

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);

    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:image", ogImage || DEFAULT_OG_IMAGE, "property");
    setMeta("og:url", canonical || `${BASE_URL}${window.location.pathname}`, "property");
    setMeta("og:site_name", "FABMACS INNOVATION", "property");
    setMeta("og:locale", "en_IN", "property");

    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage || DEFAULT_OG_IMAGE);
    setMeta("twitter:card", "summary_large_image");

    if (canonical) setLink("canonical", canonical);

    if (schema) {
      setJsonLd("page-schema", schema);
    }

    return () => {
      const el = document.querySelector('script[data-seo-id="page-schema"]');
      if (el) el.remove();
    };
  }, [title, description, canonical, ogImage, ogType, keywords, schema]);
}

export { BASE_URL };
