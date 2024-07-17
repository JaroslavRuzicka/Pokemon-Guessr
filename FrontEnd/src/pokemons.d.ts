export interface PokemonSearch 
{
    weight: Int32Array
    height: Int32Array
    name: string
    imageLink: string
    type:string
    hp: Int32Array
    attack: Int32Array
    defence: Int32Array
    specialAttack: Int32Array
    specialDefence: Int32Array
    speed: Int32Array
}

export interface  PokemonAbilities
{
    name: string
    url: string
}

export interface PokemonAbility
{
    name: string
    flavourText: string
}

interface TeamMember
{
	name: string
	imageLink: string
}

export interface PokemonSprites
{
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
}

export interface PokemonItems
{
    name: string
    url: string
}

export interface PokemonItem
{
    name: string 
    cost: Int32Array 
    effect: string 
    category: string 
    flingEffect: string | null
    flingPower: Int32Array | null
    sprite: string 
}

export interface Pokemon
{
    attack: Int32Array
    health: Int32Array
    id: Int32Array
    image: string
    name: string
    type:string

}