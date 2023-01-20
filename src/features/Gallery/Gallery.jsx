import React, {useState, useEffect} from "react";
import { useSwipeable } from "react-swipeable";


import {AiFillCloseCircle} from 'react-icons/ai';
import { GalleryImage } from "./GalleryImage";

export const Gallery = ({post}) => {

    const [expand, setExpand] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        if(expand) {
            document.body.style.overflow = 'hidden';
        } else if(!expand){
            document.body.style.overflow = 'auto';
        }
    }, [expand]);

    const replaceString = (url) => {
        return url.toString().replace(/&amp;/g, '&');
    };

    const handlers = useSwipeable({
        onSwipedDown: () => setExpand(false),
        onSwipedUp: () => setExpand(false),
        onSwipedLeft: () => handleSwipeLeft(),
        onSwipedRight: () => handleSwipeRight(),
        delta: 10,
        trackMouse: true,
    });
    

    const handleSwipeRight = () => {
       if(value > 0) {
        const newValue = value -1;
        setValue(newValue);
       } else {
        return
       }
    };

    const handleSwipeLeft = () => {
        if(value < (post.gallery_data.items.length - 1)) {
            const newValue = value +1;
            setValue(newValue);
          } else {
           return
        }
    }


    return(
        <div className="galleryWrapper">
            <div 
            {...handlers}
            className={expand ? "expandImgContainer" : null}>
                <div
                onClick={() => setExpand(false)} ><AiFillCloseCircle className={expand ? 'clsBtnActive' : 'clsBtn'} />
                </div>
                <div className={expand ? "imgContainer" : 'gallerySmall'}>
                { post.gallery_data.items.map((element, index) => {
                    const originalUrl = post.media_metadata[element.media_id].s;
                    const url = replaceString(originalUrl.u);
                   return(<GalleryImage url={url} key={index} index={index} expand={expand} setExpand={setExpand} value={value} setValue={setValue}/>)
                })}  
                </div>
            </div>
        </div>
    )
}