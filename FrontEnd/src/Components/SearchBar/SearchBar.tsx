import React, { ChangeEvent, SyntheticEvent,} from 'react'

type Props = {
    onSearchSubmit: (e: SyntheticEvent) => void
    search: string | undefined
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<Props> = ({handleSearchChange, search, onSearchSubmit}: Props): JSX.Element  => {

    return (
        <section className="relative bg-gray-100 mb-6 max-w-4xl mx-auto rounded-lg">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <form className="flex  space-y-4 items-center max-w-sm mx-auto md:flex-row md:space-y-0 md:space-x-3" onSubmit={onSearchSubmit}>   
                    <label className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"  fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                            </svg>
                        </div>
                        <input value={search} onChange={handleSearchChange}
                        type="text" id="simple-search" className="border border-red-600 text-gray-900 focus:outline-none  text-sm rounded-lg  focus:ring-4  block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-red-600 focus:border-red-200 dark:placeholder-red-600 dark:text-white dark:focus:ring-red-200" placeholder="Search for Pokemon..." required />
                    </div>
                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-red-600 rounded-lg border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-900 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-200">
                        <svg className="w-4 h-4" aria-hidden="true"  fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </form>
            </div>
        </section>
  )
}

export default SearchBar