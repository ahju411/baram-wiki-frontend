/* type별 정리
0 : 무기
1 : 갑옷
2 : 방패
3 : 투구
4 : 반지
5 : 목걸이
6 : 술(막걸리)
7 : 먹는 음식
8 : 비서
9 : 전(돈)
10: 퀘스트재료
11 : 기타
 */
export interface ItemMobDrop {
	id: string;
	name: string;
	images: string;
}

export interface ItemIngredient {
	id: string;
	name: string;
	images: string;
	quantity: number;
}

export interface ItemRecipe {
	id: string;
	name: string;
	images: string;
	quantity: number;
}

export interface Item {
	id: string;
	bid: number;
	code: number;
	name: string;
	type: number;
	iconId: number;
	iconUrl: string;
	avatarId: string;
	dye: number;
	maxquan: number;
	maxdura: number;
	price: number;
	reqmight: number;
	reqwill: number;
	reqgrace: number;
	reqgender: number;
	reqlevel: number;
	reqjob: number;
	ondead: number;
	trade: number;
	repair: number;
	repairprice: number;
	storageprice: number;
	namingprice: number;
	desc: string;
	smin: number;
	smax: number;
	lmin: number;
	lmax: number;
	ac: number;
	MHP: number;
	MMP: number;
	hit: number;
	dam: number;
	M: number;
	W: number;
	G: number;
	hr: number;
	md: number;
	swingsound: number;
	images: string;
	monsterDrops: ItemMobDrop[];
	ingredients: ItemIngredient[];
	usedInRecipes: ItemRecipe[];
}
