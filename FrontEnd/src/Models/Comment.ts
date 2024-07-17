export type CommentPost =
{
    title: string
    content: string
}

export interface CreatePokemon
{
    name: string
    type: string
    health: Int32Array
    attack: Int32Array
    image: string
}

export interface AddPokemonToTeam
{
    name: string
}

export interface DeletePokemonToTeam
{
    name: string
}

export interface GetComment
{
    title: string
    content: string
    createdBy: string
}

export interface leaderBoard
{
    userName: string
    pokemons: number
}

