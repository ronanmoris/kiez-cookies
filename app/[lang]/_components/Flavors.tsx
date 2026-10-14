import { band, sectionHeading, wrap } from '@/components/layout/classes';
import type { Dictionary } from '@/features/i18n/dictionaries/dictionaries';
import type { Locale } from '@/features/i18n/locales';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import type { Product } from '@/features/products/types';

type FlavorsProps = {
  locale: Locale;
  dict: Dictionary;
  classics: Product[];
  jumbos: Product[];
};

const head = 'mb-[clamp(1.75rem,4vw,2.75rem)] grid max-w-[38rem] gap-[0.6rem]';

export function Flavors({ locale, dict, classics, jumbos }: FlavorsProps) {
  return (
    <section id="flavors" className={band}>
      <div className={wrap}>
        <div className={head}>
          <h2 className={sectionHeading}>{dict.flavors.heading}</h2>
          <p>{dict.flavors.intro}</p>
          <p className="text-[0.9375rem] text-muted">{dict.flavors.placeholderPrices}</p>
          <p className="text-[0.9375rem] text-muted">{dict.flavors.allergenNotice}</p>
        </div>
        <ProductGrid products={classics} locale={locale} labels={dict.labels} layout="card" />

        <div className="mt-[clamp(2.5rem,6vw,4rem)] border-t border-rule pt-[clamp(2rem,5vw,3rem)]">
          <div className={head}>
            <h2 className="text-[clamp(1.25rem,2.6vw,1.6rem)] font-light uppercase leading-[1.2] tracking-[0.2em]">
              {dict.jumbo.heading}
            </h2>
            <p>{dict.jumbo.intro}</p>
          </div>
          <ProductGrid products={jumbos} locale={locale} labels={dict.labels} layout="wide" />
        </div>
      </div>
    </section>
  );
}
