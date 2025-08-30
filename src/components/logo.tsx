import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <Image
        src="/popzy.svg"
        alt="Popzy"
        width={90}
        height={30}
        className="h-auto w-auto"
      />
    </Link>
  );
};

export default Logo;
