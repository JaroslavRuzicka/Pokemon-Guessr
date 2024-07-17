import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router';
import Spinner from '../Spinner/Spinner';
import PokemonSpritesList from '../PokemonSpritesList/PokemonSpritesList';
import { PokemonSprites } from '../../pokemons';
import { searchPokemons } from '../../api';

type Props = {}

const Sprites = ({}: Props) => 
{
    const ticker = useOutletContext<string>()
    const [baseStats, setBaseStats] = useState<PokemonSprites>({} as PokemonSprites)
    
    useEffect(() =>
        {
            async function searchForPokemon()
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
                        const resultAbilities: PokemonSprites = 
                        {
                            back_default: result.sprites.back_default,
                            back_female: result.sprites.back_female,
                            back_shiny: result.sprites.back_shiny,
                            back_shiny_female: result.sprites.back_shiny_female,
                            front_default: result.sprites.front_default,
                            front_female: result.sprites.front_female,
                            front_shiny: result.sprites.front_shiny,
                            front_shiny_female: result.sprites.front_shiny_female,
                        }
                        setBaseStats(resultAbilities)
                    })
                }
            }
    
            searchForPokemon()
        },[])
        
    
    return (
        <>
            {(Object.keys(baseStats).length > 0 ) ? (
                <>
                    <PokemonSpritesList data={baseStats} ></PokemonSpritesList>
                </>
            ): (
                <Spinner />

            )}
        </>
    )
}

export default Sprites