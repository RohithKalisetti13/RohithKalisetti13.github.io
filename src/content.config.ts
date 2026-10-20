import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// file names carry the display order ("01-..."); the slug field becomes the entry id.
// Parked entries keep their old fields and are never rendered or linked.
const project = z.object({
  slug: z.string(),
  title: z.string(),
  status: z.enum(['wip', 'shipped']),
  period: z.string(),
  stack: z.array(z.string()),
  summary: z.string().optional(),
  highlights: z.array(z.string()),
  repo: z.url().optional(),
  note: z.string().optional(),
  draft: z.literal(false).optional(),
});
const parked = z.looseObject({ draft: z.literal(true) });

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.union([project, parked]),
});

export type Project = z.infer<typeof project>;

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
