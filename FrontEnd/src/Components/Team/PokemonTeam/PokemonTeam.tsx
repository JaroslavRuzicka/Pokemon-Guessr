import { SyntheticEvent } from 'react'
import DeleteTeam from '../DeleteTeam/DeleteTeam'
import { Link } from 'react-router-dom'
import { TeamMember } from '../../../pokemons'

interface Props
{
    teamMembers: TeamMember
    onTeamDelete: (e: SyntheticEvent) => void
}

const PokemonTeam = ({teamMembers, onTeamDelete}: Props) => {
    
    const name = teamMembers.name
    const lowerCaseName = name[0].toLowerCase() + name.substring(1, name.length)
    
    return (
        <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/4 bg-[#EDEDED] outline outline-red-600 outline-2">
            <Link to={`/pokemon/${lowerCaseName}`} className="pt-6 text-xl font-bold m-auto ">
                <img src={teamMembers.imageLink} alt="" className=""/>
                <p>{teamMembers.name}</p>
            </Link>
            
            <DeleteTeam
                nameValue={teamMembers.name}
                onTeamDelete={onTeamDelete}
            />
      </div>
    )
}

export default PokemonTeam