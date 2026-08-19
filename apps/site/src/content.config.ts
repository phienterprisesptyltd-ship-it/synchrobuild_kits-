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

// These 15 entries are genuine SynchroBuild project photos migrated 1:1
// from the business's existing live site (apps/web), confirmed approved by
// the business owner - see docs/rebuild-plan.md §5. `placeholder` exists so
// any future unverified entry can be added and safely hidden from public
// pages/sitemap until confirmed, without needing a code change.
const projects = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
	schema: z.object({
		placeholder: z.boolean().default(true),
		title: z.string(),
		category: z.enum(['Exterior', 'Interior', 'Construction']),
		description: z.string(),
		image: z.string().url(),
		featured: z.boolean().default(false),
		order: z.number().default(0),
	}),
});

const config = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/config' }),
	schema: z.record(z.string(), z.any()),
});

// TODO(business): every entry here is currently `placeholder: true` -
// neutral "testimonial to be added" cards, not real customers. The old
// stock-photo testimonials are kept as reference (not published) in
// examples/sample-testimonials/ - do not restore those as real. When real
// testimonials are available, edit these files: set placeholder to false
// and fill in name/rating/quote/project/avatar.
const testimonials = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
	schema: z.object({
		placeholder: z.boolean().default(true),
		name: z.string().optional(),
		rating: z.number().min(1).max(5).optional(),
		quote: z.string().optional(),
		project: z.string().optional(),
		avatar: z.string().url().optional(),
	}),
});

export const collections = { floorPlans, projects, config, testimonials };
