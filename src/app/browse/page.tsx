
'use client';

import { useState, useEffect } from 'react';
import type { EntertainmentContent, Category, Genre } from '@/lib/types';
import { mockContent, genres as allGenres } from '@/lib/data';
import Header from '@/components/header';
import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Film, Tv, Clapperboard, Home as HomeIcon, ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarProvider, SidebarContent, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { HeroSection } from '@/components/hero-section';

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

  const categories: {name: Category | 'all', label: string, icon: React.ElementType}[] = [
    { name: 'all', label: 'Home', icon: HomeIcon },
    { name: 'movie', label: 'Movies', icon: Film },
    { name: 'tv show', label: 'TV Shows', icon: Tv }, 
    { name: 'webseries', label: 'Webseries', icon: Clapperboard }
  ];
  
  const featuredContent = mockContent.find(c => c.id === 'action-movie-8');


  if (!isMounted) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <Film className="w-12 h-12 animate-spin text-primary"/>
        </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader className="md:hidden">
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push('/')} tooltip="Profiles">
                <HomeIcon />
                <span>Profiles</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Separator className="my-2" />
          <SidebarMenu>
            {categories.map(({name, label, icon: Icon}) => (
              <SidebarMenuItem key={name}>
                <SidebarMenuButton 
                  onClick={() => setActiveCategory(name)} 
                  isActive={activeCategory === name}
                  tooltip={label}
                >
                  <Icon />
                  <span className="capitalize">{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
           <Separator className="my-2" />
          <SidebarGroup>
            <SidebarGroupLabel className='flex items-center gap-2'>
              <ListFilter className="w-4 h-4" />
              <span>Genres</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="grid grid-cols-1 gap-y-2 max-h-64 overflow-y-auto pr-2">
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
              {activeGenres.length > 0 && <Button variant="ghost" size="sm" onClick={() => setActiveGenres([])} className="w-full mt-2 justify-start px-2 h-auto py-1">Clear all</Button>}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <main className="flex-1">
            {featuredContent && <HeroSection content={featuredContent} />}
            <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-semibold capitalize">{activeCategory === 'all' ? 'Home' : activeCategory}</h2>
                <SidebarTrigger className="md:hidden" />
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
      </SidebarInset>
    </SidebarProvider>
  );
}
