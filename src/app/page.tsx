
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, PlusCircle, User, UserCog, UserCheck } from 'lucide-react';
import Logo from '@/components/logo';

const profiles = [
  { name: 'Alice', icon: User },
  { name: 'Ben', icon: UserCog },
  { name: 'Charlie', icon: UserCheck },
];

export default function ProfilesPage() {
  const router = useRouter();

  const handleProfileSelect = () => {
    router.push('/browse');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="absolute top-8">
        <Logo />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Who's Watching?</h1>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {profiles.map((profile) => (
            <motion.div
              key={profile.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center"
            >
              <Card 
                className="w-32 h-32 md:w-40 md:h-40 overflow-hidden cursor-pointer bg-card border-2 border-transparent hover:border-primary transition-colors"
                onClick={handleProfileSelect}
              >
                <CardContent className="p-0 flex items-center justify-center h-full">
                  <profile.icon className="w-16 h-16 md:w-20 md:h-20 text-muted-foreground group-hover:text-primary transition-colors" />
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
              className="w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
              onClick={() => alert('Add new profile functionality coming soon!')}
            >
              <PlusCircle className="w-12 h-12 mb-2" />
              <span className="font-medium">Add Profile</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
