/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./composables/**/*.{js,ts}',
		'./plugins/**/*.{js,ts}',
		'./App.{js,ts,vue}',
		'./app.{js,ts,vue}',
	],
	theme: {
		extend: {
			colors: {
				layer: {
					bg: '#2c2219',
					surface: '#3c2f25',
					overlay: '#463528',
				},
				game: {
					primary: '#d4c3a5',
					secondary: '#a69781',
					legendary: '#dabc10',
					hover: '#b29162',
				},
				border: {
					primary: '#8e744b',
					light: 'rgba(142, 116, 75, 0.3)',
					legendary: '#ffd700',
				},
			},
			fontFamily: {
				pretendard: ['Pretendard Variable', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
