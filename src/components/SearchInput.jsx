import { Search } from 'lucide-react'

// const SearchInput = ({setSearchText, handleSearch,setIsMenuOpen = () => {}}) => {
const SearchInput = ({setSearchText, handleSearch}) => {

    const search=()=>{
        handleSearch()
    }
  return (
        <div className="relative w-full">
                  <input
                    type="text"
                    onChange={e=>setSearchText(e.target.value)}
                    placeholder="Search movie..."
                    className="w-full px-4 py-2 rounded-full border bg-black/80 dark:border-gray-600 focus:outline-none focus:border-primary text-sm"
                  />
                  <Search  onClick={search} className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
                </div>
  )
}

export default SearchInput;

