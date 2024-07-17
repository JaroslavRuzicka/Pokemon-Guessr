import { useOutletContext } from "react-router";
import { searchPokemons } from "../../api";
import { ReactElement, useEffect, useState } from "react";
import { PokemonItems } from "../../pokemons";
import Spinner from "../Spinner/Spinner";
import ItemList from "../ItemList/ItemList";

interface Props
{

}

function HeldItems({}: Props) 
{
    const ticker = useOutletContext<string>()
    const [items, setItems] = useState<PokemonItems[]>([])
    const [hasItems, setHasItems] = useState<boolean>(true)

    useEffect(() =>
        {
            async function searchPokemon()
            {
                const result = await searchPokemons(ticker)
                
                if(typeof result == "string")
                {
                    return
                }
                else if(result.ok)
                {
                    await result.json().then((result) =>
                    {
                        const resultItems: PokemonItems[] = []
    
                        const numOfItems = result.held_items.length

                        if(numOfItems > 0)
                        {
                            for(let i = 0; i < numOfItems; i++)
                                {
                                    resultItems.push({
                                        name: result.held_items[i].item.name,
                                        url: result.held_items[i].item.url
                                    })
                                }
                                setHasItems(true)
                                setItems(resultItems)
                        }
                        else
                        {
                            setHasItems(false)
                        }
                    })
                }
            }
    
            searchPokemon()
        },[])
    

    function checkIfItemsExits(): ReactElement
    {
        if(hasItems)
        {
            return <Spinner />
        }
        else
        {
            return <p>This pokemon doesn't hold any items</p>
        }
    }

    return (
    <>
        {(Object.keys(items).length > 0 ) ? (
            <>
                <ItemList data={items} ></ItemList>
            </>
        ): (
            <>
                {checkIfItemsExits()}
            </>
        )}
    </>)

}

export default HeldItems