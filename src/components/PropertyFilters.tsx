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

type SortKey = "price_asc" | "price_desc" | "discount" | "rating";

export default function PropertyFilters({ properties, districts, locale, dict }: FiltersProps) {
  const t = dict.catalog.filters;

  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [readyOnly, setReadyOnly] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("rating");

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
      case "discount":
        result.sort((a, b) => b.discount_pct - a.discount_pct);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating || b.discount_pct - a.discount_pct);
        break;
    }

    return result;
  }, [properties, district, propertyType, bedrooms, readyOnly, sort]);

  const hasFilters = district || propertyType || bedrooms || readyOnly;

  return (
    <div>
      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
          >
            <option value="">{t.location}</option>
            {districts.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
          >
            <option value="">{t.type}</option>
            <option value="apartment">{t.apartment}</option>
            <option value="villa">{t.villa}</option>
          </select>

          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
          >
            <option value="">{t.bedrooms}</option>
            <option value="0">{t.studio}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4+</option>
          </select>

          <select
            value={readyOnly}
            onChange={(e) => setReadyOnly(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
          >
            <option value="">{t.status}</option>
            <option value="ready">{t.ready}</option>
            <option value="construction">{t.construction}</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
          >
            <option value="rating">{t.rating} ↓</option>
            <option value="discount">{locale === "en" ? "Discount" : "Дисконт"} ↓</option>
            <option value="price_asc">{locale === "en" ? "Price" : "Цена"} ↑</option>
            <option value="price_desc">{locale === "en" ? "Price" : "Цена"} ↓</option>
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={() => {
              setDistrict("");
              setPropertyType("");
              setBedrooms("");
              setReadyOnly("");
            }}
            className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {t.reset}
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} {locale === "en" ? "properties" : "объектов"}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} locale={locale} dict={dict} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🏠</div>
          <p>{t.noResults}</p>
        </div>
      )}
    </div>
  );
}
