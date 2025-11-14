import type { FC } from 'react';

const BrandMark: FC = () => (
  <div className="flex items-center gap-2 text-soft-white font-headline tracking-wide">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-midnight font-bold shadow-glow">
      <span className="text-xl">EC</span>
    </div>
    <div>
      <p className="text-xs uppercase text-accent">Electrocentro</p>
      <p className="text-lg font-semibold leading-none">Electro Centro</p>
    </div>
  </div>
);

export default BrandMark;
