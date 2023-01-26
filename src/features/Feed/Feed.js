import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts,
        fetchComment,
        setSearchTerm,
        selectFilteredPosts} from "../../store/redditSlice";
import { Post } from "../Post/Post.js";
import { PostSkeleton } from "../Post/PostSkeleton";
import {BiErrorCircle} from 'react-icons/bi';

import './Feed.css';


export const Feed = () => {
    const dispatch = useDispatch();
    const reddit = useSelector((state) => state.reddit);
    const {isLoading, error } = reddit;
    const {selectedSubReddits} = reddit
    const posts = useSelector(selectFilteredPosts)

    useEffect(() => {
        dispatch(fetchPosts(selectedSubReddits))
    }, [selectedSubReddits])

    const onToggleComment = (index) => {
        const getComments = (permalink) => {
            dispatch(fetchComment(index, permalink))
        }
        return getComments
    };


    // Error Handling

    if(error) {
        return(
            <div className="error">
                <BiErrorCircle className="errorIcon"/>
                <h4 className="errorMessage"> There has been a problem </h4>
                <button 
                    className="errorButton"
                    onClick={() => {dispatch(setSearchTerm(''))}}>
                    Try Again
                </button>
        </div>
        )
    }

    if(isLoading) {
        return(
            <PostSkeleton cards={20} />
        )
    }

    if(posts.length === 0) {
        return(
            <div className="error">
                <BiErrorCircle className="errorIcon"/>
                <h4 className="errorMessage"> The search has prouces no results </h4>
                <button 
                className="errorButton"
                onClick={() => {dispatch(setSearchTerm(''))}}>
                   Back
                </button>
            </div>
        )
    }

    
    return (
        <div className="feedContainer">
            {posts.map((post, index) => {
                return (
                        <Post
                    index={index}
                    post={post}
                    key={post.id}
                    onToggleComment={onToggleComment(index)}/> 
                )
                   
            })}
        </div>
    )
}