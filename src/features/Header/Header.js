import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";

// Importing icons
import { FaReddit, FaSearch } from "react-icons/fa";
// Import CSS
import './Header.css';
import '../../index.css';

export const Header = () => {

    //Declaring local search input state
    const [searchInput, setSearchInput] = useState('');

    // Declaring reddit slice searchTerm
    const searchTerm = useSelector((state) => state.reddit.searchTerm);

    const dispatch = useDispatch();

    const hamburgher = document.querySelector('.hamburgherMenu');
    const subReddit = document.querySelector('aside');
    const header = document.querySelector('header');
    const main = document. querySelector('main');
    const search = document.querySelector('.searchBar');

    // Updating local search input state
    const handleSearchInputChange = ({target}) => {
        setSearchInput(target.value);
    };

    useEffect(() => {
        setSearchInput(searchTerm);
      }, [searchTerm]);

    // Handle Submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchInput))

        hamburgher.classList.remove('active');
        subReddit.classList.remove('active');
        header.classList.remove('active');
        main.classList.remove('active');
        search.classList.remove('active');
    }

    //Handle hamburgher menu click

    const onHamburgherClick = () => {
        hamburgher.classList.toggle('active');
        subReddit.classList.toggle('active');
        header.classList.toggle('active');
        main.classList.toggle('active');
        search.classList.toggle('active');
    }

    
    return (
        <header>

            <div className="hamburgherMenu" 
                onClick={() => { onHamburgherClick()}}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>

            </div>
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
                    <FaSearch className="search-icon" />
                </button>
            </form>

        </header>
    )
}