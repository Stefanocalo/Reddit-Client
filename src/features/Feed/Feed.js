import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedSubReddits } from "../../store/redditSlice";
import { fetchPosts } from "../../store/redditSlice";

import './Feed.css';

export const Feed = () => {
    const dispatch = useDispatch();
    const reddit = useSelector((state) => state.reddit);
    const {selectedSubReddits} = reddit

    useEffect(() => {
        dispatch(fetchPosts(selectedSubReddits))
    }, [selectedSubReddits])

    return (
        <div className="feedContainer">

        </div>
    )
}