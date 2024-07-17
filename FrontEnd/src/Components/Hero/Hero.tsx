import { Link } from "react-router-dom"
import hero from "./Snorlax.png"

interface Props
{
    
}

const Hero = ({}: Props) => {
  return (
    <section id="hero">
		<div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row bg-gray-100 rounded-lg">
			<div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52 ">
				<h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
					Remember ALL the Pokemon and become the BEST!
				</h1>
				<p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
					Can you remember them all? Search for the Pokemon and if they exist, add them to your team. Then compare your team to the others.
				</p>
				<div className="mx-auto lg:mx-0">
					<Link
					to="/search"
					className="py-5 px-10 text-2xl font-bold text-white bg-red-600 rounded lg:py-4 hover:opacity-70"
					>
					Get Started
					</Link>
				</div>
			</div>
			<div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
				<img src={hero} alt="" />
			</div>
		</div>
    </section>
  )

}

export default Hero