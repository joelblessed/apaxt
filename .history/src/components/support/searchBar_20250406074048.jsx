import React from 'react'

const SearchBar = () => {
  return (
    <div>
        <input
          type="text"
          placeholder={t("Search...")}
          value={searchTerm}
          onChange={handleChange}
        />
    </div>
  )
}

export default SearchBar
