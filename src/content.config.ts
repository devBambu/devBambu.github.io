import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    project: z.enum(['moha', 'leaflog', 'whereToFit', 'general']),
    type: z.enum(['technical-decision', 'troubleshooting', 'improvement']).optional(),
    tags: z.array(z.string()).optional(),
    discussionStartedAt: z.coerce.date().nullable().optional(),
    discussionEndedAt: z.coerce.date().nullable().optional(),
    draftDate: z.coerce.date().nullable().optional(),
    publishedDate: z.coerce.date().nullable().optional(),
    status: z.enum(['draft', 'published']).optional(),
    publishedUrl: z.string().url().nullable().optional(),
  }),
});

export const collections = { blog };
