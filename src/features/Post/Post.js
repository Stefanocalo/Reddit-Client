import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import './Post.css'
import {TbArrowBigTop, TbArrowBigDown} from 'react-icons/tb';
import {BiCommentDetail, BiErrorCircle} from 'react-icons/bi';
import moment from 'moment';
import { Comments } from "../Comments/Comments";
import { CommentSkeleton } from "../Comments/CommentSkeleton";
import { numShortener } from "../../utils/numShortener";
import { useSelector } from "react-redux";
import "react-image-gallery/styles/css/image-gallery.css";
import { Image } from "../Gallery/Image";
import { Gallery } from "../Gallery/Gallery";
import { Video } from "../Gallery/Video";
import { fetchAuthor } from "../../store/redditSlice";



export const Post = ({post, index, onToggleComment}) => {

    const [vote, setVote] = useState(0);
    const [numComm, setNumComm] = useState(3);
    const [expand, setExpand] = useState(false);
    const [isShortened, setIsShortened] = useState(false);

    const isLightMode = useSelector((state) => state.reddit.isLightMode);

    const dispatch = useDispatch();
   
    useEffect(() => {
        let overflow = expand ? 'hidden' : 'auto';

        document.body.style.overflow = overflow;

    }, [expand]);

    useEffect(() => {
        dispatch(fetchAuthor(index, post.author));
    },[])
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


    //Shortening text
    const linkDetectionRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi

    function linkSwapper(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, 'link')
    }
    
    const text = linkSwapper(post.selftext);

    useEffect(() => {
        if (post.selftext.split(" ").length > 40) {
            setIsShortened(true);
        }
    },[post])

    const wordShortener = (str) => { 
        if(isShortened) {
            let shortened = str.slice(0,300);
           return shortened + '...'
        } else {
            return text
        }
      }

      const replaceString = (url) => {
        return url.toString().replace(/&amp;/g, '&');
    };

    return (
        <div className="main">
        <div className={isLightMode ? "postContainer" : "postContainerDark"} key={post.id}>
           
            <div className="main">
                <div className='authorContainer'>
                    {post.author_data.icon_img?.length > 1 && <img className='authorAvatar' alt='profile avatar' src={replaceString(post.author_data.icon_img)} />}
                    <span className="author">{post.author}</span>
                </div>
                <span className="subreddit">{post.subreddit_name_prefixed}</span>
                <div className="titleContainer">
                    <h3>{post.title}</h3>
                </div>
                {post.selftext && 
                    <div className="selfTextContainer">
                        <p className="postText">{wordShortener(text)}</p>
                        <div 
                        onClick={() => setIsShortened(!isShortened) }
                        role='button'
                        className="showMoreButton">{isShortened ? 'Show more...' : 'Show less...'}</div>
                    </div>}
                {(!post.is_gallery && post.url && post.thumbnail !== null && !post.selftext) && 
                    <div className="imageContainer">
                        <Image url={post.url} />
                    </div>
                }
                {post.post_hint === 'link' && 
                    <div className="imageContainer">
                        <Video url={post.thumbnail} link={post.url}/>
                    </div>
                }
                {post.is_gallery === true && 
                    <div className="imageContainer">
                        <Gallery post={post} />
                    </div>}
                    <div className="detailsContainer">
                        <div className="upsContainer">
                            <button onClick={() => handleVoteUP(1)}>
                                {renderArrowUp(vote)}
                            </button>
                            {renderUps(vote)}
                            <button onClick={() => handleVoteDOWN(-1)}>
                                {renderArrowDown(vote)}
                            </button>
                        </div>
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