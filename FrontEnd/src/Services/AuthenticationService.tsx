import axios from "axios"
import { handleError } from "../Helpers/ErrorHandler"
import { UserProfileToken } from "../Models/User"

const api = "http://localhost:5087/api/"

export async function loginAPI(userName: string, password: string)
{
    try
    {
        const data = await axios.post<UserProfileToken>(api + "accounts/login", 
            {
                userName: userName,
                password: password
            }
        )
        return data

    }
    catch(error)
    {
        handleError(error)
    }
}

export async function registerAPI(email:string, userName: string, password: string)
{
    try
    {
        const data = await axios.post<UserProfileToken>(api + "accounts/register", 
            {
                userName: userName,
                email: email,
                password: password
            }
        )

        return data
    }
    catch(error)
    {
        handleError(error)
    }
}

