import { useEffect, useState } from "react"
import { searchAbilities } from "../../api"
import { PokemonAbilities, PokemonAbility } from "../../pokemons"

interface Props
{
    data: PokemonAbilities[]
}

const AbilityList = ({data}: Props) => 
{
    const [abilities, setAbilities] = useState<PokemonAbility[]>([])
    
    useEffect(() =>
        {
            async function searchPokemon()
            {
                const abilitiesTemp: PokemonAbility[] = []
                
                for(let i = 0; i < data.length; i++)
                {
                    if(i >= 2) break
                    const result = await searchAbilities(data[i].name)

                    if(typeof result == "string")
                    {
                        return
                    }
                    else if(result.ok)
                    {
                        await result.json().then((result) =>
                        {
                            abilitiesTemp.push(
                            {
                                name: result.name,
                                flavourText: result.effect_entries ? result.effect_entries[1].short_effect : null
                            })
                        })
                    }
                }

                setAbilities(abilitiesTemp)
            }
            searchPokemon()
        },[])
    
    
    const pokemonAbilities = abilities.map((row: any) =>
    {
        return(
            <li className="py-3 sm:py-4 border-t-red-600 " key={row.name}>
                <div className="flex items-center space-x-4" >
                    <div className="flex-1 min-w-0" >
                        <p className="text-2xl font-medium text-gray-900 text-wrap flex" >
                            <span className="text-xl underline">{row.name[0].toUpperCase() + row.name.slice(1)}:</span>
                        </p>
                        <p className="text-sm text-gray 500 text-wrap" >
                        </p>
                        <p className="text-nd text-gray 500 text-wrap" >
                            {row.flavourText}
                        </p>
                    </div>
                </div>
            </li>
        )
    })

    return (
        <div className="bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 h-full w-4/5 max-w-screen-md bg-[#EDEDED]">
            <ul className="divide-y divided-gray-200 ">
            <p className="underline text-red-600 font-bold text-3xl">Abilities:</p>
                {pokemonAbilities}
            </ul>
        </div>
    )
} 

export default AbilityList