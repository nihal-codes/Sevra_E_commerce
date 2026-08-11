import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch ] = useState("")
  const handleSearch = () => {

  }
  return (
    <>
      <div className="flex gap-2 border border-(--oatmeal) rounded-lg shadow bg-(--oatmeal)/30 px-2 py-1">
        <i className="ri-search-line"></i>
        <input type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full outline-none"/>
      </div>
    </>
  )
}

export default SearchBar;