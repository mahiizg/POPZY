
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PopcornIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
    {...props}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bucket */}
    <path d="M30 90 L20 30 H 80 L 70 90 Z" fill="white" stroke="gray" strokeWidth="3"/>
    
    {/* Red Stripes */}
    <path d="M30 90 L20 30 H 35 L 40 90 Z" fill="#D94A4A"/>
    <path d="M50 30 L50 90" stroke="#D94A4A" strokeWidth="8"/>
    <path d="M70 90 L80 30 H 65 L 60 90 Z" fill="#D94A4A"/>

    {/* Popcorn */}
    <g stroke="orange" strokeWidth="2" fill="#FFFBEA">
        <circle cx="50" cy="25" r="12" />
        <circle cx="38" cy="30" r="14" />
        <circle cx="62" cy="30" r="14" />
        <circle cx="30" cy="40" r="12" />
        <circle cx="70" cy="40" r="12" />
        <circle cx="50" cy="35" r="14" />
    </g>
  </svg>
);


const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <div className="font-bold uppercase text-5xl tracking-wider text-foreground flex items-center">
        <span>P</span>
        <PopcornIcon className="w-12 h-12 mx-[-4px]" />
        <span>PZY</span>
      </div>
    </Link>
  );
};

export default Logo;
