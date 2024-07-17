import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { PokemonSearch, TeamMember } from "../../pokemons"
import { searchPokemons } from "../../api"
import SearchBar from "../../Components/SearchBar/SearchBar"
import TeamMembers from "../../Components/Team/TeamMembers/TeamMembers"
import CardList from "../../Components/CardList/CardList"
import { createPokemonAPI } from "../../Services/PokemonService"
import { addPokemonToTeamAPI, deletePokemonFromTeamAPI, getPokemonsInTeamAPI } from "../../Services/TeamService"
import { useAuth } from "../../Context/useAuth"

interface Props
{
    
}

function SearchPage ({}: Props)
{
	const [userSearch, setUserSearch] = useState<string>("")
	const [searchResult, setSearchResult] = useState<PokemonSearch>({} as PokemonSearch)
	const [serverError, setServerError] = useState<string>("")
	const [teamMembers, setTeamMember] = useState<TeamMember[]>([])
	const [result, setResult] = useState<boolean>(false)
	const { token } = useAuth()

		
	function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void
	{
		setUserSearch(e.target.value)
	} 

	async function onSearchSubmit(e: SyntheticEvent): Promise<void>
	{
		e.preventDefault()
		const result = await searchPokemons(userSearch)
		setResult(true)
		setSearchResult({} as PokemonSearch)
		
		if(typeof result == "string")
		{
			setServerError(result)
			
		}
		else if(result.ok)
		{
			await result.json().then((result) =>
			{
				
				const lowerCaseName = result.name
				const upperCaseName = lowerCaseName[0].toUpperCase() + lowerCaseName.substring(1, lowerCaseName.length)
				setSearchResult(
				{
					
					name: upperCaseName,
					weight: result.weight,
					height: result.height,
					imageLink: result.sprites.front_default,
					type: result.types[0].type.name,
					hp: result.stats[0].base_stat,
					attack: result.stats[1].base_stat,
					defence: result.stats[2].base_stat,
					specialAttack: result.stats[3].base_stat,
					specialDefence: result.stats[4].base_stat,
					speed: result.stats[5].base_stat,
				})

				
			})
		}
	}

	async function onTeamCreate(e: any)
	{
		e.preventDefault()
		const name = e.target[0].name
		const imgageLink = e.target[0].value
	
		let exists = null
		for(const member of teamMembers)
		{
			if (member.name === name) exists = name
		}
		if(exists) return

		const newTeamMember: TeamMember = 
		{
			name: name, 
			imageLink: imgageLink
		}

		const newTeam = [...teamMembers, newTeamMember]
		setTeamMember(newTeam)


		await createPokemonAPI(
			searchResult.name, searchResult.type, searchResult.hp, 
			searchResult.attack, searchResult.imageLink)

		await addPokemonToTeamAPI(name, token!)
	}

	function onTeamDelete(e: any)
	{
		e.preventDefault()
		const name = e.target[0].value
		
		const removed  = teamMembers.filter((member) => 
		{
			return member.name !== name
		})
		setTeamMember(removed)
		deletePokemonFromTeamAPI(name, token!)
	}
	
	useEffect(() =>
	{
		
		

		async function fetchPokemonInTeam()
		{
			const newTeamMembers :TeamMember[] = []

			let fetchPokemonInTeam = await getPokemonsInTeamAPI(token!)
			let fetchData = await fetchPokemonInTeam?.data
			
			if(fetchData ===  undefined) return

			for(let i = 0; i < fetchData.length; i++)
			{
				newTeamMembers.push(
					{
						name: fetchData[i].name,
						imageLink: fetchData[i].image
					}
				)
			}
			
			const newTeam = [...teamMembers,...newTeamMembers]
			setTeamMember(newTeam)

		}

		fetchPokemonInTeam()
	},[])
  
  	return (
		<div className='Application'>
			<SearchBar onSearchSubmit={onSearchSubmit} search={userSearch} handleSearchChange={handleSearchChange}/>
			{(Object.keys(searchResult).length > 0 ) ? (
				<>
					<CardList searchResult={searchResult} onTeamCreate={onTeamCreate}/>
					{serverError && <h1 className="text-center">{serverError}</h1>}
					{result ? <TeamMembers teamMembers={teamMembers} onTeamDelete={onTeamDelete}/> : ""}
				</>
			) : 
			(<>
				<div className="text-center text-4xl">
					{result ? "Pokemon not found. Try again." : ""}
					{teamMembers.length > 0 ? <TeamMembers teamMembers={teamMembers} onTeamDelete={onTeamDelete}/> : ""}
				</div>
			</>)}
			
		</div>
  	)
}

export default SearchPage


