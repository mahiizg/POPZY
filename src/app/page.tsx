
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { PlusCircle, User } from 'lucide-react';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';

const profiles = [
  { name: 'Alice', icon: User },
  { name: 'Ben', icon: User },
  { name: 'Charlie', icon: User },
];

const PopcornDoodle = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("absolute w-24 h-24 text-primary/10", className)}
    >
        <g stroke="currentColor" strokeWidth="3" fill="hsl(var(--primary) / 0.2)">
            <motion.circle initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2, type:'spring'}} cx="50" cy="25" r="10" />
            <motion.circle initial={{scale:0}} animate={{scale:1}} transition={{delay:0.3, type:'spring'}} cx="40" cy="30" r="12" />
            <motion.circle initial={{scale:0}} animate={{scale:1}} transition={{delay:0.4, type:'spring'}} cx="60" cy="30" r="12" />
            <motion.circle initial={{scale:0}} animate={{scale:1}} transition={{delay:0.5, type:'spring'}} cx="32" cy="40" r="10" />
            <motion.circle initial={{scale:0}} animate={{scale:1}} transition={{delay:0.6, type:'spring'}} cx="68" cy="40" r="10" />
            <motion.circle initial={{scale:0}} animate={{scale:1}} transition={{delay:0.7, type:'spring'}} cx="50" cy="35" r="12" />
        </g>
  </svg>
);


export default function ProfilesPage() {
  const router = useRouter();

  const handleProfileSelect = () => {
    router.push('/browse');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 overflow-hidden relative">
      <PopcornDoodle className="top-10 left-10 transform -rotate-12" />
      <PopcornDoodle className="bottom-20 -right-5 transform rotate-[25deg] w-32 h-32" />
      <PopcornDoodle className="bottom-10 left-0 transform rotate-12 w-20 h-20" />
      <PopcornDoodle className="top-1/4 right-10 transform rotate-[15deg]" />


      <header className="absolute top-0 left-0 right-0 z-10 p-8">
        <Logo />
      </header>

      <main className="flex-grow flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Who's Watching?</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {profiles.map((profile) => (
              <motion.div
                key={profile.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center group"
              >
                <Card
                  className="w-32 h-32 md:w-40 md:h-40 overflow-hidden cursor-pointer bg-card/80 backdrop-blur-sm border-2 border-transparent group-hover:border-primary transition-colors"
                  onClick={handleProfileSelect}
                >
                  <CardContent className="p-0 flex items-center justify-center h-full">
                    <User className="w-16 h-16 md:w-20 md:h-20 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
                <p className="mt-3 text-lg font-medium text-foreground">{profile.name}</p>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-primary hover:bg-secondary/80 rounded-lg transition-colors backdrop-blur-sm"
                onClick={() => alert('Add new profile functionality coming soon!')}
              >
                <PlusCircle className="w-12 h-12 mb-2" />
                <span className="font-medium">Add Profile</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
