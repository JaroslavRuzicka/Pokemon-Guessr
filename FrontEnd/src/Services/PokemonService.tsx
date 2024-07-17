import axios from "axios"
import { CreatePokemon } from "../Models/Comment"
import { handleError } from "../Helpers/ErrorHandler"


const api = "http://localhost:5087/api/pokemons/"

export async function createPokemonAPI(name: string, type: string, health: Int32Array, attack: Int32Array, image:string )
{
    try
    {
        const data = await axios.post<CreatePokemon>(api, 
            {
                name: name,
                type: type,
                health: health,
                attack: attack,
                image: image
            }
        )
        
        return data

    }
    catch(error)
    {
        handleError(error)
    }
}


