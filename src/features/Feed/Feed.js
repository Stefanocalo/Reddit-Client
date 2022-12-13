import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts,
        fetchComment,
        selectPosts,
        } from "../../store/redditSlice";

import { Post } from "../Post/Post.js";
import { PostSkeleton } from "../Post/PostSkeleton";

import './Feed.css';

export const Feed = () => {
    const dispatch = useDispatch();
    const reddit = useSelector((state) => state.reddit);
    const {isLoading, } = reddit;
    const {selectedSubReddits} = reddit
    const posts = useSelector(selectPosts)

    useEffect(() => {
        dispatch(fetchPosts(selectedSubReddits))
    }, [selectedSubReddits])

    const onToggleComment = (index) => {
        const getComments = (permalink) => {
            dispatch(fetchComment(index, permalink))
        }
        return getComments
    };

    
    return (
        <div className="feedContainer">
            {isLoading && <PostSkeleton cards={10} />}
            {posts.map((post, index) => {
                return (
                         <Post
                    post={post}
                    key={post.id}
                    onToggleComment={onToggleComment(index)}/> 
                )
                   
            })}
        </div>
    )
}