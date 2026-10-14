import type { Metadata } from "next";
import { Jost, Sacramento } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/features/i18n/dictionaries/dictionaries";
import { hasLocale, locales } from "@/features/i18n/locales";
import "../globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
});

// Prerender /de and /en at build time.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getDictionary();
  return { title: meta.title, description: meta.description };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${jost.variable} ${sacramento.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
