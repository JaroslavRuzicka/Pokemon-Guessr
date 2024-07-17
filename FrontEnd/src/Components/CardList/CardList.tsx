import React, { SyntheticEvent } from 'react'
import Card from '../Card/Card'
import { PokemonSearch } from '../../pokemons'
import {v4 as uusidv4} from "uuid"

interface Props {
	searchResult: PokemonSearch
	onTeamCreate: (e: SyntheticEvent) => void
}

const CardList: React.FC<Props> = ({searchResult, onTeamCreate}: Props): JSX.Element => 
{
	return (<>
		{(Object.keys(searchResult).length > 0 ) ? 
			(<Card name={searchResult.name} imageLink={searchResult.imageLink} key={uusidv4()} searchResult={searchResult} onTeamCreate={onTeamCreate}/> 
		):(
			<p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
				No results!
		  	</p>
		)}
	</>)
}

export default CardList