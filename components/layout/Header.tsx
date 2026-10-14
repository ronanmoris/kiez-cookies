import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import type { Dictionary } from '@/features/i18n/dictionaries/dictionaries';
import { locales, type Locale } from '@/features/i18n/locales';
import { shop } from '@/lib/shop';
import { caps, wrap } from './classes';

type HeaderProps = {
  locale: Locale;
  dict: Dictionary['nav'];
};

const navLink = `${caps} no-underline underline-offset-[0.3em] hover:underline`;

export function Header({ locale, dict }: HeaderProps) {
  return (
    <header className="py-[1.1rem]">
      <div className={`${wrap} flex flex-wrap items-center justify-between gap-x-6 gap-y-3`}>
        <Link href={`/${locale}`} aria-label={shop.name} className="inline-flex flex-col items-center leading-none no-underline">
          <b className="-mr-[0.42em] text-xl font-normal tracking-[0.42em]">KIEZ</b>
          <i className="-mt-[0.3rem] font-script text-2xl not-italic">cookies</i>
        </Link>

        <nav aria-label={dict.label} className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="#flavors" className={navLink}>{dict.flavors}</a>
          <a href="#frozen-dough" className={navLink}>{dict.frozenDough}</a>

          <div role="group" aria-label={dict.language} className="inline-grid grid-cols-2 rounded-full border-[1.5px] border-ink p-[2px]">
            {locales.map((option) => {
              const active = option === locale;
              return (
                <Link
                  key={option}
                  href={`/${option}`}
                  hrefLang={option}
                  lang={option}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-[0.75em] py-[0.4em] pl-[0.91em] text-center text-xs font-medium uppercase leading-[1.4] tracking-[0.16em] no-underline ${active ? 'bg-ink text-paper' : 'text-ink'}`}
                >
                  {option}
                </Link>
              );
            })}
          </div>

          <ButtonLink href="#order" small>{dict.order}</ButtonLink>
        </nav>
      </div>
    </header>
  );
}
