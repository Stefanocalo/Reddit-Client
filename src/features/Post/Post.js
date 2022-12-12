import React from "react";
import './Post.css'
import {TbArrowBigTop, TbArrowBigDown} from 'react-icons/tb';
import {BiCommentDetail} from 'react-icons/bi';
import moment from 'moment';
import { PostSkeleton } from "./PostSkeleton";

export const Post = ({post, index}) => {

    const generateImage = (url) => {
        if(url) {
            return( <img src={url} alt=""/>)
        }
    }


    return (
        <div className="postContainer">
            <div className="upsContainer">
                <TbArrowBigTop className="upsIcon" id='up' onClick={() => document.querySelector('#up').classList.toggle('active')} />
                <p>{post.ups}</p>
                <TbArrowBigDown className="upsIcon" id='down'/>
            </div>
            <div className="main">
                <div className="titleContainer">
                    <h3>{post.title}</h3>
                </div>
                <div className="imageContainer">
                    {generateImage(post.url)}
                </div>
                <div className="detailsContainer">
                    <span className="author">{post.author}</span>
                    <span className="time">{moment.unix(post.created_utc).fromNow()}</span>
                    <div className="comments">
                        <BiCommentDetail className="commentIcon"/>
                        <p>{post.num_comments}</p>
                    </div>
                </div>     
            </div>       
        </div>
)
}