import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from '../../Context/useAuth'
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"

type Props = {}

type LogInFormsInputs =
{
    userName: string,
    password: string
}

const validation = Yup.object().shape({
    userName: Yup.string().required("User name is required"),
    password: Yup.string().required("Password is required")
})

function LogInPage({}: Props) 
{
    const { userLogin } = useAuth()
    const { register, handleSubmit, formState:{ errors } } = useForm<LogInFormsInputs>({ resolver: yupResolver(validation)})

    function handleLogin(form: LogInFormsInputs)
    {
        userLogin(form.userName, form.password)
    }

    function demoLogIN()
    {
        //Only the demo app login credentials are stored here.
        //Actual login info is stored in database with hashed password
        const demoName = "Password123HASHTAG"
        const demoPassword = "Password123#"
        
        userLogin(demoName, demoPassword)
    }

    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-[#EDEDED] rounded-lg shadow border md:mb-20 sm:max-w-md xl:p-0  border-red-600">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="border border-red-600 text-gray-900 focus:outline-none  text-sm rounded-lg  focus:ring-4  block w-full  p-2.5  dark:bg-gray-700 dark:border-red-600 focus:border-red-200 dark:placeholder-red-600 dark:text-white dark:focus:ring-red-200"
                                    placeholder="Username"
                                    {...register("userName")}
                                />
                                {errors.userName ? <p className="text-white">{errors.userName.message}</p> : ""}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="border border-red-600 text-gray-900 focus:outline-none  text-sm rounded-lg  focus:ring-4  block w-full  p-2.5  dark:bg-gray-700 dark:border-red-600 focus:border-red-200 dark:placeholder-red-600 dark:text-white dark:focus:ring-red-200"
                                    {...register("password")}
                                />
                                {errors.password ? <p className="text-white">{errors.password.message}</p> : ""}
                            </div>
                            <div className="flex items-center justify-between">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 underline decoration-red-600"
                                    onClick={demoLogIN}
                                >
                                    Want to try out demo of this app? <span className="hover:text-red-600">Click here.</span>
                                </a>
                             </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-red-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-800">
                                Don’t have an account yet?{" "}
                                <Link
                                    to="/register"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-red-600"
                                >
                                    Sign up
                                </Link>
                            </p>
                            <div className="space-y-5 md:space-y-1 ">
                                <p className="underline decoration-red-600">Demo login credentials:</p>
                                <p>Username:&emsp; Password123HASHTAG</p>
                                <p>Password: &emsp;  Password123#</p>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LogInPage