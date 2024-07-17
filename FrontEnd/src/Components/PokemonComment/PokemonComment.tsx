import { toast } from 'react-toastify'
import { commentGetAPI, commentPostAPI } from '../../Services/CommentService'
import PokemonCommentForm from './PokemonCommentForm/PokemonCommentForm'
import { useEffect, useState } from 'react'
import { GetComment } from '../../Models/Comment'
import Spinner from '../Spinner/Spinner'
import PokemonCommentList from './PokemonCommentList/PokemonCommentList'
import { useAuth } from '../../Context/useAuth'

type Props = 
{
    name: string | undefined
}

interface CommentFormInputs
{
    title: string
    content: string
}





function PokemonComment({name}: Props) {
    
    const [comments, setComments] = useState<GetComment[] | null>(null)
    const [loading, setLoading] = useState<boolean>()
    const {user, token} = useAuth()
    
    
    useEffect(() =>
    {
        getComments()
    },[])
    
    function handleComment(e: CommentFormInputs)
    {
        commentPostAPI(e.title, e.content, name!, user?.userName!)
        .then((response) =>
        {
            if(response)
            {
                toast.success("Comment created successfully!")
                getComments()
            }
        }).catch((error) =>
        {
            toast.warning(error)
        })
        
    }

    async function getComments()
    {
        setLoading(true) 
        await commentGetAPI(name!, token!).then((result) => 
        {
            setLoading(false)
            setComments(result?.data!)
        })

    }
    
    function checkIfNameUndefined()
    {
        if(name === undefined)
        {
            return <p>This comment does not exits.</p>
        }
        else
        {
            return (
            <div className='flex justify-center flex-col w-2/4 m-auto'>
                <div className=''>
                    {loading ? <Spinner /> : <PokemonCommentList comments={comments!}/>} 
                </div>
                <div className='m-auto w-11/12'>
                    <PokemonCommentForm name={name} handleComment={handleComment}/>
                </div>
            </div>)
        }
    }
    
    //Make sure you can only post on comment added to the database
    return checkIfNameUndefined()
        
}

export default PokemonComment