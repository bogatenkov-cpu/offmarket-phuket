import { getDictionary } from "@/lib/i18n";
import InquiryForm from "@/components/InquiryForm";

export default async function AboutPage() {
  const dict = await getDictionary("ru");
  const t = dict.about;

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600 mb-12">{t.description}</p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.support.title}</h2>
          <div className="space-y-4 mb-12">
            {t.support.items.map((item: { title: string; desc: string }, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">{dict.nav.contact}</h2>
            <p className="text-sm text-gray-500 mb-6">{dict.property.inquirySubtitle}</p>
            <InquiryForm dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
