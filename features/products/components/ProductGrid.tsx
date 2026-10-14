import type { Dictionary } from '@/features/i18n/dictionaries/dictionaries';
import type { Locale } from '@/features/i18n/locales';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  products: Product[];
  locale: Locale;
  labels: Dictionary['labels'];
  layout: 'card' | 'wide';
};

const columns = {
  card: 'min-[44rem]:grid-cols-2 min-[60rem]:grid-cols-3',
  wide: 'min-[44rem]:grid-cols-2',
};

export function ProductGrid({ products, locale, labels, layout }: ProductGridProps) {
  return (
    <ul className={`grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-7 min-[44rem]:gap-y-11 ${columns[layout]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} labels={labels} layout={layout} />
      ))}
    </ul>
  );
}
