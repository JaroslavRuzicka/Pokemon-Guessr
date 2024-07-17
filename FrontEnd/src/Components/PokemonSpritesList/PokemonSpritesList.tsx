
interface Props
{
    data:  any 
}

const PokemonSpritesList = ({data}: Props) => {
    
function formatName(name: string): string
{
    let result = ""
    let upperCaseChar = true

    for(let i = 0; i < name.length; i++)
    {
        if(upperCaseChar)
        {
            result += name[i].toUpperCase()
            upperCaseChar = false
        }
        else if(name[i] === "_")
        {
            result += " "
            upperCaseChar = true
        }
        else
        {
            result += name[i]
        }
    }

    return result
}
    
    const pokemonAbilities = Object.keys(data).map((key: string) =>
    {
        if(data[key] != null)
        {
            const name = formatName(key)
            return(
                <li className="py-3 sm:py-4 border-t-red-600 w-1/4 min-w-fit" key={key}>
                    <div className="flex items-center space-x-4" >
                        <div className="flex-3 min-w-0 m-4" >
                            <p className="text-2xl font-medium text-gray-900 text-wrap " >
                                <span className="text-xl underline">{name}:</span>
                            </p>
                            <img src={data[key]} alt="" className="mx-auto" />
                        </div>
    
                    </div>
                </li>
            )
        }
    })

    return (
        <div className="bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 h-full w-3/4 max-w-screen-md bg-[#EDEDED] ">
            <ul className="divide-y divided-gray-200 ">
            <p className="underline text-red-600 font-bold text-3xl">Sprites:</p>
                <div className="flex flex-wrap">
                    {pokemonAbilities}
                </div>    
            </ul>
        </div>
    )
} 

export default PokemonSpritesList