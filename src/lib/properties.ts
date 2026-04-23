import propertiesData from "@/data/properties.json";
import { Property } from "@/data/types";

export function getAllProperties(): Property[] {
  return propertiesData as Property[];
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return (propertiesData as Property[]).find((p) => p.slug === slug);
}

export function getPropertyById(id: number): Property | undefined {
  return (propertiesData as Property[]).find((p) => p.id === id);
}

export function getUniqueDistricts(locale: "en" | "ru" = "ru"): { value: string; label: string }[] {
  const props = propertiesData as Property[];
  const districtMap = new Map<string, string>();
  for (const p of props) {
    districtMap.set(p.district, locale === "en" ? p.district_en : p.district);
  }
  return Array.from(districtMap.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getStats() {
  const props = propertiesData as Property[];
  const withDiscount = props.filter((p) => p.discount_pct > 0);
  const biggestEntry = withDiscount.length > 0
    ? withDiscount.reduce((acc, p) => (p.discount_pct > acc.discount_pct ? p : acc))
    : null;
  const districts = new Set(props.map((p) => p.district));
  const ready = props.filter((p) => p.is_ready).length;
  const minPrice = Math.min(...props.map((p) => p.sale_price_usd));
  const yieldsArr = props.filter((p) => p.rental_yield_pct > 0).map((p) => p.rental_yield_pct);
  const avgYield = yieldsArr.length > 0
    ? yieldsArr.reduce((s, n) => s + n, 0) / yieldsArr.length
    : 0;

  return {
    total: props.length,
    minPrice,
    avgYield,
    biggestMarkdown: biggestEntry ? biggestEntry.discount_pct : 0,
    biggestMarkdownName: biggestEntry ? biggestEntry.project_name : "",
    locations: districts.size,
    ready,
  };
}

export function getFeatured(limit: number = 3): Property[] {
  return [...(propertiesData as Property[])]
    .sort((a, b) => b.discount_pct - a.discount_pct)
    .slice(0, limit);
}

export function getDistrictSummary(locale: "en" | "ru" = "en", limit: number = 4) {
  const props = propertiesData as Property[];
  const grouped = new Map<string, Property[]>();
  for (const p of props) {
    const key = locale === "en" ? p.district_en : p.district;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(p);
  }
  return Array.from(grouped.entries())
    .map(([name, items]) => {
      const sample = items.find((p) => p.photos && p.photos.length > 0) || items[0];
      const minPrice = Math.min(...items.map((p) => p.sale_price_usd));
      return {
        name,
        count: items.length,
        minPrice,
        img: sample.photos?.[0] || "",
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getSimilarProperties(current: Property, limit: number = 3): Property[] {
  return (propertiesData as Property[])
    .filter((p) => p.id !== current.id && p.district === current.district)
    .sort((a, b) => Math.abs(a.sale_price_usd - current.sale_price_usd) - Math.abs(b.sale_price_usd - current.sale_price_usd))
    .slice(0, limit);
}

export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(2)}M`;
  }
  return `$${(price / 1_000).toFixed(0)}K`;
}

export function formatPriceExact(price: number): string {
  return `$${price.toLocaleString("en-US")}`;
}
