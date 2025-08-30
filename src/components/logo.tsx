
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PopcornIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
    {...props}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="popcorn-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FDFCEC' }} />
        <stop offset="100%" style={{ stopColor: '#FBEFB4' }} />
      </linearGradient>
    </defs>

    {/* Popcorn Kernels - Simplified */}
    <g fill="url(#popcorn-gradient)" stroke="#E5A000" strokeWidth="2">
      <path d="M35,50 Q25,40 37,35 Q45,25 53,35 Q65,40 55,50 Z" />
      <path d="M55,45 Q65,35 70,45 Q75,55 65,60 Z" />
      <path d="M45,30 Q40,22 50,25 Q60,28 55,38 Z" />
    </g>

    {/* Bucket */}
    <path d="M20,95 L30,50 H70 L80,95 Z" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1"/>
    
    {/* Stripes */}
    <path d="M30,50 L28,95 H35 L37,50 Z" fill="#E53E3E" />
    <path d="M44,50 L42,95 H49 L51,50 Z" fill="#E53E3E" />
    <path d="M58,50 L56,95 H63 L65,50 Z" fill="#E53E3E" />
    <path d="M72,50 L70,95 H77 L79,50 Z" fill="#E53E3E" />
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
