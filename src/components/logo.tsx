
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
    <path d="M35 90 L25 40 H 75 L 65 90 Z" fill="white" stroke="gray" strokeWidth="5"/>
    
    {/* Red Stripes */}
    <path d="M35 90 L25 40 H 40 L 45 90 Z" fill="#D94A4A"/>
    <path d="M50 40 L50 90" stroke="#D94A4A" strokeWidth="10"/>
    <path d="M65 90 L75 40 H 60 L 55 90 Z" fill="#D94A4A"/>

    {/* Popcorn */}
    <motion.g 
        stroke="orange" 
        strokeWidth="2" 
        fill="#FFFBEA"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { y: -80, opacity: 0 },
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
        <motion.circle variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="25" r="12" />
        <motion.circle variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="38" cy="30" r="14" />
        <motion.circle variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="62" cy="30" r="14" />
        <motion.circle variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="30" cy="40" r="12" />
        <motion.circle variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="70" cy="40" r="12" />
        <motion.circle variants={{ hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="35" r="14" />
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
