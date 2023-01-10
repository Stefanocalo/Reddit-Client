import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";
import { toggleDarkMode } from "../../store/redditSlice"; 

// Importing icons
import { FaReddit, FaSearch, FaSleigh } from "react-icons/fa";
import {CgDarkMode} from 'react-icons/cg'
// Import CSS
import './Header.css';
import '../../index.css';


export const Header = () => {

    //Declaring local search input state
    const [searchInput, setSearchInput] = useState('');

    // Declaring reddit slice searchTerm
    const searchTerm = useSelector((state) => state.reddit.searchTerm);

    const isLightMode = useSelector((state) => state.reddit.isLightMode);

    const dispatch = useDispatch();

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

        if(isLightMode === true) {
            document.querySelector('.hamburgherMenu').classList.remove('active');
            document.querySelector('aside').classList.remove('active');
            document.querySelector('.headerLight').classList.remove('active');
            document. querySelector('main').classList.remove('active');
            document.querySelector('.searchBarLight').classList.remove('active');
            document.querySelector('.lightButton').classList.remove('active');
        } else if(isLightMode === false) {
            document.querySelector('.hamburgherMenu').classList.remove('active');
            document.querySelector('aside').classList.remove('active');
            document.querySelector('.headerDark').classList.remove('active');
            document. querySelector('main').classList.remove('active');
            document.querySelector('.searchBarDark').classList.remove('active');
            document.querySelector('.darkButton').classList.remove('active');
        }
    }



    //Handle hamburgher menu click

    const onHamburgherClick = () => {
        if(isLightMode === true) {
            document.querySelector('.hamburgherMenu').classList.toggle('active');
            document.querySelector('aside').classList.toggle('active');
            document.querySelector('.headerLight').classList.toggle('active');
            document. querySelector('main').classList.toggle('active');
            document.querySelector('.searchBarLight').classList.toggle('active');
            document.querySelector('.lightButton').classList.toggle('active');
        } else if(isLightMode === false) {
            document.querySelector('.hamburgherMenu').classList.toggle('active');
            document.querySelector('aside').classList.toggle('active');
            document.querySelector('.headerDark').classList.toggle('active');
            document. querySelector('main').classList.toggle('active');
            document.querySelector('.searchBarDark').classList.toggle('active');
            document.querySelector('.darkButton').classList.toggle('active');
        }
    }

    const actual = () => {
        const mode  = isLightMode === true ? false : true;
        return mode;
    }

   
    return (
        <header className={isLightMode ? 'headerLight' : 'headerDark'}>

            <div className="hamburgherMenu" 
                onClick={() => {onHamburgherClick()}}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>

            </div>
            <div className='logo'>
            <FaReddit className={isLightMode ? "logo-icon" : 'logo-iconDark'} />
            <p className={isLightMode ? 'reddit' : 'redditDark'}>Reddit<span className={isLightMode ? 'lite' : 'liteDark'}>Lite</span></p>
            </div>
            <form className={isLightMode ? "searchBarLight" : "searchBarDark"} onSubmit={handleFormSubmit}>
                <input 
                className={isLightMode ?'inputLight' : 'inputDark'}
                    type='text'
                    placeholder='Search'
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                <button 
                type="submit">
                    <FaSearch className={isLightMode ? "search-icon" : "search-iconDark"} />
                </button>
            </form>
            <div className='darkMode'>
                <CgDarkMode 
                className={isLightMode ? 'lightButton' : 'darkButton'}
                onClick={() => {
                    dispatch(toggleDarkMode(actual()))
                    document.querySelector('.theme').classList.toggle('active')
                }}
                />
            </div>

        </header>
    )
}