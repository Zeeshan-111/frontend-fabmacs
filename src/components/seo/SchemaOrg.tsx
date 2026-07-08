import { useEffect } from "react";

const BASE_URL = "https://www.fabmacs.com";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ManufacturingBusiness"],
  "@id": `${BASE_URL}/#organization`,
  name: "FABMACS INNOVATION",
  alternateName: ["FABMACS", "Fabmacs Innovation", "FABMACS PACKAGING"],
  description: "FABMACS INNOVATION is a leading industrial equipment manufacturer in Faridabad, Haryana, India — specialising in conveyors, bucket elevators, ribbon blenders, auger fillers, screw conveyors, hoppers, and structural platforms for food processing, pharmaceutical, chemical, packaging, and nutraceutical industries.",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo-fabmacs.jpg`,
    width: 300,
    height: 100
  },
  image: `${BASE_URL}/opengraph.jpg`,
  telephone: "+91-9354900604",
  email: "info@fabmacs.com",
  foundingDate: "2009",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. 18, 16/6 Mathura Road",
    addressLocality: "Old Faridabad",
    addressRegion: "Haryana",
    postalCode: "121002",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.4089,
    longitude: 77.3178
  },
  areaServed: [
    { "@type": "State", name: "Haryana" },
    { "@type": "State", name: "Delhi" },
    { "@type": "State", name: "Punjab" },
    { "@type": "State", name: "Uttar Pradesh" },
    { "@type": "State", name: "Rajasthan" },
    { "@type": "Country", name: "India" }
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00"
    }
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9354900604",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"]
    },
    {
      "@type": "ContactPoint",
      email: "info@fabmacs.com",
      contactType: "customer service",
      areaServed: "IN"
    }
  ],
  sameAs: [
    "https://www.indiamart.com/fabmacs-innovation/",
    "https://www.linkedin.com/company/fabmacs-innovation"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Industrial Equipment Catalogue",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Belt Conveyor" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Bucket Elevator" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Screw Conveyor" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Ribbon Blender" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Auger Filler" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Modular Belt Conveyor" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Hopper" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Industrial Platform" } }
    ]
  },
  keywords: "conveyor manufacturer Faridabad, bucket elevator manufacturer Haryana, industrial equipment manufacturer Faridabad, material handling equipment India, ribbon blender manufacturer, auger filler manufacturer, screw conveyor manufacturer, FABMACS INNOVATION"
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "FABMACS INNOVATION",
  description: "Industrial Equipment Manufacturer — Faridabad, India",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/products?q={search_term_string}` },
    "query-input": "required name=search_term_string"
  },
  inLanguage: "en-IN"
};

const breadcrumbHome = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }
  ]
};

export default function SchemaOrg() {
  useEffect(() => {
    const schemas = [localBusinessSchema, websiteSchema, breadcrumbHome];
    schemas.forEach((schema, i) => {
      const id = `global-schema-${i}`;
      let el = document.querySelector(`script[data-seo-id="${id}"]`);
      if (!el) {
        el = document.createElement("script");
        el.setAttribute("type", "application/ld+json");
        el.setAttribute("data-seo-id", id);
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    });
    return () => {
      for (let i = 0; i < 3; i++) {
        document.querySelector(`script[data-seo-id="global-schema-${i}"]`)?.remove();
      }
    };
  }, []);

  return null;
}
