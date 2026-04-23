import { getDictionary } from "@/lib/i18n";
import AboutContent from "@/components/AboutContent";

export default async function AboutPage() {
  const dict = await getDictionary("en");
  return <AboutContent locale="en" dict={dict} />;
}
