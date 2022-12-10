import Skeleton from "react-loading-skeleton";
import './SubRedditSkeleton.css';
import { randomNumber } from "../../utils/randomNumber";


export const SubredditSkeleton = ({cards}) => {
   return Array(cards).fill(0).map((item, index) => (
    <div className="cardSkeleton" key={index}>
        <div className="icon">
            <Skeleton circle width={40} height={40} />
        </div>
        <div className="name">
            <Skeleton count={1} width={randomNumber()}/>
        </div>
    </div>  
   ))
};