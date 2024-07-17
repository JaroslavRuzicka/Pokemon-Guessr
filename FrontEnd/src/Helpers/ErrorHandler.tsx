import axios from "axios";
import { toast } from "react-toastify";

export function handleError(error: any)
{
    if(axios.isAxiosError(error))
    {
        let err = error.response
        if(err?.data === "")
        {
            toast.warning(err.status + " " + err.statusText)
        }
        else if(Array.isArray(err?.data.errors))
        {
            for(let value of err?.data.errors)
            {
                toast.warning(value.description)
            }
        }
        else if(typeof err?.data.errors === "object")
        {
            for(let e in err?.data.errors)
            {
                toast.warning(err.data.errors[e][0])
            }
        }
        else if(err?.data)
        {
            toast.warning(err.data)
        }
        else if(err?.status === 401)
        {
            toast.warning("You must be logged in to preform this action.")
            window.history.pushState({}, "LoginPage", "/login")
        }
        else if(err)
        {
            toast.warning(err?.data)
        }
    }
}