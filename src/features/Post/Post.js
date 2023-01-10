import React, {useEffect, useState} from "react";
import './Post.css'
import {TbArrowBigTop, TbArrowBigDown} from 'react-icons/tb';
import {BiCommentDetail, BiErrorCircle} from 'react-icons/bi';
import {AiFillCloseCircle} from 'react-icons/ai'
import moment from 'moment';
import { Comments } from "../Comments/Comments";
import { CommentSkeleton } from "../Comments/CommentSkeleton";
import { numShortener } from "../../utils/numShortener";
import { useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";


export const Post = ({post, onToggleComment}) => {

    const [vote, setVote] = useState(0);
    const [numComm, setNumComm] = useState(3);
    const [expand, setExpand] = useState(false);

    const isLightMode = useSelector((state) => state.reddit.isLightMode);

    const handlers = useSwipeable({
        onSwiped: (eventData) => setExpand(false),
        delta: 10,
        trackMouse: true,
    })
    

    const generateImage = (url) => {
        if(url) {
            return( 
                    <div 
                    {...handlers}
                    className={expand ? "expandImgContainer" : null}>
                        <div
                        onClick={() => setExpand(false)} ><AiFillCloseCircle className={expand ? 'clsBtnActive' : 'clsBtn'} /></div>
                        <div className={expand ? "imgContainer" : "null"}>
                        <img 
                        src={url} 
                        alt="" 
                        className={expand ? 'expandPostImage' : 'postImage'}
                        onClick={() => expandImage()}
                        />
                         </div>
                    </div>)
        }
    }

    
    useEffect(() => {
        let overflow = expand ? 'hidden' : 'auto';

        document.body.style.overflow = overflow;

    }, [expand]);

    const expandImage = () => {

        !expand && setExpand(!expand);
    }

    // Ups arrows rendering handler funcitons

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

        if(isLightMode === true) {
            if (vote > 0) {
                return  <TbArrowBigTop className="upActive" />
            } else {
                return  <TbArrowBigTop className="up" />
            }
        }

        if(isLightMode === false) {
            if (vote > 0) {
                return  <TbArrowBigTop className="upActiveDark" />
            } else {
                return  <TbArrowBigTop className="upDark" />
            }
        }


    };

    const renderArrowDown = (vote) => {
        if(isLightMode === true) {
            if (vote < 0) {
                return  <TbArrowBigDown className="downActive"/>
            } else {
                return  <TbArrowBigDown className="down"/>
            }
        }

        if(isLightMode === false) {
            if (vote < 0) {
                return  <TbArrowBigDown className="downActiveDark"/>
            } else {
                return  <TbArrowBigDown className="downDark"/>
            }
        }
    }

    const renderUps = (vote) => {
        if(vote === 1) {
            const total = post.ups +1;
            return <p className='upVote'>{numShortener(total)}</p>
        } else if (vote === -1) {
            const total = post.ups -1;
            return <p className='downVote'>{numShortener(total)}</p>
        } else if (vote === 0) {
            return <p>{numShortener(post.ups)}</p>
        }
    }

    // CLick handler - comment button

    const incrementer = () => {
        setNumComm(numComm + 2);
    }

    const decrementer = () => {
        setNumComm(numComm - 2)
    }

    // Rendering show more comments button

    const renderMoreComments = () => {

        if(numComm <= 2 || post.comments.length <= 2) {
            return
        } else if(post.comments.length > numComm) {
            return(
                <div className="commButtons">
                    <button
                        className='commentButton'
                        onClick={() => incrementer()}
                        >Load more...
                    </button>

                    <button
                        className='commentButton'
                        onClick={() => decrementer()}
                        >Show less
                    </button>    
                </div>
            )
        } else if(numComm > post.comments.length) {
            return(
                <button
                    className='commentButton'
                    onClick={() => decrementer()}
                    >Show less
                </button>  
            )
        } 
    }


    

    // Rendering comments handler function

    const renderComments = () => {

        if (post.errorComments) {
          return (
            <div className="error">
                <BiErrorCircle className="errorIcon"/>
                <h4 className="errorMessage"> Error loading comments. </h4>
            </div>
          );
        }
    
        if (post.loadingComments) {
          return <CommentSkeleton cards={2} />
        }
    
        if (post.showingComments) {

          return (
            <div>
              {post.comments.map((comment, index) => index < numComm && (
                <Comments comment={comment} key={comment.id} />
              ))}
             
             {renderMoreComments()}
            </div>
          );
        }
    
        return null;
    };

    return (
        <div className="main">
        <div className={isLightMode ? "postContainer" : "postContainerDark"} key={post.id}>
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
                        <button
                         className={isLightMode ? 'comments' : 'commentsDark'}
                         onClick={() => {onToggleComment(post.permalink)}}
                         >
                        <BiCommentDetail className="commentIcon"/>
                        <p>{post.num_comments}</p>
                        </button>  
                </div>     
            </div>   
            </div> 
            <div className="commentsSection">
                 {renderComments()}
            </div>
        </div>
)
}