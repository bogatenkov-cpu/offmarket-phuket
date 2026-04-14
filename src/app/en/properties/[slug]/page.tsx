import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { getPropertyBySlug, getAllProperties, formatPriceExact } from "@/lib/properties";
import InquiryForm from "@/components/InquiryForm";
import ImageGallery from "@/components/ImageGallery";

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = await getDictionary("en");
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  const p = property;
  const t = dict.property;
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/en/properties" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          {t.back}
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery photos={p.photos} projectName={p.project_name} propertyType={p.property_type} />

            {/* Title & Price */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{p.project_name}</h1>
                  <p className="text-gray-500 mt-1">{p.district_en}, Phuket</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{formatPriceExact(p.sale_price_usd)}</p>
                  {p.discount_pct > 0 && (
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full mt-2">
                      −{p.discount_pct.toFixed(1)}% {t.discount.toLowerCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">{t.overview}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  [t.area, `${p.area_sqm} m²`],
                  [t.bedrooms, p.bedrooms === 0 ? "Studio" : `${p.bedrooms}`],
                  [t.floor, p.floor],
                  [t.yearBuilt, `${p.year_built}`],
                  [t.condition, p.condition_en],
                  [t.dealType, p.deal_type_en],
                  [t.furnished, p.furnished_en],
                  [t.seller, "Owner"],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="font-medium text-gray-900 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              {p.notes_en && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed">{p.notes_en}</p>
                </div>
              )}
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">{t.analytics}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  [t.pricePerSqm, formatPriceExact(p.price_per_sqm)],
                  [t.marketPrice, formatPriceExact(p.market_price_usd)],
                  [t.marketPricePerSqm, formatPriceExact(p.market_price_per_sqm)],
                  [t.discount, p.discount_pct > 0 ? `−${p.discount_pct.toFixed(1)}%` : `+${Math.abs(p.discount_pct).toFixed(1)}%`],
                  ...(p.rental_yield_pct > 0 ? [[t.rentalYield, `${p.rental_yield_pct.toFixed(1)}%`]] : []),
                  ...(p.rental_income_usd > 0 ? [[t.rentalIncome, formatPriceExact(p.rental_income_usd)]] : []),
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="font-medium text-gray-900 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              {p.analyst_comment && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">
                    {t.analystComment}
                  </p>
                  <p className="text-sm text-emerald-800">{p.analyst_comment}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h2 className="text-lg font-semibold mb-1">{t.inquiryTitle}</h2>
              <p className="text-sm text-gray-500 mb-6">{t.inquirySubtitle}</p>
              <InquiryForm dict={dict} propertyName={p.project_name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
