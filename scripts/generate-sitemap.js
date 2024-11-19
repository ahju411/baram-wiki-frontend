import { writeFileSync } from 'fs';
import { globby } from 'globby';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

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

	// 아이템 데이터 가져오기
	let itemPages = [];
	try {
		const queryParams = new URLSearchParams({
			item: '0',
			sex: '0',
			job: '0',
			lmin: '0',
			lmax: '99',
		});
		const response = await fetch(
			`${process.env.API_BASE_URL}/allitem?${queryParams}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const items = await response.json();
		itemPages = items.map((item) => ({
			path: `/item/${item.id}`,
			lastMod: datetime,
			changefreq: 'weekly',
			priority: 0.7,
		}));
		console.log(`✅ ${itemPages.length}개의 아이템 페이지를 추가했습니다.`);
	} catch (error) {
		console.error('아이템 데이터를 가져오는데 실패했습니다:', error);
	}

	// 모든 페이지 통합
	const allPages = [...staticPages, ...skillPages, ...itemPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${allPages
				.map(
					({ path, lastMod, changefreq, priority }) => `
					<url>
						<loc>${domain}${path}</loc>
						<lastmod>${lastMod}</lastmod>
						<changefreq>${changefreq}</changefreq>
						<priority>${priority}</priority>
					</url>
				`
				)
				.join('\n')}
		</urlset>`;

	writeFileSync('public/sitemap.xml', sitemap);
	console.log('✅ sitemap.xml이 성공적으로 생성되었습니다.');
}

generateSitemap().catch(console.error);
