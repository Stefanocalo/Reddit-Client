import React, {useState} from "react";
import './Post.css'
import {TbArrowBigTop, TbArrowBigDown} from 'react-icons/tb';
import {BiCommentDetail} from 'react-icons/bi';
import moment from 'moment';

export const Post = ({post}) => {

    const [vote, setVote] = useState(0);

    const generateImage = (url) => {
        if(url) {
            return( <img src={url} alt=""/>)
        }
    }

    const handleVoteUP = (newValue) => {
        if (newValue === vote) {
            setVote(0);
        } else {
            setVote(newValue)
        }
    };

    const handleVoteDOWN = (newValue) => {
        if (newValue === vote) {
            setVote(0);
        } else {
            setVote(-1)
        }
    };

    const renderArrowUp = (vote) => {
        if (vote > 0) {
            return  <TbArrowBigTop className="upActive" />
        } else {
            return  <TbArrowBigTop className="up" />
        }
    };

    const renderArrowDown = (vote) => {
        if (vote < 0) {
            return  <TbArrowBigDown className="downActive"/>
        } else {
            return  <TbArrowBigDown className="down"/>
        }
    }

    const renderUps = (vote) => {
        if(vote === 1) {
            return <p className='upVote'>{post.ups +1}</p>
        } else if (vote === -1) {
            return <p className='downVote'>{post.ups -1}</p>
        } else if (vote === 0) {
            return <p>{post.ups}</p>
        }
    }


    return (
        <div className="postContainer" key={post.id}>
            <div className="upsContainer">
                <button onClick={() => handleVoteUP(1)}>
                    {renderArrowUp(vote)}
                </button>
                {renderUps(vote)}
                <button onClick={() => handleVoteDOWN(-1)}>
                    {renderArrowDown(vote)}
                </button>
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
                        <button className="comments">
                        <BiCommentDetail className="commentIcon"/>
                        <p>{post.num_comments}</p>
                        </button>  
                </div>     
            </div>       
        </div>
)
}