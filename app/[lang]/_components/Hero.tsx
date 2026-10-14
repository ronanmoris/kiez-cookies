import Image from 'next/image';
import { band, caps, wrap } from '@/components/layout/classes';
import { ButtonLink } from '@/components/ui/ButtonLink';
import type { Dictionary } from '@/features/i18n/dictionaries/dictionaries';
import { shop } from '@/lib/shop';
import heroPhoto from '@/public/images/hero.jpg';

export function Hero({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <section className={`${band} bg-lilac`}>
      <div className={`${wrap} grid grid-cols-1 items-center gap-[clamp(1.5rem,5vw,4rem)] min-[44rem]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]`}>
        <div className="grid min-w-0 justify-items-start gap-[1.4rem]">
          <p className={caps}>{dict.place}</p>
          <h1 className="text-balance text-[clamp(2rem,5.6vw,3.9rem)] font-light uppercase leading-[1.12] tracking-[0.07em]">
            {dict.titleBefore}{' '}
            <span className="inline-block translate-y-[0.08em] px-[0.06em] font-script text-[1.55em] normal-case leading-none tracking-normal">
              {dict.titleScript}
            </span>
            {dict.titleAfter && <> {dict.titleAfter}</>}
          </h1>
          <p className="max-w-[30em] text-[1.1875rem]">{dict.lead}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={shop.whatsappUrl} target="_blank" rel="noopener">{dict.orderOnWhatsapp}</ButtonLink>
            <ButtonLink href="#flavors" variant="line">{dict.seeTheFlavors}</ButtonLink>
          </div>
          <p className="inline-block rounded-full bg-mint px-[0.9em] py-[0.35em] text-[0.9375rem]">{dict.freeDelivery}</p>
        </div>
        <Image
          src={heroPhoto}
          alt={dict.imageAlt}
          priority
          sizes="(min-width: 44rem) 24rem, 20rem"
          className="aspect-[4/5] h-auto w-full max-w-[20rem] rounded-lg bg-peach object-cover min-[44rem]:max-w-[24rem] min-[44rem]:justify-self-end"
        />
      </div>
    </section>
  );
}
