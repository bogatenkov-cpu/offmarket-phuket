import { getDictionary } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function EnLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary("en");

  return (
    <>
      <Header locale="en" dict={dict} />
      <main className="pt-16">{children}</main>
      <Footer locale="en" dict={dict} />
    </>
  );
}
