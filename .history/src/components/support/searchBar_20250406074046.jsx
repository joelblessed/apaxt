import React from 'react'

const SearchBar = () => {
  return (
    <div>
        <nput
          type="text"
          placeholder={t("Search...")}
          value={searchTerm}
          onChange={handleChange}
        />
    </div>
  )
}

export default SearchBar
