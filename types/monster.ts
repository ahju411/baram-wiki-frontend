// {
//     "id": "string",
//     "name": "string",
//     "level": null,
//     "hp": null,
//     "mp": null,
//     "exp": "string",
//     "defense": null,
//     "mdefense": null,
//     "mtype": "string",
//     "respawn": null,
//     "information": "string",
//     "images": "string",
//     "drops": [
//         {
//             "item_id": "string",
//             "range": null,
//             "vals": null,
//             "item": {
//                 "id": "string",
//                 "bid": 0,
//                 "code": 0,
//                 "name": "string",
//                 "type": 0,
//                 "iconId": 0,
//                 "iconUrl": "string",
//                 "avatarId": null,
//                 "dye": 0,
//                 "maxquan": 0,
//                 "maxdura": 0,
//                 "price": 0,
//                 "reqmight": 0,
//                 "reqwill": 0,
//                 "reqgrace": 0,
//                 "reqgender": 0,
//                 "reqlevel": 0,
//                 "reqjob": 0,
//                 "ondead": 0,
//                 "trade": 0,
//                 "repair": 0,
//                 "repairprice": 0,
//                 "storageprice": 0,
//                 "namingprice": 0,
//                 "desc": "string",
//                 "smin": 0,
//                 "smax": 0,
//                 "lmin": 0,
//                 "lmax": 0,
//                 "ac": 0,
//                 "MHP": 0,
//                 "MMP": 0,
//                 "hit": 0,
//                 "dam": 0,
//                 "M": 0,
//                 "W": 0,
//                 "G": 0,
//                 "hr": 0,
//                 "md": 0,
//                 "swingsound": 0
//             }
//         }
//     ]
// }

import type { Item } from './item';

export interface Monster {
	id: string;
	name: string;
	level: string;
	hp: string;
	mp: string;
	exp: string;
	defense: string;
	mdefense: string;
	mtype: string;
	respawn: string;
	information: string;
	images: string;
	map_name: string;
	map_images: string;
	drops: {
		item_id: string;
		item: Item;
	}[];
}
