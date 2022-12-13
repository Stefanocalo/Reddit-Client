import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubReddits } from "../../store/subRedditSlice";
import { selectSelectedSubReddits, setSelectedSubreddit } from "../../store/redditSlice";
import { selectSubReddits } from "../../store/subRedditSlice";
import './SubReddits.css';
import { SubredditSkeleton } from "./subRedditSkeleton";
import {BiErrorCircle} from 'react-icons/bi';
import 'react-loading-skeleton/dist/skeleton.css'



export const SubReddits = () => {

    const dispatch = useDispatch();
    const selectedSubReddits = useSelector(selectSelectedSubReddits);
    const subreddits = useSelector(selectSubReddits);  
    
    const sub = useSelector((state) => state.subreddit);
    const {isLoading, error} = sub;


    useEffect(() => {
        dispatch(fetchSubReddits());
    }, [dispatch]);
    
    if(error) {
        return(
            <div className="error">
                <BiErrorCircle className="errorIcon"/>
                <h4 className="errorMessage"> There has been a problem </h4>
                <button 
                    className="errorButton"
                    onClick={() => {dispatch(fetchSubReddits())}}>
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="subredditsSection">
            <h2 id='top'>Subreddits</h2>
            {isLoading && <SubredditSkeleton cards={(25)} />}
            <ul className="subredditList">
                {subreddits.map((subreddit) => {
                    return(
                    <li
                    key={subreddit.id} >
                        <button type="button"
                        onClick={() =>{ 
                            dispatch(setSelectedSubreddit(subreddit.url))
                            window.scrollTo({ top:0})}}
                        
                        className={`${selectedSubReddits === subreddit.url && 'selectedSubreddit'}`}>
                            <img 
                            src={subreddit.icon_img || `https://api.adorable.io/avatars/25/${subreddit.display_name}`}
                            className="subredditIcon"
                            style={{ border: `2px solid ${subreddit.primary_color}` }}
                            alt={subreddit.display_name} />
                            <span>{subreddit.display_name}</span>
                        </button>
                    </li>)
                })}
            </ul>
        </div>
    )

};

