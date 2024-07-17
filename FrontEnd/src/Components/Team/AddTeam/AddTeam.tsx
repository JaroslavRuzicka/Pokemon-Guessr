import { SyntheticEvent } from 'react'

type Props = {
    onTeamCreate: (e: SyntheticEvent) => void
    name: string
    imageLink: string
}

const AddTeam = ({onTeamCreate, name, imageLink}: Props) => {
    return (
        <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
            <form onSubmit={onTeamCreate}>
                <input readOnly={true} hidden={true} value={imageLink} name={name} />
                <button
                    type="submit"
                    className="p-2 px-8 text-white bg-red-600 rounded-lg hover:opacity-70 focus:outline-none focus:ring-4 focus:ring-red-200"
                >
                Add
                </button>
            </form>
        </div>
    )
}

export default AddTeam