import { SyntheticEvent } from "react"
import { PokemonSearch } from "../../pokemons"
import AddTeam from "../Team/AddTeam/AddTeam"
import { Link } from "react-router-dom"

type Props = {
  	name: string
	imageLink: string
	searchResult: PokemonSearch
	onTeamCreate: (e: SyntheticEvent) => void
}



const Card: React.FC<Props> = ({name, imageLink, searchResult, onTeamCreate}: Props) : JSX.Element => 
{
	const lowerCaseName = searchResult.name[0].toLocaleLowerCase() + searchResult.name.substring(1, searchResult.name.length)
	return (
		<div
			className="flex flex-col items-center justify-between w-full p-6 bg-gray-100 rounded-lg md:flex-row md:space-x-3 max-w-4xl m-auto"
			key={name}
			id={name}
		>
			<Link to={`/pokemon/${lowerCaseName}`} className="font-bold text-center text-black md:text-left">
				<img src={`${searchResult.imageLink}`} alt="" /> 
			</Link>
			<p className="font-bold text-black">Name: {searchResult.name} | Type: {searchResult.type} |</p>
			<p className="text-black">
				Health: {searchResult.hp} | Attack: {searchResult.attack}
			</p>
			<AddTeam onTeamCreate={onTeamCreate} name={name} imageLink={imageLink}/>
		</div>
  	)
}

export default Card