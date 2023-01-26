import React, {useState} from "react";
import { useEffect } from "react";
import {AiFillCloseCircle} from 'react-icons/ai'

import { useSwipeable } from "react-swipeable";



export const Image = ({url, thumbnail}) => {

    const [expand, setExpand] = useState(false);
    const [src, setSrc] = useState(thumbnail);

    useEffect(() => {
        if(expand) {
            document.body.style.overflow = 'hidden';
            setSrc(url);
        } else if(!expand){
            document.body.style.overflow = 'auto';
            setSrc(thumbnail);
        }

    }, [expand])


    const handlers = useSwipeable({
        onSwiped: () => setExpand(false),
        delta: 10,
        trackMouse: true,
    });

       
    return(
        <div 
        {...handlers}
        className={expand ? "expandImgContainer" : null}>
            <div
            onClick={() => setExpand(false)} ><AiFillCloseCircle className={expand ? 'clsBtnActive' : 'clsBtn'} /></div>
            <div className={expand ? "imgContainer" : 'imgSmall'}>
            <img 
            src={src} 
            alt="" 
            className={expand ? 'expandPostImage' : 'postImage'}
            onClick={() => setExpand(true)}
            />
             </div>
        </div>
    )
}