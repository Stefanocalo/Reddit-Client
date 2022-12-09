import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";

// Importing icons
import { FaReddit, FaSearch } from "react-icons/fa";
// Import CSS
import './Header.css';

export const Header = () => {

    //Declaring local search input state
    const [searchInput, setSearchInput] = useState('');

    // Declaring reddit slice searchTerm
    const searchTerm = useSelector((state) => state.reddit.searchTerm);

    const dispatch = useDispatch();

    // Updating local search input state
    const handleSearchInputChange = ({target}) => {
        setSearchInput(target.value);
    };

    // Handle Submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchInput))
        console.log(searchInput);
    }

    return (
        <header>
            <div className='logo'>
            <FaReddit className="logo-icon" />
            <p className='reddit'>Reddit<span className='lite'>Lite</span></p>
            </div>
            <form className="searchBar" onSubmit={handleFormSubmit}>
                <input 
                    type='text'
                    placeholder='Search'
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                <button 
                type="submit">
                    <FaSearch className="logo-icon" />
                </button>
            </form>

        </header>
    )
}