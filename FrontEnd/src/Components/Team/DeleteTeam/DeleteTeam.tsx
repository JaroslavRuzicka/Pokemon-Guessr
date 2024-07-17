import { SyntheticEvent } from 'react'

interface Props
{
    onTeamDelete: (e: SyntheticEvent) => void
    nameValue: string
}

const DeleteTeam = ({onTeamDelete, nameValue}: Props) => {
    return (
        <div>
            <form onSubmit={onTeamDelete}>
                <input hidden={true} readOnly={true} value={nameValue} />
                <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500 max-w-32 m-auto">
                    X
                </button>
            </form>
        </div>
    )
}

export default DeleteTeam