import React, { createContext, useEffect, useState } from "react"
import { UserProfile } from "../Models/User"
import {  useNavigate } from "react-router"
import { loginAPI, registerAPI } from "../Services/AuthenticationService"
import { toast } from "react-toastify"
import axios from "axios"

type UserContextType = 
{
    user: UserProfile | null
    token: string | null
    registerUser: (email: string, userName: string, password: string) => void
    userLogin: (username: string, password: string) => void
    logOut: () => void
    isLoggedIn: () => boolean
}

type Props = {children: React.ReactNode}

const UserContext = createContext<UserContextType>({} as UserContextType)

export function UserProvider({children}: Props)
{
    const navigate = useNavigate()
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserProfile | null>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() =>
    {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        if(user && token )
        {
            setUser(JSON.parse(user))
            setToken(token)
            axios.defaults.headers.common["Authorization"] = "Bearer" + token
        }

        setIsReady(true)
    },[])


    async function registerUser(email:string, userName: string, password:string)
    {
        await registerAPI(email, userName, password).then((response) =>
        {
            if(response)
            {
                localStorage.setItem("token", response?.data.token)
                const userObj = 
                {
                    userName: response?.data.userName,
                    email: response?.data.email
                }

                localStorage.setItem("user", JSON.stringify(userObj))

                setToken(response?.data.token!)
                setUser(userObj!)
                toast.success("Loged In.")
                navigate("/search")
            } 
        }).catch(() => 
            toast.warning("Something went wrong, please try again later."))
    }

    async function userLogin(userName: string, password:string)
    {
        await loginAPI(userName, password).then((response) =>
        {
            if(response)
            {
                localStorage.setItem("token", response?.data.token)
                const userObj = 
                {
                    userName: response?.data.userName,
                    email: response?.data.email
                }

                localStorage.setItem("user", JSON.stringify(userObj))

                setToken(response?.data.token!)
                setUser(userObj!)
                toast.success("Loged In.")
                navigate("/search")
            } 
        }).catch(() => 
            toast.warning("Something went wrong, please try again later."))
    }

    function isLoggedIn()
    {
        return !!user
    }

    function logOut()
    {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setToken("")

        navigate("/")
    }

    return(
        <UserContext.Provider value={{ userLogin, user, token, logOut, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
} 

export function useAuth()
{
    return React.useContext(UserContext)
}