'use client';

import Logo from './logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { RecommendationsSheet } from './recommendations-sheet';
import type { EntertainmentContent } from '@/lib/types';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewingHistory: EntertainmentContent[];
  onClearHistory: () => void;
}

export default function Header({ searchTerm, setSearchTerm, viewingHistory, onClearHistory }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <div className="relative w-full max-w-xs sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <RecommendationsSheet viewingHistory={viewingHistory} onClearHistory={onClearHistory}>
             <Button variant="secondary" className="shrink-0">
              <Sparkles className="mr-0 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Recommendations</span>
            </Button>
          </RecommendationsSheet>
        </div>
      </div>
    </header>
  );
}
