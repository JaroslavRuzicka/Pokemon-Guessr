import { handleError } from "../Helpers/ErrorHandler"


const api = "http://localhost:5087/api/teams/leaderboard"

export async function getLeaderBoardAPI()
{
    try
    {
        const data = await fetch(api)


        
        return data.json()

    }
    catch(error)
    {
        handleError(error)
    }
}
