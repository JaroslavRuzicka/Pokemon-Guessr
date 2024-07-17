import { useParams } from "react-router"
import { PokemonSearch } from "../../pokemons"
import { useEffect, useState } from "react"
import { searchPokemons } from "../../api"
import SideBar from "../../Components/SideBar/SideBar"
import DashBoard from "../../Components/DashBoard/DashBoard"
import Tile from "../../Components/Tile/Tile"
import Spinner from "../../Components/Spinner/Spinner"
import PokemonComment from "../../Components/PokemonComment/PokemonComment"

interface Props
{

}

const PokemonOverviewPage = ({}: Props) => 
{
    let {ticker} = useParams()
    const [pokemon, setPokemon] = useState<PokemonSearch>({} as PokemonSearch)

    useEffect(() => 
    {
        async function getProfileInit()
        {
            const result = await searchPokemons(ticker?.toLowerCase()!)
			
            if(typeof result == "string")
            {
                return
            }
            else if(result.ok)
            {
                await result.json().then((result) =>
                {
                        
                    const lowerCaseName = result.name
                    const upperCaseName = lowerCaseName[0].toUpperCase() + lowerCaseName.substring(1, lowerCaseName.length)
                    
                    setPokemon({
                        
                        name: upperCaseName,
                        weight: result.weight,
                        height: result.height,
                        imageLink: result.sprites.front_default,
                        type: result.types[0].type.name,
                        hp: result.stats[0].base_stat,
                        attack: result.stats[1].base_stat,
                        defence: result.stats[2].base_stat,
                        specialAttack: result.stats[3].base_stat,
                        specialDefence: result.stats[4].base_stat,
                        speed: result.stats[5].base_stat,
                    })
                })
            }
        }
        getProfileInit()
    },[])


    return (
        <>
            {(Object.keys(pokemon).length > 0 ) ? (
                <>
                    <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
                        <SideBar/>
                        <DashBoard ticker={ticker!}>
                            <Tile subtitle={""} pokemon={pokemon}/>
                            
                        </DashBoard>
                    </div>
                    <PokemonComment name={ticker} />
                
                </>
            ) : (
                <Spinner />
            )}
        </>
    )
}

export default PokemonOverviewPage