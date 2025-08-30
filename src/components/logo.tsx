
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

    {/* Popcorn Kernels */}
    <g fill="url(#popcorn-gradient)" stroke="#E5A000" strokeWidth="1">
      <path d="M40,45 Q30,35 42,30 Q50,20 58,30 Q70,35 60,45 Z" />
      <path d="M60,40 Q70,30 75,40 Q80,50 70,55 Z" />
      <path d="M30,50 Q20,40 28,35 Q35,28 40,38 Z" />
      <path d="M50,28 Q45,20 55,22 Q65,25 60,35 Z" />
      <path d="M45,35 Q40,25 50,28 Q60,30 55,40 Z" />
      <path d="M65,45 Q75,40 78,50 Q80,60 70,60 Z" />
      <path d="M25,55 Q18,48 25,42 Q32,38 35,48 Z" />
      <path d="M52,32 Q50,25 58,28 Q65,32 60,42 Z" />
       <path d="M48,48 Q40,40 50,35 Q60,40 55,50Z" />
      <path d="M62,50 Q72,45 76,55 Q80,65 70,65Z" />
      <path d="M35,55 Q28,50 33,45 Q40,42 42,52Z" />
      <path d="M55,38 Q50,30 60,32 Q68,35 63,45Z" />
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
