import axios from "axios";


export async function searchPokemons(query: string)
{
    try
    {
        const data = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${query}`)
        
        return data
    }
    catch(error)
    {
        if(axios.isAxiosError(error))
        {
            console.log(error.message)

            return "No such pokemon exists. Try again."
        }
        else
        {
            console.log("Non fetch error:", error)

            return "Non fetch error."
        }
    }
}

export async function searchAbilities(query: string)
{
    try
    {

        const data = await fetch(
            `https://pokeapi.co/api/v2/ability/${query}`)
        
        return data
    }
    catch(error)
    {
        if(axios.isAxiosError(error))
        {
            console.log(error.message)

            return "No such pokemon exists. Try again."
        }
        else
        {
            console.log("Non fetch error:", error)

            return "Non fetch error."
        }
    }
}

export async function searchItem(query: string)
{
    try
    {

        const data = await fetch(
            `https://pokeapi.co/api/v2/item/${query}`)
        
        return data
    }
    catch(error)
    {
        if(axios.isAxiosError(error))
        {
            console.log(error.message)

            return "No such pokemon exists. Try again."
        }
        else
        {
            console.log("Non fetch error:", error)

            return "Non fetch error."
        }
    }
}

