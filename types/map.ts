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
                                "images": "I627884.png",
                                "price": 10
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
                                "images": "I243816.png",
                                "price": 2
                            }
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "M375532",
        "name": "쥐굴",
        "level": "6 ~ 15",
        "information": "가장 쉬운 던전으로 쥐와 박쥐, 흡혈쥐, 서생원이 등장합니다. 쥐굴 안쪽에는 뱀굴이 자리잡고 있어 금방 레벨을 높일 수 있는 좋은 곳입니다. 쥐고기는 초반에 체력을 채워주기 쉬운 아이템으로 많이 모아두면 유용하게 쓰입니다.",
        "images": "M375532.png",
        "monsters": [
            {
                "monster": {
                    "id": "MO031418",
                    "name": "서생원",
                    "level": null,
                    "exp": "2000",
                    "information": "쥐굴에서 최고 보스격인 몬스터이다. 희귀아이템인 산삼을 가끔 준다.",
                    "images": "MO031418.gif",
                    "dropItems": [
                        {
                            "item": {
                                "id": "I606869",
                                "name": "산삼",
                                "desc": "산에서 나는 인삼, 심봤다!",
                                "images": "I606869.png",
                                "price": 100
                            }
                        }
                    ]
                }
            },
            {
                "monster": {
                    "id": "MO393624",
                    "name": "병든쥐",
                    "level": null,
                    "exp": "250",
                    "information": "오염된 쥐. 시궁창쥐 보다는 세지만 역시 강함에 비해 많은 경험치를 주는 몬스터이다.",
                    "images": "MO393624.gif",
                    "dropItems": [
                        {
                            "item": {
                                "id": "I450806",
                                "name": "쥐고기",
                                "desc": "먹어야 하나?",
                                "images": "I450806.png",
                                "price": 20
                            }
                        }
                    ]
                }
			},
			{
 */

export interface MapLevel {
	id: string;
	name: string;
	level: string;
	information: string;
	images: string;
	xcoord: number;
	ycoord: number;
	type: number;
	monsters: {
		monster: Monster;
	}[];
}
