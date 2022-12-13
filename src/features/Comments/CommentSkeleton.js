import React from "react";
import Skeleton from "react-loading-skeleton";
import './CommentSkeleton.css';
import { randomNumber } from "../../utils/randomNumber";

export const CommentSkeleton = ({cards}) => {

    return Array(cards).fill(0).map((card, index) => (
        <div className="commentWrapper" key={index}>
            <div className="inline">
                <Skeleton width='4rem'/>
                <p>  .  </p>
                <Skeleton width='2rem'/>
            </div>
            <div>
                <Skeleton width={randomNumber}/>
                <Skeleton width={randomNumber}/>
                <Skeleton width={randomNumber}/>
            </div>
        </div>
    ))
}