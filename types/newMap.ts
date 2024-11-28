export interface NewMapMaster {
	id: string;
	name: string;
	group: string;
	images: string | null;
	width: number;
	height: number;
	main: string | null;
	hunt: string | null;
}

interface NewMapForwardPorts {
	id: number;
	f_map_id: string;
	f_name: string;
	f_xaxis: string;
	f_yaxis: string;
	b_map_id: string;
	b_name: string;
	b_xaxis: string;
	b_yaxis: string;
}

interface NewMapNpcs {
	id: number;
	npc_id: number;
	map_id: string;
	x_coord: number;
	y_coord: number;
	side: number;
	npc_name: string;
}

export interface NewMapDetail {
	master: NewMapMaster;
	forwardPorts: NewMapForwardPorts[];
	npcs: NewMapNpcs[];
}
