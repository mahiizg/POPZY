
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PopcornIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
    {...props}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bucket */}
    <path d="M25 90 L35 20 H 65 L 75 90 Z" fill="white" stroke="gray" strokeWidth="1"/>
    
    {/* Red Stripes */}
    <path d="M35 20 L 37 90 H 43 L 41 20 Z" fill="#D94A4A"/>
    <path d="M49 20 L 51 90 H 57 L 55 20 Z" fill="#D94A4A"/>
    <path d="M63 20 L 65 90 H 71 L 69 20 Z" fill="#D94A4A"/>

    {/* Popcorn */}
    <g stroke="orange" strokeWidth="1" fill="#FFFBEA">
        <circle cx="50" cy="20" r="10" />
        <circle cx="40" cy="25" r="12" />
        <circle cx="60" cy="25" r="12" />
        <circle cx="35" cy="40" r="10" />
        <circle cx="65" cy="40" r="10" />
        <circle cx="50" cy="35" r="12" />
    </g>
  </svg>
);


const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <div className="font-bold uppercase text-3xl tracking-wider text-foreground flex items-center">
        <span>P</span>
        <PopcornIcon className="w-8 h-8 mx-[-2px]" />
        <span>PZY</span>
      </div>
    </Link>
  );
};

export default Logo;
