import Image from 'next/image';
import { band, caps, wrap } from '@/components/layout/classes';
import { ButtonLink } from '@/components/ui/ButtonLink';
import type { Dictionary } from '@/features/i18n/dictionaries/dictionaries';
import type { Locale } from '@/features/i18n/locales';
import { formatPrice } from '@/lib/format-price';
import type { Integer } from '@/lib/utils';
import { shop } from '@/lib/shop';
import trayPhoto from '@/public/images/tray.jpg';

type FrozenDoughProps = {
  locale: Locale;
  dict: Dictionary['frozen'];
  fromPrice: Integer;
};

export function FrozenDough({ locale, dict, fromPrice }: FrozenDoughProps) {
  return (
    <section id="frozen-dough" className={`${band} bg-plum text-on-plum`}>
      <div className={`${wrap} grid grid-cols-1 items-center gap-x-[clamp(1.5rem,5vw,4rem)] gap-y-8 min-[44rem]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]`}>
        <div className="grid min-w-0 justify-items-start gap-[1.4rem]">
          <h2 className="grid gap-[0.2rem] font-normal">
            <span className={caps}>{dict.our}</span>
            <span className="font-script text-[clamp(3rem,9vw,5rem)] leading-none">{dict.heading}</span>
          </h2>
          <p className="max-w-[30em] text-[1.1875rem]">{dict.text}</p>
          <p>
            {dict.from}{' '}
            <span className="whitespace-nowrap font-medium tabular-nums">{formatPrice(fromPrice, locale)}</span>{' '}
            {dict.perBox} <span className="text-[0.9375rem] opacity-75">{dict.placeholderPrice}</span>
          </p>
          <ButtonLink href={shop.whatsappUrl} target="_blank" rel="noopener" variant="on-plum">{dict.ask}</ButtonLink>
        </div>
        <Image
          src={trayPhoto}
          alt={dict.imageAlt}
          sizes="(min-width: 44rem) 30rem, 100vw"
          className="aspect-[4/3] h-auto w-full rounded-lg bg-peach object-cover"
        />
      </div>
    </section>
  );
}
