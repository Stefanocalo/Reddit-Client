import React, {useState} from "react";
import { useEffect } from "react";
import {AiFillCloseCircle} from 'react-icons/ai'


export const Gallery = ({post}) => {

    const [expand, setExpand] = useState(false);

    useEffect(() => {
        if(post.is_gallery === true) {
           
            
        } else {
            return
        }

    }, [])

    const replaceString = (url) => {
        return url.replace(/&amp;/g, '&');
    };


      
    
    return(
        <div className="galleryWrapper">
            { post.gallery_data.items.map((element, index) => {
                const originalUrl = post.media_metadata[element.media_id].s;

                return(
                        <img
                         src={replaceString(originalUrl.u)}
                         className={expand ? 'expandPostImage' : 'postGalleryImage'}
                         key={index}
                         />
                )
                
                
            })}
          
        </div>
    )
}