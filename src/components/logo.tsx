
import { cn } from '@/lib/utils';
import { Popcorn } from 'lucide-react';
import Link from 'next/link';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <div className="font-bold uppercase text-3xl tracking-wider text-foreground flex items-center">
        <span>P</span>
        <Popcorn className="w-8 h-8 mx-[-2px] text-primary" />
        <span>PZY</span>
      </div>
    </Link>
  );
};

export default Logo;
