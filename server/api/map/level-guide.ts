import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();

	try {
		// 기본 데이터 가져오기
		const rawData = await $fetch(`${apiBase}/map/level-guide`);

		// 서버에서 데이터 그룹핑 및 정렬 처리
		const groupedData = rawData.reduce((acc, level) => {
			const startLevel = parseInt(level.level.split('~')[0].trim());

			let group = '그 외';
			if (!isNaN(startLevel)) {
				if (startLevel <= 40) group = '1 ~ 40';
				else if (startLevel <= 60) group = '41 ~ 60';
				else group = '61 이상';
			}

			// 몬스터 정렬도 서버에서 처리
			const sortedMonsters = {
				...level,
				monsters: [...level.monsters].sort(
					(a, b) => a.monster.exp - b.monster.exp
				),
			};

			if (!acc[group]) acc[group] = [];
			acc[group].push(sortedMonsters);
			return acc;
		}, {});

		return groupedData;
	} catch (error) {
		console.error('Failed to fetch map data:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch map data',
		});
	}
});
