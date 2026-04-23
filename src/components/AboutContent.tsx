import type { Locale } from "@/lib/i18n";
import InquiryForm from "@/components/InquiryForm";

interface AboutContentProps {
  locale: Locale;
  dict: Record<string, any>;
}

export default function AboutContent({ dict }: AboutContentProps) {
  const t = dict.about;

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-20">
      <div className="max-w-[1100px] mx-auto">
        {/* Hero */}
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.12em] text-coral font-semibold">{t.kicker}</div>
          <h1 className="text-3xl sm:text-[44px] lg:text-[56px] font-bold tracking-[-0.025em] leading-[1.05] mt-3">
            {t.title}
          </h1>
          <p className="text-lg lg:text-[19px] text-ink-soft leading-relaxed mt-5">{t.lead}</p>
        </div>

        {/* Support items */}
        <div className="mt-14">
          <h2 className="text-2xl lg:text-[28px] font-bold tracking-[-0.02em] mb-6">{t.supportTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(t.supportItems as { title: string; desc: string }[]).map((item, i) => (
              <div key={i} className="bg-white border border-rule rounded-xl p-5 lg:p-6">
                <div className="font-display text-coral text-[36px] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-[17px] font-semibold mt-2.5 tracking-[-0.01em]">{item.title}</div>
                <p className="text-[13.5px] text-ink-mute leading-relaxed mt-1.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-14 bg-surface border border-rule rounded-xl p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12">
            <div>
              <h2 className="text-2xl lg:text-[28px] font-bold tracking-[-0.02em]">{t.contactTitle}</h2>
              <p className="text-[15px] text-ink-soft mt-2">{t.contactSub}</p>
            </div>
            <div>
              <InquiryForm dict={dict} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
