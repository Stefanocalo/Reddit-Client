import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubReddits } from "../../store/subRedditSlice";
import { selectSelectedSubReddits, setSelectedSubreddit } from "../../store/redditSlice";
import { selectSubReddits } from "../../store/subRedditSlice";
import './SubReddits.css';
import { AnimatedList } from 'react-animated-list';


export const SubReddits = () => {

    const dispatch = useDispatch();
    const selectedSubReddits = useSelector(selectSelectedSubReddits);
    const subreddits = useSelector(selectSubReddits);    


    useEffect(() => {
        dispatch(fetchSubReddits());
    }, [dispatch]);


    return (
        <div className="subredditsSection">
            <h2>Subreddits</h2>
            <ul className="subredditList">
                {subreddits.map((subreddit) => {
                    return(
                    <li
                    key={subreddit.id} >
                        <button type="button"
                        onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
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

