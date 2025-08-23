/* export type Material = 'wood' | 'plastic' | 'paper'; */

export type Material = 'fruit' | 'vegetable' | 'herbs';

export type Product = {
    id: string;
    name: string;
    cost: number;
    image: string;
    type: Material;
}