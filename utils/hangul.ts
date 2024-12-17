// 초성 추출을 위한 유틸리티
const CHOSUNG_MAP = {
	ㄱ: /[가-깋]/g,
	ㄲ: /[까-낗]/g,
	ㄴ: /[나-닣]/g,
	ㄷ: /[다-딯]/g,
	ㄸ: /[따-띻]/g,
	ㄹ: /[라-맇]/g,
	ㅁ: /[마-밓]/g,
	ㅂ: /[바-빟]/g,
	ㅃ: /[빠-삫]/g,
	ㅅ: /[사-싷]/g,
	ㅆ: /[싸-앃]/g,
	ㅇ: /[아-잏]/g,
	ㅈ: /[자-짛]/g,
	ㅉ: /[짜-찧]/g,
	ㅊ: /[차-칳]/g,
	ㅋ: /[카-킿]/g,
	ㅌ: /[타-팋]/g,
	ㅍ: /[파-핗]/g,
	ㅎ: /[하-힣]/g,
};

export const matchesChosung = (text: string, search: string): boolean => {
	// 초성인지 확인
	const isChosung = (char: string) => /[ㄱ-ㅎ]/.test(char);

	let pattern = '';
	for (const char of search) {
		if (isChosung(char)) {
			const regex = CHOSUNG_MAP[char];
			pattern += `[${regex.source}]`;
		} else {
			pattern += char;
		}
	}
	return new RegExp(pattern).test(text);
};
