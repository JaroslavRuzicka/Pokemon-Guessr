import axios from "axios"
import { AddPokemonToTeam, DeletePokemonToTeam } from "../Models/Comment"
import { handleError } from "../Helpers/ErrorHandler"
import { Pokemon } from "../pokemons"


const api = "http://localhost:5087/api/teams/"

export async function addPokemonToTeamAPI(name: string, token: string)
{
    try
    {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        const data = await axios.post<AddPokemonToTeam>(api + `?name=${name}`
        )
        
        return data

    }
    catch(error)
    {
        handleError(error)
    }
}

export async function deletePokemonFromTeamAPI(name: string, token: string)
{
    try
    {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        const data = await axios.delete<DeletePokemonToTeam>(api + `?name=${name}`)
        
        return data

    }
    catch(error)
    {
        handleError(error)
    }
}

export async function getPokemonsInTeamAPI(token: string)
{
    try
    {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        const data = await axios.get<Pokemon[]>(api)
    
        return data

    }
    catch(error)
    {
        handleError(error)
    }
}