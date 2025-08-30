'use client';
export type Category = "webseries" | "tv show" | "movie";

export type Genre = 
  | "comedy" | "romcom" | "heartbreak" | "horror" | "action" 
  | "adventure" | "drama" | "thriller" | "scifi" | "fantasy" 
  | "mystery" | "crime" | "biopic" | "documentary";

export interface EntertainmentContent {
  id: string;
  title: string;
  description: string;
  category: Category;
  genres: Genre[];
  imdbRating: number;
  rottenTomatoesRating: number;
  imageUrl: string;
  imageHint: string;
  languages: string[];
  subtitles: string[];
}
