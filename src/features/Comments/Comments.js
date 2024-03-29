import React from "react";
import moment from "moment";
import './Comments.css';
import { useSelector } from "react-redux";

export const Comments = ({comment, id}) => {
    const isLightMode = useSelector((state) => state.reddit.isLightMode);

    return(
        <div key={id}>
            <div className={isLightMode ? "commentWrapper" : "commentWrapperDark"}>
                <div className="authorContainer">
                    <span className="commentAuthor"> {comment.author} </span>
                    <span className="time"> . {moment.unix(comment.created).fromNow()}</span>
                </div>
                <p className="commentBody">{comment.body}</p>
            </div>
            {comment.replies && comment.replies.data.children.map((reply) => {
                if(reply.data.body) {
                    return  <div className="replyContainer" key={reply.data.id}>
                    <div className={isLightMode ? "replyWrapper" : "replyWrapperDark"}>
                        <div className="authorContainer">
                            <span className="commentAuthor"> {reply.data.author} </span>
                            <span className="time"> . {moment.unix(reply.data.created).fromNow()}</span>
                        </div>
                        <p className="commentBody">{reply.data.body}</p>
                    </div>
                </div>
                }
               
        })}
        </div>

    )
}

