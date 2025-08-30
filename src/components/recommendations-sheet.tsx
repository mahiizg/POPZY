'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { recommendContentBasedOnHistory, RecommendContentBasedOnHistoryInput, RecommendContentBasedOnHistoryOutput } from '@/ai/flows/recommend-content-based-on-history';
import type { EntertainmentContent } from '@/lib/types';
import { Loader2, Trash2, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';

interface RecommendationsSheetProps {
  children: React.ReactNode;
  viewingHistory: EntertainmentContent[];
  onClearHistory: () => void;
}

export function RecommendationsSheet({ children, viewingHistory, onClearHistory }: RecommendationsSheetProps) {
  const [recommendations, setRecommendations] = useState<RecommendContentBasedOnHistoryOutput>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    if (viewingHistory.length === 0) {
      setError('Your viewing history is empty. Watch some content to get recommendations.');
      setIsLoading(false);
      return;
    }

    try {
      const historyForAI: RecommendContentBasedOnHistoryInput['viewingHistory'] = viewingHistory.map(item => ({
        title: item.title,
        category: item.category,
        genre: item.genres.join(', '),
        imdbRating: item.imdbRating,
        rottenTomatoesRating: item.rottenTomatoesRating,
      }));

      const result = await recommendContentBasedOnHistory({ viewingHistory: historyForAI });
      setRecommendations(result);
    } catch (e) {
      console.error(e);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet onOpenChange={(open) => !open && setRecommendations([])}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>AI-Powered Recommendations</SheetTitle>
          <SheetDescription>Based on your viewing history, we think you'll love these.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-6">
            <div className="py-4 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Your Viewing History</CardTitle>
                    {viewingHistory.length > 0 && (
                      <Button variant="ghost" size="icon" onClick={onClearHistory} aria-label="Clear history" className="h-7 w-7">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {viewingHistory.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No history yet. Mark content as 'Watched' to add it.</p>
                  ) : (
                    <div className="space-y-3">
                      {viewingHistory.map(item => (
                        <div key={item.id} className="flex items-center gap-4 text-sm">
                          <Image src={item.imageUrl} alt={item.title} width={40} height={60} className="rounded-sm object-cover aspect-[2/3]" data-ai-hint={item.imageHint}/>
                          <span className="font-medium flex-1 truncate">{item.title}</span>
                          <span className="ml-auto text-xs capitalize text-muted-foreground">{item.category}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {error && <p className="text-destructive text-sm text-center">{error}</p>}
              
              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {recommendations.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold">Our Top Picks for You</h3>
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="bg-background">
                      <CardHeader>
                        <CardTitle className="text-base">{rec.title}</CardTitle>
                        <CardDescription>
                          <span className="capitalize font-medium">{rec.category}</span> - <span className="capitalize">{rec.genre}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{rec.reason}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        <SheetFooter className="mt-auto pt-4 border-t">
          <Button onClick={handleGetRecommendations} disabled={isLoading || viewingHistory.length === 0} className="w-full" variant="primary">
            <Wand2 className="mr-2 h-4 w-4" />
            {isLoading ? 'Thinking...' : 'Generate New Recommendations'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
