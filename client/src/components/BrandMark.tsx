import type { FC } from 'react';

const BrandMark: FC = () => (
  <div className="flex items-center gap-3 text-ink font-headline tracking-wide">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-cream font-bold shadow-warm">
      <span className="text-lg">EC</span>
    </div>
    <div className="leading-tight">
      <p className="text-xs uppercase text-primary/70 font-semibold">Electrocentro</p>
      <p className="text-lg font-semibold leading-none"></p>
    </div>
  </div>
);

export default BrandMark;
