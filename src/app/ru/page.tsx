import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { getStats } from "@/lib/properties";

export default async function HomePage() {
  const dict = await getDictionary("ru");
  const stats = getStats();
  const t = dict;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-block bg-emerald-500/20 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-emerald-500/30">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/ru/properties"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-4 rounded-xl text-center transition-colors"
              >
                {t.hero.cta}
              </Link>
              <Link
                href="/ru/about"
                className="border border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl text-center transition-colors"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500 mt-1">{t.stats.properties}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-emerald-600">{stats.avgDiscount}%</p>
              <p className="text-sm text-gray-500 mt-1">{t.stats.avgDiscount}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stats.locations}</p>
              <p className="text-sm text-gray-500 mt-1">{t.stats.locations}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stats.ready}</p>
              <p className="text-sm text-gray-500 mt-1">{t.stats.ready}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t.advantages.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.advantages.items.map((item: { title: string; desc: string }, i: number) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-emerald-600 text-lg font-bold">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {t.hero.title}
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">{t.hero.subtitle}</p>
          <Link
            href="/ru/properties"
            className="inline-block bg-white text-emerald-700 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            {t.hero.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
