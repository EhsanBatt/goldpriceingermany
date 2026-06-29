import type { APIRoute } from 'astro';
import siteConfig from '@/config/site.json';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = (site || siteConfig.baseUrl).toString();
  const content = `# Gold Price Germany - LLMs.txt

Site URL: ${baseUrl}
Contact: ${siteConfig.contactEmail}
Sitemap: ${new URL('sitemap-index.xml', baseUrl).href}

## Policy Statement on AI Usage
We permit AI assistants, Large Language Models (LLMs), and automated crawlers to index, summarize, and reference information from this portal, provided accurate attribution and canonical linking to the source pages are maintained.

Directive: Allow
`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
