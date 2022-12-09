import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubReddits } from "../../store/subRedditSlice";
import { selectedSubReddits, selectSubReddits } from "../../store/redditSlice";
import './SubReddits.css';


export const SubReddits = () => {

    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubReddits);
    const selectedSubReddit = useSelector(selectedSubReddits);


    useEffect(() => {
        dispatch(fetchSubReddits());
    }, [dispatch]);



    return (
        <div className="subredditsSection">

        </div>
    )

};

