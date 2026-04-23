"use client";

import { useState, useMemo } from "react";
import { Property } from "@/data/types";
import PropertyCard from "./PropertyCard";
import type { Locale } from "@/lib/i18n";

interface FiltersProps {
  properties: Property[];
  districts: { value: string; label: string }[];
  locale: Locale;
  dict: Record<string, any>;
}

type SortKey = "discount" | "price_asc" | "price_desc" | "area_desc" | "yield_desc" | "rating";

export default function PropertyFilters({ properties, districts, locale, dict }: FiltersProps) {
  const t = dict.catalog.filters;

  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [readyOnly, setReadyOnly] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("discount");

  const filtered = useMemo(() => {
    let result = [...properties];

    if (district) result = result.filter((p) => p.district === district);
    if (propertyType) {
      if (propertyType === "apartment") result = result.filter((p) => p.property_type === "Апартаменты");
      if (propertyType === "villa") result = result.filter((p) => p.property_type === "Дом/Коттедж");
    }
    if (bedrooms) {
      const bd = parseInt(bedrooms);
      result = result.filter((p) => p.bedrooms === bd);
    }
    if (readyOnly === "ready") result = result.filter((p) => p.is_ready);
    if (readyOnly === "construction") result = result.filter((p) => !p.is_ready);

    switch (sort) {
      case "price_asc":
        result.sort((a, b) => a.sale_price_usd - b.sale_price_usd);
        break;
      case "price_desc":
        result.sort((a, b) => b.sale_price_usd - a.sale_price_usd);
        break;
      case "area_desc":
        result.sort((a, b) => b.area_sqm - a.area_sqm);
        break;
      case "yield_desc":
        result.sort((a, b) => b.rental_yield_pct - a.rental_yield_pct);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating || b.discount_pct - a.discount_pct);
        break;
      case "discount":
      default:
        result.sort((a, b) => b.discount_pct - a.discount_pct);
        break;
    }

    return result;
  }, [properties, district, propertyType, bedrooms, readyOnly, sort]);

  const hasFilters = district || propertyType || bedrooms || readyOnly;

  const resetAll = () => {
    setDistrict("");
    setPropertyType("");
    setBedrooms("");
    setReadyOnly("");
  };

  const selectClass =
    "px-3 py-2 bg-white border border-rule rounded-md text-[13px] text-ink hover:border-ink-soft cursor-pointer outline-none focus:ring-1 focus:ring-navy/30 transition";

  return (
    <div>
      {/* Filter chip row */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="text-[13px] text-ink-mute mr-1">{t.filterLabel}</div>

        <select value={district} onChange={(e) => setDistrict(e.target.value)} className={selectClass}>
          <option value="">{t.allLocations}</option>
          {districts.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>

        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className={selectClass}>
          <option value="">{t.anyType}</option>
          <option value="apartment">{t.apartment}</option>
          <option value="villa">{t.villa}</option>
        </select>

        <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={selectClass}>
          <option value="">{t.anyRooms}</option>
          <option value="0">{t.studio}</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4+</option>
        </select>

        <select value={readyOnly} onChange={(e) => setReadyOnly(e.target.value)} className={selectClass}>
          <option value="">{t.anyStage}</option>
          <option value="ready">{t.ready}</option>
          <option value="construction">{t.construction}</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectClass}>
          <option value="discount">{t.sortDiscount}</option>
          <option value="price_asc">{t.sortPriceAsc}</option>
          <option value="price_desc">{t.sortPriceDesc}</option>
          <option value="area_desc">{t.sortAreaDesc}</option>
          <option value="yield_desc">{t.sortYieldDesc}</option>
          <option value="rating">{t.sortRating}</option>
        </select>

        {hasFilters && (
          <button
            onClick={resetAll}
            className="text-[12px] text-ink-mute hover:text-ink ml-1 underline-offset-2 hover:underline"
          >
            {t.reset}
          </button>
        )}
      </div>

      {/* Result bar */}
      <div className="flex items-baseline justify-between mt-6 mb-5">
        <div>
          <h2 className="sr-only">{dict.catalog.title}</h2>
          <div className="text-[14px] text-ink-mute">
            {t.showing}{" "}
            <strong className="text-ink">
              {filtered.length} {locale === "en" ? "of" : "из"} {properties.length}
            </strong>{" "}
            {t.listings}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} locale={locale} dict={dict} compact />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-ink-mute">
          <div className="text-5xl mb-4">🏠</div>
          <p>{t.noResults}</p>
          {hasFilters && (
            <button
              onClick={resetAll}
              className="mt-4 text-sm text-navy underline underline-offset-2"
            >
              {t.reset}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
