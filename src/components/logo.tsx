
'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PopcornIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
    {...props}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bucket */}
    <g transform="translate(12, 30) scale(0.75)">
      <path d="M30 85 L25 45 H 75 L 70 85 Z" fill="white" stroke="gray" strokeWidth="6"/>
      {/* Red Stripes */}
      <path d="M30 85 L25 45 H 50 L 50 85 Z" fill="#D94A4A"/>
      <path d="M55 45 H 75 L 70 85 H 55 Z" fill="#D94A4A"/>
    </g>

    {/* Popcorn */}
    <motion.g 
        stroke="orange" 
        strokeWidth="2" 
        fill="#FFFBEA"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { y: -50, opacity: 0 },
            visible: { 
                y: 0, 
                opacity: 1,
                transition: { 
                    type: "spring",
                    stiffness: 40,
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                } 
            },
        }}
    >
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="25" r="10" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="40" cy="30" r="12" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="60" cy="30" r="12" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="32" cy="40" r="10" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="68" cy="40" r="10" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="35" r="12" />
    </motion.g>
  </svg>
);


const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <div className="font-bold uppercase text-5xl text-foreground flex items-center">
        <span className="tracking-tighter">P</span>
        <PopcornIcon className="w-[3.2rem] h-[3.2rem] -ml-2" />
        <span className="tracking-tighter">PZY</span>
      </div>
    </Link>
  );
};

export default Logo;
