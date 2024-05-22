import { cn } from '@/lib/utils';

export default function Divider({ text, className }: { text?: string; className?: string }) {
  return (
    <div className={cn(className, 'flex flex-row items-center uppercase')}>
      <hr className="grow-[4]" />
      <span className={cn('flex text-foreground/60', text && 'grow-[1]', 'justify-center')}>
        {text}
      </span>
      <hr className="grow-[4]" />
    </div>
  );
}
