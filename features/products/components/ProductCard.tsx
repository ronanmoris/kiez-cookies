import Image from 'next/image';
import type { Dictionary } from '@/features/i18n/dictionaries/dictionaries';
import type { Locale } from '@/features/i18n/locales';
import { formatPrice } from '@/lib/format-price';
import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
  locale: Locale;
  labels: Dictionary['labels'];
  layout: 'card' | 'wide';
};

// Photo sizes as exported for public/images: classic squares, jumbo 16:9.
const photo = {
  card: { width: 640, height: 640, className: 'aspect-square', sizes: '(min-width: 60rem) 22rem, (min-width: 44rem) 45vw, 6.5rem' },
  wide: { width: 1200, height: 675, className: 'aspect-video', sizes: '(min-width: 44rem) 34rem, 100vw' },
};

export function ProductCard({ product, locale, labels, layout }: ProductCardProps) {
  const text = product.text[locale];
  const image = photo[layout];

  return (
    <li
      className={`grid min-w-0 content-start gap-4 ${layout === 'card' ? 'grid-cols-[6.5rem_minmax(0,1fr)] items-start min-[44rem]:grid-cols-1' : ''}`}
    >
      <Image
        src={product.image.url}
        alt={text.altText}
        width={image.width}
        height={image.height}
        sizes={image.sizes}
        className={`block h-auto w-full rounded-lg bg-peach object-cover ${image.className}`}
      />
      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-[0.6rem] min-[44rem]:gap-3">
          <h3 className="min-w-0 border-l-[1.5px] border-ink pl-[0.65em] text-[0.9375rem] font-medium uppercase leading-[1.3] tracking-[0.1em] [overflow-wrap:anywhere] min-[44rem]:text-[1.0625rem] min-[44rem]:tracking-[0.16em]">
            {text.name}
          </h3>
          <span className="whitespace-nowrap font-medium tabular-nums">{formatPrice(product.price, locale)}</span>
        </div>
        <p className="mt-[0.45rem] font-medium">{text.flavor}</p>
        <p className="text-muted">{text.tagline}</p>
        {product.dietaryLabels?.map((label) => (
          <span
            key={label}
            className="mr-2 mt-2 inline-block rounded-full bg-mint px-[0.7em] py-[0.15em] text-[0.6875rem] font-medium uppercase tracking-[0.14em]"
          >
            {labels[label]}
          </span>
        ))}
      </div>
    </li>
  );
}
