
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
    <path d="M25 95 L18 45 H 82 L 75 95 Z" fill="white" stroke="gray" strokeWidth="5"/>
    
    {/* Red Stripes */}
    <path d="M25 95 L18 45 H 48 L 51 95 Z" fill="#D94A4A"/>
    <path d="M53 45 L53 95" stroke="#D94A4A" strokeWidth="8"/>
    <path d="M75 95 L82 45 H 56 L 54 95 Z" fill="#D94A4A"/>

    {/* Popcorn */}
    <motion.g 
        stroke="orange" 
        strokeWidth="2" 
        fill="#FFFBEA"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { y: -250, opacity: 0 },
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
        <motion.circle variants={{ hidden: { y: -250, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="25" r="10" />
        <motion.circle variants={{ hidden: { y: -250, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="40" cy="30" r="12" />
        <motion.circle variants={{ hidden: { y: -250, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="60" cy="30" r="12" />
        <motion.circle variants={{ hidden: { y: -250, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="32" cy="40" r="10" />
        <motion.circle variants={{ hidden: { y: -250, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="68" cy="40" r="10" />
        <motion.circle variants={{ hidden: { y: -250, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="35" r="12" />
    </motion.g>
  </svg>
);


const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center -ml-2', className)}>
      <div className="font-bold uppercase text-5xl text-foreground flex items-center">
        <span>P</span>
        <PopcornIcon className="w-[3.5rem] h-[3.5rem]" />
        <span>PZY</span>
      </div>
    </Link>
  );
};

export default Logo;
