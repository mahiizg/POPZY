
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PopcornIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
    {...props}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bucket */}
    <path d="M35 80 L30 40 H 70 L 65 80 Z" fill="white" stroke="gray" strokeWidth="3"/>
    
    {/* Red Stripes */}
    <path d="M35 80 L30 40 H 40 L 43 80 Z" fill="#D94A4A"/>
    <path d="M50 40 L50 80" stroke="#D94A4A" strokeWidth="6"/>
    <path d="M65 80 L70 40 H 60 L 57 80 Z" fill="#D94A4A"/>

    {/* Popcorn */}
    <g stroke="orange" strokeWidth="2" fill="#FFFBEA">
        <circle cx="50" cy="30" r="10" />
        <circle cx="40" cy="35" r="12" />
        <circle cx="60" cy="35" r="12" />
        <circle cx="35" cy="45" r="10" />
        <circle cx="65" cy="45" r="10" />
        <circle cx="50" cy="40" r="12" />
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
