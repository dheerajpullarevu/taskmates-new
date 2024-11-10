import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://taskmates.in';

const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/tasks', changefreq: 'hourly', priority: 0.9 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
  { url: '/safety', changefreq: 'monthly', priority: 0.7 },
  { url: '/terms', changefreq: 'monthly', priority: 0.6 },
  { url: '/privacy', changefreq: 'monthly', priority: 0.6 },
  { url: '/cookies', changefreq: 'monthly', priority: 0.6 },
  { url: '/accessibility', changefreq: 'monthly', priority: 0.6 },
  { url: '/mobile-apps', changefreq: 'monthly', priority: 0.7 },
];

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  writeFileSync(resolve('public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap();