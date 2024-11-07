// [
// 	{
// 		id: 'string',
// 		name: 'string',
// 		level: 'string',
// 		job: 'string',
// 		advence: 'string',
// 		images: 'string',
// 		information: 'string',
// 		details: [
// 			{
// 				item_id: 'string',
// 				val: 0,
// 				utype: 'string',
// 				job: 'string',
// 				item: {
// 					id: 'string',
// 					name: 'string',
// 					price: 0,
// 				},
// 			},
// 		],
// 	},
// ];
export interface SkillDetail {
	item_id: string;
	val: number;
	utype: string;
	job: string;
	item: {
		id: string;
		name: string;
		price: number;
	};
}

export interface Skill {
	id: string;
	name: string;
	level: string;
	job: string;
	advence: string;
	images: string;
	information: string;
	details: SkillDetail[];
}
