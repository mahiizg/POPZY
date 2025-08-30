import { cn } from '@/lib/utils';
import Link from 'next/link';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('text-3xl font-bold text-foreground tracking-tighter', className)}>
      Popzy
    </Link>
  );
};

export default Logo;
