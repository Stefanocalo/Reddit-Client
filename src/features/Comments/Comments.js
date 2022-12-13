import React from "react";
import moment from "moment";
import './Comments.css';

export const Comments = ({comment, id}) => {

    return(
        <div className="commentWrapper" key={id}>
            <div className="authorContainer">
                <span className="author"> {comment.author} </span>
                <span className="time"> . {moment.unix(comment.created).fromNow()}</span>
            </div>
            <p className="commentBody">{comment.body}</p>
        </div>
    )
}