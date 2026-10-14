import { shop } from '@/lib/shop';
import { wrap } from './classes';

export function Footer() {
  return (
    <footer className="border-t border-rule py-7 text-[0.9375rem] text-muted">
      <div className={`${wrap} flex flex-wrap justify-between gap-x-6 gap-y-2`}>
        <span>{shop.fullName}</span>
        <span>{shop.postcode}</span>
      </div>
    </footer>
  );
}
