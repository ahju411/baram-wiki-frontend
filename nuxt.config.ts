// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-07',
	devtools: { enabled: true },

	css: ['~/assets/variable.css'],

	app: {
		layoutTransition: { name: 'layout', mode: 'out-in' },
		head: {
			htmlAttrs: {
				lang: 'ko',
			},
			title: '바람위키',
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content:
						'width=device-width,initial-scale=1,viewport-fit=cover,maximum-scale=1',
				},
				{ name: 'format-detection', content: 'telephone=no' },
				{
					name: 'description',
					content:
						'바람의나라 게임 아이템, 몬스터, 맵 정보를 손쉽게 검색하고 찾아볼 수 있는 서비스입니다. 실시간 검색 기능을 통해 원하는 정보를 빠르게 찾아보세요!',
				},
				{
					name: 'keywords',
					content:
						'바람의나라, 바람위키, 게임가이드, 아이템, 몬스터, 맵, 게임정보',
				},
				{ property: 'og:type', content: 'website' },
				{
					property: 'og:title',
					content: '바람위키 - 바람의나라 게임 정보 검색',
				},
				{
					property: 'og:description',
					content:
						'바람의나라 게임 아이템, 몬스터, 맵 정보를 손쉽게 검색하고 찾아볼 수 있는 서비스입니다.',
				},
				{ property: 'og:site_name', content: '바람위키' },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{
					name: 'twitter:title',
					content: '바람위키 - 바람의나라 게임 정보 검색',
				},
				{
					name: 'twitter:description',
					content:
						'바람의나라 게임 아이템, 몬스터, 맵 정보를 손쉽게 검색하고 찾아볼 수 있는 서비스입니다.',
				},
				{
					name: 'naver-site-verification',
					content: '1f19048f8b4d6021163baa4bd1b4fcd9ff667be9',
				},
			],
			link: [
				{
					rel: 'stylesheet',
					href: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css',
				},
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			],
		},
	},

	runtimeConfig: {
		apiBase: process.env.API_BASE_URL || 'http://localhost:3001', // 서버 전용 API 경로 설정
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
	},

	// SSR 사용
	ssr: true,

	modules: ['@nuxt/image'],
});
