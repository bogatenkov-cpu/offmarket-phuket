import { getDictionary } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function RuLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary("ru");

  return (
    <>
      <Header locale="ru" dict={dict} />
      <main className="pt-16">{children}</main>
      <Footer locale="ru" dict={dict} />
    </>
  );
}
