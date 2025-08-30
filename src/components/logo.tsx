import { cn } from '@/lib/utils';
import Link from 'next/link';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <span className="font-bold uppercase text-xl tracking-wider text-foreground">
        Popzy
      </span>
    </Link>
  );
};

export default Logo;
