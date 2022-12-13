import React from "react";
import moment from "moment";
import './Comments.css';

export const Comments = ({comment, id}) => {
    return(
        <div key={id}>
            <div className="commentWrapper">
                <div className="authorContainer">
                    <span className="author"> {comment.author} </span>
                    <span className="time"> . {moment.unix(comment.created).fromNow()}</span>
                </div>
                <p className="commentBody">{comment.body}</p>
            </div>
            {comment.replies && comment.replies.data.children.map((reply) => (
                <div className="replyContainer" key={reply.data.id}>
                    <div className="replyWrapper">
                        <div className="authorContainer">
                            <span className="author"> {reply.data.author} </span>
                            <span className="time"> . {moment.unix(reply.data.created).fromNow()}</span>
                        </div>
                        <p className="commentBody">{reply.data.body}</p>
                    </div>
                </div>
            ))}
        </div>

    )
}

