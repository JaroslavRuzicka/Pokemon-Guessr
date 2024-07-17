import { useOutletContext } from "react-router";
import { PokemonAbilities } from "../../pokemons";
import { useEffect, useState } from "react";
import { searchPokemons } from "../../api";
import AbilityList from "../AbilityList/AbilityList";
import Spinner from "../Spinner/Spinner";

interface Props {}


const Abilites = ({}: Props) => 
{
    const ticker = useOutletContext<string>()
	const [abilities, setAbilities] = useState<PokemonAbilities[]>([])

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
					const resultAbilities: PokemonAbilities[] = []

					for(let i = 0; i < result.abilities.length; i++)
					{
						resultAbilities.push({
							name: result.abilities ? result.abilities[i].ability.name : null,
							url: result.abilities ? result.abilities[i].ability.url : null
						})
					}

					setAbilities(resultAbilities)
				})
			}
		}

		searchPokemon()
	},[])
    
    return (
    <>
        {(Object.keys(abilities).length > 0 ) ? (
            <>
                <AbilityList data={abilities} ></AbilityList>
            </>
        ): (
			<Spinner />

        )}
    </>
    ) 
}

export default Abilites