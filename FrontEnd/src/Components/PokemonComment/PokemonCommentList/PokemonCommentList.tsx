import { GetComment as GetComment } from '../../../Models/Comment'
import PokemonCommentListItem from '../PokemonCommentListItem/PokemonCommentListItem'
import {v4 as uusidv4} from "uuid"

type Props = 
{
    comments: GetComment[]
}

function PokemonCommentList({comments}: Props) {
  return (
    <>
        {comments ? comments.map((comment) => 
        {
            return <PokemonCommentListItem comment={comment} key={uusidv4()}/>
        }) : ""}
    </>
  )
}

export default PokemonCommentList