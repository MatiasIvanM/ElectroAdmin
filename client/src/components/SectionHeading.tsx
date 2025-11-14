import type { FC, ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
}

const alignment: Record<'left' | 'center', string> = {
  left: 'items-start text-left',
  center: 'items-center text-center'
};

const SectionHeading: FC<SectionHeadingProps> = ({ eyebrow, title, description, align = 'left' }) => (
  <header className={`flex flex-col gap-4 ${alignment[align]} max-w-3xl`}
  >
    <span className="text-sm uppercase tracking-[0.3em] text-secondary font-semibold">{eyebrow}</span>
    <h2 className="text-3xl md:text-4xl font-headline font-semibold text-soft-white">
      {title}
    </h2>
    {description ? (
      <p className="text-base text-soft-white/80 leading-relaxed">
        {description}
      </p>
    ) : null}
  </header>
);

export default SectionHeading;
