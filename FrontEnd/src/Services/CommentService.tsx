import axios from "axios"
import { CommentPost, GetComment } from "../Models/Comment"
import { handleError } from "../Helpers/ErrorHandler"

const api = "http://localhost:5087/api/comments/"

export async function commentPostAPI(title: string, content: string, name: string, user: string)
{
    try
    {
        const data = await axios.post<CommentPost>(api + `${name}/${user}`,
        {
            title: title,
            content: content
        })

        return data
    }
    catch(error)
    {
        handleError(error)
    }

}

export async function commentGetAPI(name: string, token: string)
{
    try
    {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        const data = await axios.get<GetComment[]>(api + `?Name=${name}`)
        console.log(data);
        
        return data
    }
    catch(error)
    {
        handleError(error)
    }

}