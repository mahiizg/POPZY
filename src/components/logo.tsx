
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
    <path d="M35 95 L25 65 H 75 L 65 95 Z" fill="white" stroke="gray" strokeWidth="4"/>
    
    {/* Red Stripes */}
    <path d="M35 95 L25 65 H 42 L 44 95 Z" fill="#D94A4A"/>
    <path d="M50 65 L50 95" stroke="#D94A4A" strokeWidth="6"/>
    <path d="M65 95 L75 65 H 58 L 56 95 Z" fill="#D94A4A"/>

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
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="45" r="10" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="40" cy="50" r="12" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="60" cy="50" r="12" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="32" cy="60" r="10" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="68" cy="60" r="10" />
        <motion.circle variants={{ hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} cx="50" cy="55" r="12" />
    </motion.g>
  </svg>
);


const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <div className="font-bold uppercase text-5xl tracking-wider text-foreground flex items-center">
        <span>P</span>
        <PopcornIcon className="w-[4.5rem] h-[4.5rem]" />
        <span>PZY</span>
      </div>
    </Link>
  );
};

export default Logo;
