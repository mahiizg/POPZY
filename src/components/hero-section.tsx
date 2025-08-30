
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayCircle, Info } from 'lucide-react';
import type { EntertainmentContent } from '@/lib/types';
import { motion } from 'framer-motion';
import { ContentDetailsDialog } from './content-details-dialog';

interface HeroSectionProps {
  content: EntertainmentContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end pb-16 md:pb-24 text-white">
      <div className="absolute inset-0">
        <Image
          src={content.imageUrl}
          alt={content.title}
          fill
          className="object-cover"
          data-ai-hint={content.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 container mx-auto px-4"
      >
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">{content.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-4 text-sm md:text-base">
            <span>{content.imdbRating.toFixed(1)} IMDb</span>
            <span>{content.rottenTomatoesRating}%</span>
            <span className="capitalize">{content.category}</span>
            <span className="capitalize">{content.genres[0]}</span>
          </div>
          <p className="text-base md:text-lg text-white/90 mb-8 line-clamp-3">{content.description}</p>
          <div className="flex items-center gap-4">
            <Button size="lg">
              <PlayCircle className="mr-2" />
              Watch Now
            </Button>
            <ContentDetailsDialog content={content}>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Info className="mr-2" />
                Details
              </Button>
            </ContentDetailsDialog>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
