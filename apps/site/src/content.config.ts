import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const floorPlans = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/floorPlans' }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		type: z.string(),
		beds: z.number(),
		baths: z.number(),
		squareMeters: z.number().nullable().default(null),
		features: z.array(z.string()).default([]),
		image: z.string().url(),
		customImages: z.array(z.string().url()).default([]),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		category: z.enum(['Exterior', 'Interior', 'Construction']),
		description: z.string(),
		image: z.string().url(),
		featured: z.boolean().default(false),
		order: z.number().default(0),
	}),
});

const testimonials = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
	schema: z.object({
		name: z.string(),
		rating: z.number().min(1).max(5),
		quote: z.string(),
		project: z.string(),
		avatar: z.string().url(),
		verified: z.boolean().default(false),
	}),
});

const config = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/config' }),
	schema: z.record(z.string(), z.any()),
});

export const collections = { floorPlans, projects, testimonials, config };
