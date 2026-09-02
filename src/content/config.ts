import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const featureItem = z.object({
  name: z.string(),
  desc: z.string().optional(),
  list: z.array(z.string()).optional(),
});

const heroSchema = z.object({
  eyebrow: z.string().optional(),
  h1: z.string(),
  tagline: z.string(),
});

const sectionSchema = z.object({
  heading: z.string(),
  intro: z.string().optional(),
  outro: z.string().optional(),
});

const specTableSchema = z.object({
  heading: z.string().optional(),
  intro: z.string().optional(),
  columns: z.array(z.string()),
  rows: z.array(z.array(z.string())),
  note: z.string().optional(),
  wide: z.boolean().optional(),
});

const ctaSchema = z.object({
  title: z.string(),
  desc: z.string().optional(),
  buttonLabel: z.string(),
  href: z.string(),
});

export const websiteSchema = z.object({
  page: z.literal('website'),
  title: z.string(),
  description: z.string(),
  hero: heroSchema,
  whyUs: sectionSchema.extend({ items: z.array(featureItem) }),
  plans: sectionSchema.extend({
    items: z.array(
      z.object({
        eyebrow: z.string(),
        name: z.string(),
        desc: z.string(),
        points: z.array(z.object({ name: z.string(), desc: z.string() })),
      }),
    ),
  }),
  customValue: sectionSchema.extend({ items: z.array(featureItem) }),
  serviceGroups: z.object({
    heading: z.string(),
    intro: z.string().optional(),
    note: z.string().optional(),
    columns: z.array(z.string()),
    groups: z.array(
      z.object({
        name: z.string(),
        intro: z.string().optional(),
        rows: z.array(z.array(z.string())),
      }),
    ),
  }),
  featureModules: z.object({
    heading: z.string(),
    intro: z.string().optional(),
    columns: z.array(z.string()),
    rows: z.array(z.array(z.string())),
  }),
  guarantee: sectionSchema.extend({
    items: z.array(z.object({ name: z.string(), points: z.array(z.string()) })),
  }),
  ops: z.object({ heading: z.string(), body: z.array(z.string()) }),
  cta: ctaSchema,
});

export const marketingSchema = z.object({
  page: z.literal('marketing'),
  title: z.string(),
  description: z.string(),
  hero: heroSchema,
  plans: z.object({
    heading: z.string(),
    intro: z.string().optional(),
    items: z.array(
      z.object({
        name: z.string(),
        tag: z.string().optional(),
        countries: z.string(),
        period: z.string(),
      }),
    ),
  }),
  delivery: sectionSchema.extend({ tables: z.array(specTableSchema) }),
  inquiryStandard: z.object({
    heading: z.string(),
    intro: z.string().optional(),
    regions: z.array(
      z.object({ name: z.string(), desc: z.string().optional(), countries: z.array(z.string()) }),
    ),
    note: z.string().optional(),
  }),
  eightElements: sectionSchema.extend({
    items: z.array(featureItem),
    note: z.string().optional(),
    notes: z.array(z.string()).optional(),
  }),
  responsibilities: specTableSchema,
  cta: ctaSchema,
});

export const seoSchema = z.object({
  page: z.literal('seo'),
  title: z.string(),
  description: z.string(),
  hero: heroSchema,
  sellingPoints: sectionSchema.extend({ items: z.array(featureItem) }),
  solution: sectionSchema.extend({ items: z.array(featureItem) }),
  reporting: sectionSchema.extend({ items: z.array(featureItem) }),
  process: sectionSchema.extend({ items: z.array(featureItem) }),
  casesNote: z.object({
    heading: z.string(),
    text: z.string(),
    linkLabel: z.string(),
    href: z.string(),
  }),
  cta: ctaSchema,
});

export const geoSchema = z.object({
  page: z.literal('geo'),
  title: z.string(),
  description: z.string(),
  hero: heroSchema,
  painPoints: sectionSchema.extend({ items: z.array(featureItem) }),
  platforms: sectionSchema.extend({
    groups: z.array(z.object({ name: z.string(), items: z.array(z.string()) })),
  }),
  services: sectionSchema.extend({ items: z.array(featureItem) }),
  comparison: specTableSchema.extend({ outro: z.string().optional() }),
  process: sectionSchema.extend({ items: z.array(featureItem) }),
  cta: ctaSchema,
});

export type WebsiteData = z.infer<typeof websiteSchema>;
export type MarketingData = z.infer<typeof marketingSchema>;
export type Seodata = z.infer<typeof seoSchema>;
export type GeoData = z.infer<typeof geoSchema>;

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.discriminatedUnion('page', [
    websiteSchema,
    marketingSchema,
    seoSchema,
    geoSchema,
  ]),
});

const cases = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cases' }),
  schema: z.object({
    company: z.string(),
    companyEn: z.string(),
    industry: z.string(),
    tags: z.array(z.enum(['网站建设', '全网营销', 'Google SEO', 'GEO 优化'])).min(1).max(2),
    result: z.string(),
    color: z.string(),
  }),
});

export const collections = { pages, cases };
