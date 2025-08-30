'use server';
/**
 * @fileOverview Recommends content based on user viewing history and preferences.
 *
 * - recommendContentBasedOnHistory - A function that recommends content based on user history.
 * - RecommendContentBasedOnHistoryInput - The input type for the recommendContentBasedOnHistory function.
 * - RecommendContentBasedOnHistoryOutput - The return type for the recommendContentBasedOnHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentBasedOnHistoryInputSchema = z.object({
  viewingHistory: z.array(
    z.object({
      title: z.string().describe('Title of the content.'),
      category: z
        .enum(['webseries', 'tv show', 'movie'])
        .describe('Category of the content.'),
      genre: z.string().describe('Genre of the content.'),
      imdbRating: z.number().optional().describe('IMDB rating of the content.'),
      rottenTomatoesRating:
        z.number().optional().describe('Rotten Tomatoes rating of the content.'),
    })
  ).describe('The user viewing history.'),
  preferences: z
    .string()
    .optional()
    .describe('User specified preferences such as actors, directors, etc.'),
});
export type RecommendContentBasedOnHistoryInput = z.infer<
  typeof RecommendContentBasedOnHistoryInputSchema
>;

const RecommendContentBasedOnHistoryOutputSchema = z.array(
  z.object({
    title: z.string().describe('Title of the recommended content.'),
    category:
      z.enum(['webseries', 'tv show', 'movie']).describe('Category of content'),
    genre: z.string().describe('Genre of the recommended content.'),
    reason: z.string().describe('Reason for recommending the content'),
  })
);

export type RecommendContentBasedOnHistoryOutput = z.infer<
  typeof RecommendContentBasedOnHistoryOutputSchema
>;

export async function recommendContentBasedOnHistory(
  input: RecommendContentBasedOnHistoryInput
): Promise<RecommendContentBasedOnHistoryOutput> {
  return recommendContentBasedOnHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentBasedOnHistoryPrompt',
  input: {schema: RecommendContentBasedOnHistoryInputSchema},
  output: {schema: RecommendContentBasedOnHistoryOutputSchema},
  prompt: `Based on the user's viewing history and preferences, recommend relevant content.

Here is the viewing history:
{{#each viewingHistory}}
- Title: {{this.title}}, Category: {{this.category}}, Genre: {{this.genre}}{{#if this.imdbRating}}, IMDB Rating: {{this.imdbRating}}{{/if}}{{#if this.rottenTomatoesRating}}, Rotten Tomatoes Rating: {{this.rottenTomatoesRating}}{{/if}}
{{/each}}

{{#if preferences}}
Here are the user preferences: {{preferences}}
{{/if}}

Recommend content that the user might enjoy, providing a brief reason for each recommendation.
Ensure the category is one of webseries, tv show, or movie.
`,
});

const recommendContentBasedOnHistoryFlow = ai.defineFlow(
  {
    name: 'recommendContentBasedOnHistoryFlow',
    inputSchema: RecommendContentBasedOnHistoryInputSchema,
    outputSchema: RecommendContentBasedOnHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
