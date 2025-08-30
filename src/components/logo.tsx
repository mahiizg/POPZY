
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
    <path d="M40 90 L35 70 H 65 L 60 90 Z" fill="white" stroke="gray" strokeWidth="3"/>
    
    {/* Red Stripes */}
    <path d="M40 90 L35 70 H 45 L 47 90 Z" fill="#D94A4A"/>
    <path d="M50 70 L50 90" stroke="#D94A4A" strokeWidth="5"/>
    <path d="M60 90 L65 70 H 55 L 53 90 Z" fill="#D94A4A"/>

    {/* Popcorn */}
    <motion.g 
        stroke="orange" 
        strokeWidth="2" 
        fill="#FFFBEA"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { y: -30, opacity: 0 },
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
        <motion.circle variants={{ hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="50" r="10" />
        <motion.circle variants={{ hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="40" cy="55" r="12" />
        <motion.circle variants={{ hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="60" cy="55" r="12" />
        <motion.circle variants={{ hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="32" cy="65" r="10" />
        <motion.circle variants={{ hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="68" cy="65" r="10" />
        <motion.circle variants={{ hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="60" r="12" />
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
