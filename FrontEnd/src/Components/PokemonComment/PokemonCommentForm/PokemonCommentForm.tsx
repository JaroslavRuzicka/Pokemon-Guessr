import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'

interface Props
{
    name: string
    handleComment: (e: CommentFormInputs) => void
}

interface CommentFormInputs
{
    title: string
    content: string
}

const validation = Yup.object().shape({
    title: Yup.string().required("Title name is required"),
    content: Yup.string().required("Content is required")
})

function PokemonCommentForm({name, handleComment}: Props) {
    
    const { register, handleSubmit, formState:{ errors } } = useForm<CommentFormInputs>({ resolver: yupResolver(validation)})
    
    return (
        <form className="mt-4 ml-4 w-11/12"  onSubmit={handleSubmit(handleComment)}>
            <input
            type="text"
            id={name}
            className="border border-red-600 text-gray-900 focus:outline-none  text-sm rounded-lg  focus:ring-4  block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-red-600 focus:border-red-200 dark:placeholder-red-600 dark:text-white dark:focus:ring-red-200 my-2"
            placeholder="Title"
            {...register("title")}
            />
            {errors.title ? <p>{errors.title.message}</p> : ""}
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-red-600 dark:bg-gray-700 dark:border-red-600">
                <label htmlFor="comment" className="sr-only">
                    Your comment
                </label>
                <textarea
                    id="comment"
                    rows={6}
                    className="px-0 w-full text-sm text-gray-900 border-1 focus:ring-0 focus:outline-none dark:text-red-600 dark:placeholder-red-600 dark:bg-gray-700"
                    placeholder="Write a comment..."
                    {...register("content")}
                ></textarea>
            </div>
            <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
            Post comment
            </button>
        </form>
  )
}

export default PokemonCommentForm