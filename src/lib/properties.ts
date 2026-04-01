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

export function getUniqueDistricts(): string[] {
  const districts = new Set((propertiesData as Property[]).map((p) => p.district));
  return Array.from(districts).sort();
}

export function getStats() {
  const props = propertiesData as Property[];
  const withDiscount = props.filter((p) => p.discount_pct > 0);
  const maxDiscount = withDiscount.length > 0
    ? Math.max(...withDiscount.map((p) => p.discount_pct))
    : 0;
  const districts = new Set(props.map((p) => p.district));
  const ready = props.filter((p) => p.is_ready).length;
  const minPrice = Math.min(...props.map((p) => p.sale_price_usd));

  return {
    total: props.length,
    maxDiscount: Math.round(maxDiscount),
    locations: districts.size,
    ready,
    minPrice,
  };
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
