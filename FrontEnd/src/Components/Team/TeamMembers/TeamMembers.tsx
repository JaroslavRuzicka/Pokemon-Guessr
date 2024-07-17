import { SyntheticEvent } from 'react'
import PokemonTeam from '../PokemonTeam/PokemonTeam'
import {v4 as uusidv4} from "uuid"
import { TeamMember } from '../../../pokemons'

interface Props 
{
    teamMembers: TeamMember[]
    onTeamDelete: (e: SyntheticEvent) => void
}

const TeamMembers = ({teamMembers, onTeamDelete: onTeamDelete}: Props) => {
    return (
    <section id="teammembers ">
        <h2 className="mb-3 mt-3 text-3xl font-semibold text-center m-auto max-w-5xl md:text-4xl border-t-2 border-red-600 pt-4">
            My Team
        </h2>
        <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row ">
        <>
            {teamMembers.length > 0 ? (
            teamMembers.map((teamMembers) => {
                return (
                <PokemonTeam
                    teamMembers={teamMembers}
                    onTeamDelete={onTeamDelete}
                    key={uusidv4()}
                />
                );
            })
            ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                Your team is empty.
            </h3>
            )}
        </>
        </div>
    </section>
        )
}

export default TeamMembers