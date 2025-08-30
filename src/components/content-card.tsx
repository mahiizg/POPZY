
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { EntertainmentContent } from '@/lib/types';
import { Eye, Star, Info, Film, Tv } from 'lucide-react';
import { ContentDetailsDialog } from './content-details-dialog';

interface ContentCardProps {
  content: EntertainmentContent;
  onMarkAsWatched: (content: EntertainmentContent) => void;
  isWatched: boolean;
}

export function ContentCard({ content, onMarkAsWatched, isWatched }: ContentCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
      <CardHeader className="p-0 relative">
        <Image
          src={content.imageUrl}
          alt={content.title}
          width={400}
          height={225}
          className="w-full h-48 object-cover"
          data-ai-hint={content.imageHint}
        />
         <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/60 text-white p-1.5 rounded-md text-xs font-semibold backdrop-blur-sm">
            <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-[#F5C518] rounded-sm flex items-center justify-center">
                    <span className="text-black text-[10px] font-bold">IMDb</span>
                </div>
                <span>{content.imdbRating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
                 <Film className="w-3 h-3 text-red-500 fill-current" />
                <span>{content.rottenTomatoesRating}%</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <CardTitle className="text-lg mb-2 leading-tight">{content.title}</CardTitle>
        <div className="flex flex-wrap gap-1">
          {content.genres.slice(0, 3).map(genre => (
            <Badge key={genre} variant="secondary" className="capitalize">{genre}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <ContentDetailsDialog content={content}>
           <Button variant="outline" className="w-full">
             <Info className="mr-2 h-4 w-4" />
             Details
           </Button>
        </ContentDetailsDialog>
        <Button 
          variant={isWatched ? 'default' : 'secondary'} 
          onClick={() => onMarkAsWatched(content)} 
          className="w-full"
        >
          <Eye className="mr-2 h-4 w-4" />
          {isWatched ? 'Watched' : 'Watch'}
        </Button>
      </CardFooter>
    </Card>
  );
}
