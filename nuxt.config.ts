// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-07',
	devtools: { enabled: true },
	// image: {
	// 	provider: 'ipx',
	// 	domains: ['evfuckbgifbr27188584.gcdn.ntruss.com'],
	// 	alias: {
	// 		remote: 'https://evfuckbgifbr27188584.gcdn.ntruss.com',
	// 	},
	// },

	css: ['~/assets/variable.css', '~/assets/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	app: {
		layoutTransition: { name: 'layout', mode: 'out-in' },
		head: {
			htmlAttrs: {
				lang: 'ko',
			},
			title: '바람위키',
			script: [
				{
					children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-MZZPWC5W');`,
				},
				{
					src: 'https://www.googletagmanager.com/gtag/js?id=G-L4Y7M5ZQGC',
					async: true,
				},
				{
					children: `window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-L4Y7M5ZQGC');`,
				},
				{
					src: '//wcs.naver.net/wcslog.js',
					type: 'text/javascript',
				},
				{
					children: `if(!wcs_add) var wcs_add = {};
					wcs_add["wa"] = "6a32e481606a10";
					if(window.wcs) {
						wcs_do();
					}`,
					type: 'text/javascript',
				},
				{
					src: 'https://www.googletagmanager.com/gtag/js?id=G-L4Y7M5ZQGC',
					async: true,
				},
				{
					children: `window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-L4Y7M5ZQGC');`,
				},
				{
					src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9583781392760368',
					async: true,
					crossorigin: 'anonymous',
				},
			],
			noscript: [
				{
					children:
						'<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MZZPWC5W" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
				},
			],
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width,initial-scale=1,viewport-fit=cover',
				},
				{ name: 'format-detection', content: 'telephone=no' },
				{
					name: 'description',
					content:
						'바람위키는 바람의나라 게임 아이템, 몬스터, 맵 정보를 손쉽게 검색하고 찾아볼 수 있는 서비스입니다. 실시간 검색 기능을 통해 원하는 정보를 빠르게 찾아보세요!',
				},
				{
					name: 'keywords',
					content:
						'바람의나라, 바람위키, 게임가이드, 아이템, 몬스터, 맵, 게임정보, 위키, 바람, 바람의나라 클래식, 클래식 바람의나라, 클바, 클바위키, 위키클바, 바람의나라 클래식위키 , 바람위키 클래식',
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
				{
					name: 'google-adsense-account',
					content: 'ca-pub-9583781392760368',
				},
			],
			link: [
				{
					rel: 'stylesheet',
					href: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css',
				},
				{
					rel: 'stylesheet',
					href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css',
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
