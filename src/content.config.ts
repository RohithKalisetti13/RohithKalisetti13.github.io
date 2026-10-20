import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    outcome: z.string(),
    problem: z.string(),
    architecture: z.string(),
    contribution: z.string(),
    decisions: z.array(z.string()),
    results: z.string(),
    stack: z.array(z.string()),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/work' }),
  // file names carry the resume order ("01-..."); the slug field becomes the entry id
  schema: z.object({
    slug: z.string(),
    org: z.string(),
    role: z.string(),
    location: z.string(),
    start: z.string(),
    end: z.string(),
    kind: z.enum(['flash', 'rom']),
    address: z.string(),
    bullets: z.array(z.string()),
  }),
});

export const collections = { projects, work };
