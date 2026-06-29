import type { APIRoute } from 'astro';
import siteConfig from '@/config/site.json';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site || siteConfig.baseUrl).href;
  const content = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
