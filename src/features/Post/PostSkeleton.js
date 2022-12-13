import Skeleton from "react-loading-skeleton";
import './PostSkeleton.css';
import { randomNumber } from "../../utils/randomNumber";
import {TbArrowBigTop, TbArrowBigDown} from 'react-icons/tb';
import {BiCommentDetail} from 'react-icons/bi';

export const PostSkeleton = ({cards}) => {

    return Array(cards).fill(0).map((item, index) => (
        <div className="SkeletonContainer" key={index}>
        <div className="upsContainer">
            <TbArrowBigTop className="upsIcon" id='up' onClick={() => document.querySelector('#up').classList.toggle('active')} />
            <Skeleton width='1rem' />
            <TbArrowBigDown className="upsIcon" id='down'/>
        </div>
        <div className="main">
            <div className="titleContainer">
                <Skeleton width='80%' />
            </div>
            <div className="imageContainer">
                <Skeleton  width='90%' height='15rem'  />
            </div>
            <div className="detailsContainer">
                 <Skeleton width='5rem' />
                <Skeleton width='3rem' />
                <div className="comments">
                    <BiCommentDetail className="commentIcon"/>
                    <Skeleton width='1rem' />
                </div>
                </div>
            </div>     
        </div>       
    ))
}