import { writeFileSync } from 'fs';
import { globby } from 'globby';

async function generateSitemap() {
	const domain = 'https://www.baramwiki.com';
	const datetime = new Date().toISOString();

	// 메인 페이지
	const staticPages = [
		{
			path: '/',
			lastMod: datetime,
			changefreq: 'daily',
			priority: 1.0,
		},
	];

	// 직업별 스킬 페이지
	const jobTypes = ['w', 'p', 'n', 't']; // 전사, 도적, 도사, 천인
	const skillPages = jobTypes.map((jobType) => ({
		path: `/skill/${jobType}`,
		lastMod: datetime,
		changefreq: 'weekly',
		priority: 0.8,
	}));

	// 모든 페이지 통합
	const allPages = [...staticPages, ...skillPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${allPages.map(
				({ path, lastMod, changefreq, priority }) => `
					<url>
						<loc>${domain}${path}</loc>
						<lastmod>${lastMod}</lastmod>
						<changefreq>${changefreq}</changefreq>
						<priority>${priority}</priority>
					</url>
				`
			)}
		</urlset>`;

	writeFileSync('public/sitemap.xml', sitemap);
	console.log('✅ sitemap.xml이 성공적으로 생성되었습니다.');
}

generateSitemap().catch(console.error);
