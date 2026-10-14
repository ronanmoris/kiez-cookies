import { band, caps, sectionHeading, wrap } from '@/components/layout/classes';
import { ButtonLink } from '@/components/ui/ButtonLink';
import type { Dictionary } from '@/features/i18n/dictionaries/dictionaries';
import { shop } from '@/lib/shop';

const fact = 'grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-t border-ink py-[0.85rem] last:border-b min-[44rem]:grid-cols-[7.5rem_minmax(0,1fr)]';

export function Order({ dict }: { dict: Dictionary['order'] }) {
  return (
    <section id="order" className={`${band} bg-mint`}>
      <div className={`${wrap} grid grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))] items-start gap-x-[clamp(1.5rem,5vw,4rem)] gap-y-8`}>
        <div className="grid min-w-0 justify-items-start gap-[1.3rem]">
          <h2 className={sectionHeading}>{dict.heading}</h2>
          <p className="max-w-[30em]">{dict.text}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={shop.whatsappUrl} target="_blank" rel="noopener">WhatsApp</ButtonLink>
            <ButtonLink href={shop.instagramUrl} target="_blank" rel="noopener" variant="line">Instagram</ButtonLink>
          </div>
        </div>
        <dl className="grid min-w-0">
          <div className={fact}>
            <dt className={caps}>{dict.delivery}</dt>
            <dd>{dict.deliveryValue}</dd>
          </div>
          <div className={fact}>
            <dt className={caps}>{dict.where}</dt>
            <dd>{shop.postcode}</dd>
          </div>
          <div className={fact}>
            <dt className={caps}>Instagram</dt>
            <dd className="select-all [overflow-wrap:anywhere]">{shop.instagramHandle}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
