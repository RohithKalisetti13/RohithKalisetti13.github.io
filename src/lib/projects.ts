import { getCollection } from 'astro:content';
import type { Project } from '../content.config';

// published projects in display order (file names carry it); parked drafts are left out
export const getProjects = async () =>
  (await getCollection('projects'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => (a.filePath ?? '').localeCompare(b.filePath ?? ''))
    .map((p) => ({ id: p.id, data: p.data as Project }));
