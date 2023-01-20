import React, {useState, useEffect} from "react";

export const GalleryImage = ({url, index, expand, setExpand, value, setValue}) => {

    useEffect(() => {
        if(expand) {
            document.body.style.overflow = 'hidden';
        } else if(!expand){
            document.body.style.overflow = 'auto';
        }
    }, [expand])

    const position = expand ? 'fixed' : 'static';

    const handleExpand = () => {
        setExpand(true);
        setValue(index);
    }

    return(
        <img 
        style={{position: position, left:`${(index * 100)- (value * 100)}%`}}
        src={url} 
        alt="" 
        className={expand ? 'expandGalleryPostImage' : 'galleryPostImage'}
        key={index}
        onClick={() => handleExpand()}
        />)

}