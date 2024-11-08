/**
 * {
    "id": "string",
    "name": "string",
    "level": "string",
    "information": "string",
    "images": "string",
    "spawnedMonsters": [
        {
            "mob_id": "string",
            "monster": {
                "id": "string",
                "name": "string",
                "level": null,
                "hp": null,
                "mp": null,
                "exp": "string",
                "defense": null,
                "mdefense": null,
                "mtype": "string",
                "respawn": null,
                "information": "string",
                "images": "string"
            }
        }
    ]
}
 */

import type { Monster } from './monster';

export interface Map {
	id: string;
	name: string;
	level: string;
	information: string;
	images: string;
	spawnedMonsters: {
		mob_id: string;
		monster: Monster;
	}[];
}

/**
 * [
    {
        "id": "M276397",
        "name": "왕초보 사냥터",
        "level": "1 ~ 10",
        "information": "이곳은 바람의 나라 맨 처음 시작하면 갈 수 있는 곳으로 도우미가 직접 데려다 줍니다. 게임을 시작하면 도우미들이 나오는데 그 도우미들은 여러 가지 사냥, 물건 집기, 말하기 등을 가르쳐 줍니다. 그런 기본적인 것들을 가르쳐 주고 나면 이곳에 데려다 줍니다. 이곳에서 직업을 가지기 전 레벨까지 키웁니다.",
        "images": "M276397.png",
        "monsters": [
            {
                "monster": {
                    "id": "MO110645",
                    "name": "다람쥐",
                    "level": null,
                    "exp": "10",
                    "information": "레벨 5이하 평민들의 주요 사냥 몬스터. 잡으면 보통 1-3개의 도토리를 준다.",
                    "images": "MO110645.gif",
                    "dropItems": [
                        {
                            "item": {
                                "id": "I627884",
                                "name": "도토리",
                                "desc": "참나무의 열매",
                                "images": "I627884.png"
                            }
                        }
                    ]
                }
            },
            {
                "monster": {
                    "id": "MO181712",
                    "name": "토끼",
                    "level": null,
                    "exp": "5",
                    "information": "바람의나라에서 다람쥐와 더불어 가장약한 몬스터 다람쥐보다 더 약하다.",
                    "images": "MO181712.gif",
                    "dropItems": [
                        {
                            "item": {
                                "id": "I243816",
                                "name": "토끼고기",
                                "desc": "부드럽고 담백한 토끼의 고기",
                                "images": "I243816.png"
                            }
                        }
                    ]
                }
            }
        ]
    },
 */

export interface MapLevel {
	id: string;
	name: string;
	level: string;
	information: string;
	images: string;
	monsters: {
		monster: Monster;
	}[];
}
