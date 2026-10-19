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
  schema: z.object({
    order: z.number(),
    org: z.string(),
    role: z.string(),
    dates: z.string(),
    summary: z.string(),
  }),
});

export const collections = { projects, work };
