
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
    <path d="M30 90 L20 30 H 80 L 70 90 Z" fill="white" stroke="gray" strokeWidth="5"/>
    
    {/* Red Stripes */}
    <path d="M30 90 L20 30 H 35 L 40 90 Z" fill="#D94A4A"/>
    <path d="M50 30 L50 90" stroke="#D94A4A" strokeWidth="10"/>
    <path d="M70 90 L80 30 H 65 L 60 90 Z" fill="#D94A4A"/>

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
                    stiffness: 50,
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                } 
            },
        }}
    >
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="15" r="12" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="38" cy="20" r="14" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="62" cy="20" r="14" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="30" cy="30" r="12" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="70" cy="30" r="12" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="25" r="14" />
    </motion.g>
  </svg>
);


const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <div className="font-bold uppercase text-5xl tracking-wider text-foreground flex items-center">
        <span>P</span>
        <PopcornIcon className="w-16 h-16 mx-[-4px]" />
        <span>PZY</span>
      </div>
    </Link>
  );
};

export default Logo;
