import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const hikes = defineCollection({
  loader: glob({ base: "./src/content/hikes", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) => z.object({
      title: z.string(),
      date: z.string(),
      location: z.string(),
      distanceMiles: z.number(),
      elevationGainFt: z.number(),
      difficulty: z.string(),
      allTrailsUrl: z.string().url(),
      cover: image(),
      coverPosition: z.string().optional(),
      gallery: z.array(image()),
      ratings: z.object({
        trailQuality: z.string(),
        views: z.number().min(1).max(10),
        crowd: z.string(),
        overall: z.number().min(1).max(10),
      }),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { hikes };