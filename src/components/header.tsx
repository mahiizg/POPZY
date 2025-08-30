
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popcorn, Search } from 'lucide-react';
import Logo from './logo';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  const router = useRouter();
  let sidebar;
  try {
    sidebar = useSidebar();
  } catch (e) {
    sidebar = null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {sidebar && <SidebarTrigger />}
          <div className="hidden md:flex">
            <Logo />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => router.push('/order-popcorn')}>
            <Popcorn className="mr-2 h-4 w-4" />
            Order Popcorn
          </Button>
        </div>
      </div>
    </header>
  );
}
