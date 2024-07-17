import { PokemonSearch } from "../../pokemons"

interface Props 
{
    subtitle: string
    pokemon: PokemonSearch
}

const Tile = ({ subtitle, pokemon}: Props) => 
{
  return (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 ">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg bg-[#EDEDED]">
            <div className="flex-auto p-4 outline outline-red-600 outline-2 rounded-lg">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xl underline">
                            {pokemon.name} Overview:
                        </h5>
                        <span className="font-bold text-xl">{subtitle}</span>
                            <div  className="flex">
                                <img src={pokemon.imageLink} alt="" className="w-dvw"/>
                                <div className="text-nowrap space-y-2 ">
                                    <p>Type: {pokemon.type}</p>
                                    <p>Attack: {pokemon.attack}</p>
                                    <p>Defense: {pokemon.defence}</p>
                                    <p>Health: {pokemon.hp}</p>
                                    <p>Height: {pokemon.height}</p>
                                    <p>Weight: {pokemon.weight}</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default Tile