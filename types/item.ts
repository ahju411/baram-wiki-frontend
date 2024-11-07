/**
 * {
    "id": "string",
    "bid": 0,
    "code": 0,
    "name": "string",
    "type": 0,
    "iconId": 0,
    "iconUrl": "string",
    "avatarId": "string",
    "dye": 0,
    "maxquan": 0,
    "maxdura": 0,
    "price": 0,
    "reqmight": 0,
    "reqwill": 0,
    "reqgrace": 0,
    "reqgender": 0,
    "reqlevel": 0,
    "reqjob": 0,
    "ondead": 0,
    "trade": 0,
    "repair": 0,
    "repairprice": 0,
    "storageprice": 0,
    "namingprice": 0,
    "desc": "string",
    "smin": 0,
    "smax": 0,
    "lmin": 0,
    "lmax": 0,
    "ac": 0,
    "MHP": 0,
    "MMP": 0,
    "hit": 0,
    "dam": 0,
    "M": 0,
    "W": 0,
    "G": 0,
    "hr": 0,
    "md": 0,
    "swingsound": 0
}

type별 정리
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
}
