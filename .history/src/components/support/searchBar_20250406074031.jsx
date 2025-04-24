import React from 'react'

const SearchBar = () => {
  return (
    <div>
        <SearchInput
          type="text"
          placeholder={t("Search...")}
          value={searchTerm}
          onChange={handleChange}
        />
    </div>
  )
}

export default SearchBar
