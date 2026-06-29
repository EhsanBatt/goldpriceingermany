import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional().default('/og-image.jpg'),
    date: z.date(),
    author: z.string().default('Editorial Team'),
    category: z.string().default('Gold News')
  })
});

export const collections = {
  'blog': blogCollection
};
