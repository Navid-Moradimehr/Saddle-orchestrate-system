import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceSlugs = ['context-aware-decisions', 'mcp-agent-infrastructure', 'long-term-memory', 'industrial-agentic-systems', 'industrial-data-pipelines', 'world-models-digital-twins', 'grounded-knowledge-systems', 'multi-agent-orchestration', 'cloud-infrastructure'];
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/ai-seo-faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.35 },
    ...serviceSlugs.map((slug) => ({ url: `${siteUrl}/services/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
