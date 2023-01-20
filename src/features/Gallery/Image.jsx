import React, {useState} from "react";
import { useEffect } from "react";
import {AiFillCloseCircle} from 'react-icons/ai'

import { useSwipeable } from "react-swipeable";



export const Image = ({url}) => {

    const [expand, setExpand] = useState(false);

    useEffect(() => {
        if(expand) {
            document.body.style.overflow = 'hidden';
        } else if(!expand){
            document.body.style.overflow = 'auto';
        }
    }, [expand])


    const handlers = useSwipeable({
        onSwiped: (eventData) => setExpand(false),
        delta: 10,
        trackMouse: true,
    });


   
       
    return(
        <div 
        {...handlers}
        className={expand ? "expandImgContainer" : null}>
            <div
            onClick={() => setExpand(false)} ><AiFillCloseCircle className={expand ? 'clsBtnActive' : 'clsBtn'} /></div>
            <div className={expand ? "imgContainer" : "none"}>
            <img 
            src={url} 
            alt="" 
            className={expand ? 'expandPostImage' : 'postImage'}
            onClick={() => setExpand(true)}
            />
             </div>
        </div>
    )
}