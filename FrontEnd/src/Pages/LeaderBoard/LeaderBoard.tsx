import { useEffect, useState } from "react"
import { getLeaderBoardAPI } from "../../Services/LeaderboardService"
import { leaderBoard } from "../../Models/Comment"

type Props = 
{

}

function LeaderBoard({}: Props) {
    
    const [leaderboard, setLeaderBoard] = useState<leaderBoard[]>()
    useEffect(() =>
    {
        async function getLeaderBoard() 
        {
            const leaderboard = await getLeaderBoardAPI()
            const fetchedData: leaderBoard[] = []
            
            for(let i = 0; i < leaderboard.length; i++)
            {
                let lenght = 0

                for(let j = 0; j < leaderboard[i].pokemons.length; j++)
                {
                    lenght++
                }
                
                const leaderB: leaderBoard = 
                {
                    userName: leaderboard[i].userName,
                    pokemons: lenght
                }

                fetchedData.push(leaderB)
                
            }
            
            fetchedData.sort().reverse()
            setLeaderBoard([...fetchedData])
            
            
        }
        getLeaderBoard()
    },[])
    

    const pokemonAbilities = leaderboard?.map(x => 
        {

            return(
                <li className="py-3 sm:py-4 border-t-red-600 " key={x.userName}>
                    <div className="flex items-center space-x-4" >
                        <div className="flex-1 min-w-0" >
                            <p className="text-2xl font-medium text-gray-900 text-wrap flex underline" >
                                {x.userName}:
                            </p>
                            <p className="text-sm text-gray 500 text-wrap" >
                            </p>
                            <p className="text-nd text-gray 500 text-wrap" >
                                numberOfPokemons: {x.pokemons}
                                
                            </p>
                        </div>
                    </div>
                </li>
            )
        })
    
        
        return (
            <div className="bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 h-full w-4/5 max-w-screen-md bg-[#EDEDED]">
                <ul className="divide-y divided-gray-200 ">
                <p className="underline text-red-600 font-bold text-3xl">Leaderboard:</p>
                    {pokemonAbilities}
                </ul>
            </div>
        )
}

export default LeaderBoard