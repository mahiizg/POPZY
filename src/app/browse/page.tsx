
'use client';

import { useState, useEffect } from 'react';
import type { EntertainmentContent, Category, Genre } from '@/lib/types';
import { mockContent, genres as allGenres } from '@/lib/data';
import Header from '@/components/header';
import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ListFilter, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function BrowsePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [activeGenres, setActiveGenres] = useState<Genre[]>([]);
  const [filteredContent, setFilteredContent] = useState<EntertainmentContent[]>([]);
  const [viewingHistory, setViewingHistory] = useState<EntertainmentContent[]>([]);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedHistory = localStorage.getItem('popzyViewingHistory');
      if (storedHistory) {
        setViewingHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse viewing history from localStorage", error);
      setViewingHistory([]);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('popzyViewingHistory', JSON.stringify(viewingHistory));
    }
  }, [viewingHistory, isMounted]);

  useEffect(() => {
    let content = mockContent.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeCategory !== 'all') {
      content = content.filter(item => item.category === activeCategory);
    }

    if (activeGenres.length > 0) {
      content = content.filter(item =>
        activeGenres.some(genre => item.genres.includes(genre))
      );
    }
    setFilteredContent(content);
  }, [searchTerm, activeCategory, activeGenres, isMounted]);

  const handleMarkAsWatched = (content: EntertainmentContent) => {
    setViewingHistory(prev => {
      const isWatched = prev.some(item => item.id === content.id);
      if (isWatched) {
        return prev.filter(item => item.id !== content.id);
      } else {
        return [...prev, content];
      }
    });
  };

  const handleClearHistory = () => {
    setViewingHistory([]);
  };

  const categories: (Category | 'all')[] = ['all', 'movie', 'tv show', 'webseries'];

  if (!isMounted) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <Film className="w-12 h-12 animate-spin text-primary"/>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        viewingHistory={viewingHistory}
        onClearHistory={handleClearHistory}
      />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'secondary'}
                  onClick={() => setActiveCategory(category)}
                  className="capitalize shrink-0"
                >
                  {category}
                </Button>
              ))}
              <Button
                  variant='secondary'
                  onClick={() => router.push('/order-popcorn')}
                  className="capitalize shrink-0"
                >
                  Order Popcorn
              </Button>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto shrink-0">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Genres
                  {activeGenres.length > 0 && ` (${activeGenres.length})`}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filter by Genre</h4>
                    <p className="text-sm text-muted-foreground">Select one or more genres.</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2">
                      {allGenres.map(genre => (
                          <Label key={genre} className="flex items-center space-x-2 font-normal capitalize cursor-pointer">
                              <Checkbox 
                                  id={genre} 
                                  checked={activeGenres.includes(genre)}
                                  onCheckedChange={(checked) => {
                                      setActiveGenres(prev => 
                                          checked ? [...prev, genre] : prev.filter(g => g !== genre)
                                      )
                                  }}
                              />
                              <span>{genre}</span>
                          </Label>
                      ))}
                  </div>
                  {activeGenres.length > 0 && <Button variant="ghost" size="sm" onClick={() => setActiveGenres([])}>Clear all</Button>}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <AnimatePresence>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredContent.map(content => (
                <motion.div layout key={content.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <ContentCard
                    content={content}
                    onMarkAsWatched={handleMarkAsWatched}
                    isWatched={viewingHistory.some(item => item.id === content.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredContent.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">No Content Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
              <Button onClick={() => { setSearchTerm(''); setActiveCategory('all'); setActiveGenres([]); }} className="mt-4">Reset Filters</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
