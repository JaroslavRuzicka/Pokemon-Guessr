import * as Yup from "yup"
import { useAuth } from '../../Context/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router-dom"

type Props = {}

type RegisterFormsInputs =
{
    email: string,
    userName: string,
    password: string
}

const validation = Yup.object().shape({
    userName: Yup.string().required("User name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required")
})

function RegisterPage({}: Props) 
{
    const { registerUser } = useAuth()
    const { register, handleSubmit, formState:{ errors } } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation)})

    function handleRegister(form: RegisterFormsInputs)
    {
        registerUser(form.email, form.userName, form.password)
    } 



  
    return (
    <section className="">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-[#EDEDED] rounded-lg shadow border md:mb-20 sm:max-w-md xl:p-0  border-red-600">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
                    Register your account
                </h1>
                <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit(handleRegister)}>
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
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border border-red-600 text-gray-900 focus:outline-none  text-sm rounded-lg  focus:ring-4  block w-full  p-2.5  dark:bg-gray-700 dark:border-red-600 focus:border-red-200 dark:placeholder-red-600 dark:text-white dark:focus:ring-red-200"
                            placeholder="Email"
                            {...register("email")}
                        />
                        {errors.email ? <p className="text-white">{errors.email.message}</p> : ""}
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
                    <button
                        type="submit"
                        className="w-full text-white bg-red-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                        Sign in
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-800">
                        Already have an account?{" "}
                        <Link
                            
                            to="/login"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-red-600"
                        >
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
  )
}

export default RegisterPage