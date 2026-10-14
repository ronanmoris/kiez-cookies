import type { ComponentProps } from 'react';

type Variant = 'solid' | 'line' | 'on-plum';

const variants: Record<Variant, string> = {
  solid: 'border-btn bg-btn text-on-btn',
  line: 'border-ink bg-transparent text-ink',
  'on-plum': 'border-on-plum bg-on-plum text-plum',
};

type ButtonLinkProps = ComponentProps<'a'> & {
  variant?: Variant;
  small?: boolean;
};

export function ButtonLink({ variant = 'solid', small = false, className = '', ...props }: ButtonLinkProps) {
  const padding = small ? 'px-[1.2em] py-[0.6em]' : 'px-[1.5em] py-[0.8em]';
  return (
    <a
      className={`inline-block rounded-full border-[1.5px] text-[0.8125rem] font-medium uppercase tracking-[0.16em] no-underline transition-opacity hover:opacity-80 motion-reduce:transition-none ${padding} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
