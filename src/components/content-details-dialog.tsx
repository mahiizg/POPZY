'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { EntertainmentContent } from '@/lib/types';
import Image from 'next/image';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Share2, Link as LinkIcon, Twitter, Facebook, Cherry, Languages, Captions } from 'lucide-react';
import { useState, useEffect } from 'react';

function SocialSharePopover({ content }: { content: EntertainmentContent }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Ensure window is defined before using it
    setShareUrl(window.location.href);
  }, []);

  const text = `Check out ${content.title} on Popzy!`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="flex items-center gap-2">
           <Button asChild variant="ghost" size="icon">
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                <Twitter className="h-5 w-5" />
              </a>
           </Button>
           <Button asChild variant="ghost" size="icon">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                <Facebook className="h-5 w-5" />
            </a>
           </Button>
           <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy link">
             <LinkIcon className="h-5 w-5" />
           </Button>
           {copied && <span className="text-xs text-muted-foreground animate-pulse">Copied!</span>}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ContentDetailsDialog({
  children,
  content,
}: {
  children: React.ReactNode;
  content: EntertainmentContent;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <Image
              src={content.imageUrl}
              alt={content.title}
              width={400}
              height={600}
              className="w-full h-full object-cover rounded-l-lg hidden md:block"
              data-ai-hint={content.imageHint}
            />
            <Image
              src={content.imageUrl}
              alt={content.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-t-lg md:hidden"
              data-ai-hint={content.imageHint}
            />
          </div>
          <div className="md:col-span-2 p-6 flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">{content.title}</DialogTitle>
              <DialogDescription className="capitalize text-base pt-1">{content.category}</DialogDescription>
            </DialogHeader>
            <div className="my-4 text-muted-foreground">
              <p>{content.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 my-4">
              {content.genres.map(genre => (
                <Badge key={genre} variant="outline" className="capitalize">{genre}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-6 my-4">
                <div className="flex items-center gap-2">
                    <div className="px-2 py-1 bg-[#F5C518] rounded">
                        <span className="font-bold text-black text-sm">IMDb</span>
                    </div>
                    <span className="font-bold text-lg text-foreground">{content.imdbRating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Cherry className="w-6 h-6 text-red-600 fill-current" />
                    <span className="font-bold text-lg text-foreground">{content.rottenTomatoesRating}%</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
                <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Languages/> Languages</h4>
                    <div className="flex flex-wrap gap-2">
                    {content.languages.map(lang => <Badge key={lang} variant="secondary">{lang}</Badge>)}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Captions/> Subtitles</h4>
                    <div className="flex flex-wrap gap-2">
                    {content.subtitles.map(sub => <Badge key={sub} variant="secondary">{sub}</Badge>)}
                    </div>
                </div>
            </div>
             <div className="mt-auto pt-6">
                <SocialSharePopover content={content} />
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
