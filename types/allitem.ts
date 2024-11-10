interface MobMaster {
	id: string;
	name: string;
	images: string;
}

interface MobDrop {
	mob_id: string;
	MobMaster: MobMaster;
}

export interface AllItem {
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
	MobDrops: MobDrop[];
}
