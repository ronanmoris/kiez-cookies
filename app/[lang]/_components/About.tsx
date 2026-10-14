import Image from 'next/image';
import { band, wrap } from '@/components/layout/classes';
import type { Dictionary } from '@/features/i18n/dictionaries/dictionaries';
import michelePhoto from '@/public/images/michele.jpg';

export function About({ dict }: { dict: Dictionary['about'] }) {
  return (
    <section className={band}>
      <div className={`${wrap} grid grid-cols-1 items-center gap-x-[clamp(1.5rem,5vw,3.5rem)] gap-y-6 min-[44rem]:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]`}>
        <Image
          src={michelePhoto}
          alt={dict.imageAlt}
          sizes="(min-width: 44rem) 17rem, 15rem"
          className="aspect-[4/5] h-auto w-full max-w-[15rem] rounded-lg bg-peach object-cover min-[44rem]:max-w-none"
        />
        <div className="grid min-w-0 gap-[0.6rem]">
          <h2 className="font-script text-[clamp(2.75rem,7vw,4rem)] font-normal leading-none">{dict.heading}</h2>
          <p className="max-w-[32em] text-[1.1875rem]">{dict.text}</p>
        </div>
      </div>
    </section>
  );
}
