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

import type { Monster } from "./monster"

export interface Map {
    id: string
    name: string
    level: string
    information: string
    images: string
    spawnedMonsters: {
        mob_id: string
        monster: Monster
    }[] 
}