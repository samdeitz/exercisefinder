import React from 'react';
import searchIcon from "../assets/search.svg";

const Search = ({ searchTerm, setSearchTerm}) => { //destructure props
    return (

        <div className="search">
            <div>
                <img src={searchIcon} alt="search" />

                <input type="text"
                       placeholder="Search hundreds of exercises"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

    )
}

export default Search;