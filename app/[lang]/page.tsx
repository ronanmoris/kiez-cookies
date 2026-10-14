import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getDictionary } from "@/features/i18n/dictionaries/dictionaries";
import { hasLocale } from "@/features/i18n/locales";
import { boxOptions, catalog } from "@/features/products/catalog";
import { About } from "./_components/About";
import { Flavors } from "./_components/Flavors";
import { FrozenDough } from "./_components/FrozenDough";
import { Hero } from "./_components/Hero";
import { Order } from "./_components/Order";

// The frozen dough entry stays in the catalog as a reference (model B open), but it is not a cookie to list.
const FROZEN_DOUGH_REFERENCE_ID = "6005b3ad-2aa8-4853-883d-c51a421d5b64";

const cookies = catalog.filter((product) => product.id !== FROZEN_DOUGH_REFERENCE_ID);
const classics = cookies.filter((product) => product.size === "classic");
const jumbos = cookies.filter((product) => product.size === "jumbo");

// Cheapest box across all sizes, shown as "from €18.00 per box".
const cheapestBox = Object.values(boxOptions)
  .flatMap((sizes) => Object.values(sizes))
  .reduce((cheapest, box) => (box.price < cheapest.price ? box : cheapest));

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary();

  return (
    <>
      <Header locale={lang} dict={dict.nav} />
      <main>
        <Hero dict={dict.hero} />
        <Flavors locale={lang} dict={dict} classics={classics} jumbos={jumbos} />
        <FrozenDough locale={lang} dict={dict.frozen} fromPrice={cheapestBox.price} />
        <Order dict={dict.order} />
        <About dict={dict.about} />
      </main>
      <Footer />
    </>
  );
}
