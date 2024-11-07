/**
 * {
    "results": [
        {
            "id": "string",
            "name": "string",
            "image": "string",
            "type": "string"
        }
    ]
}
 */

export interface Search {
    id: string
    image: string
    name: string
    type: 'item' | 'map' | 'monster'
}