import { useEffect, useState } from "react"
import { searchItem } from "../../api"
import { PokemonItem, PokemonItems } from "../../pokemons"

interface Props
{
    data: PokemonItems[]
}

const ItemList = ({data}: Props) => 
{
    const [items, setItems] = useState<PokemonItem[]>([])
    
    useEffect(() =>
        {
            async function searchPokemon()
            {
                const itemsTemp: PokemonItem[] = []
                
                for(let i = 0; i < data.length; i++)
                {
                    if(i >= 2) break
                    
                    const result = await searchItem(data[i].name)
                    
                    if(typeof result == "string")
                    {
                        return
                    }
                    else if(result.ok)
                    {
                        await result.json().then((result) =>
                        {
                            itemsTemp.push(
                            {
                                name: result.name,
                                cost: result.cost,
                                effect: result.effect_entries ? result.effect_entries[0].effect :  null,
                                category: result.category.name,
                                flingEffect: result.fling_effect ? result.fling_effect.name :  null,
                                flingPower: result.fling_power,
                                sprite: result.sprites.default
                            })
                        })
                    }

                }
                setItems(itemsTemp)
            }
    
            searchPokemon()
        },[])
    
    const pokemonItems = items.map((item: any) =>
    {
        return(
            <li className="py-3 sm:py-4 border-t-red-600 " key={item.name}>
                <div className="flex items-center space-x-4" >
                    <div className="flex-1 min-w-0" >
                        <p className="text-2xl font-medium text-gray-900 text-wrap flex" >
                            <img src={item.sprite} alt="" />
                            <span className="text-xl underline">{item.name[0].toUpperCase() + item.name.slice(1)}:</span>
                        </p>                        
                        <p className="text-sm text-gray 500 text-wrap" >
                            Price: {item.cost}
                        </p>
                        <p className="text-sm text-gray 500 text-wrap" >
                            Category: {item.category}
                        </p>                        

                        <p className="text-sm text-gray 500 text-wrap" >
                            {item.effect}
                        </p>
                        <p className="text-sm text-gray 500 text-wrap" >
                            {item.flingEffect ? (
                                <>
                                    Fling Effect: {item.flingEffect}
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </p>                        
                        <p className="text-sm text-gray 500 text-wrap" >
                            {item.flingPower ? (
                                <>
                                    Fling Power: {item.flingPower}
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </li>
        )
    })

    return (
        <div className="bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 h-full w-4/5 max-w-screen-md bg-[#EDEDED]">
            <ul className="divide-y divided-gray-200 ">
            <p className="underline text-red-600 font-bold text-3xl">Held Items:</p>
                {pokemonItems}
            </ul>
        </div>
    )
} 

export default ItemList