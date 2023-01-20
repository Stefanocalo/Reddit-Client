import React, {useState} from "react";
import {AiFillCloseCircle} from 'react-icons/ai'


export const Gallery = () => {

    const replaceString = (url) => {
        return url.replace(/&amp;/g, '&');
    };

    //Generating array of objects containing original and thumbnail urls
    const generateGallery = (post) => {
      
        let images = [

        ];
       post.gallery_data.items.map(element => {
        const originalUrl = replaceString(post.media_metadata[element.media_id].s.u);
        const thumbnailUrl = replaceString(post.media_metadata[element.media_id].p[3].u);
        const payload = {
            original: originalUrl,
            thumbnail: thumbnailUrl
        }

        images.push(payload);
       
    });
    return(
        <ImageGallery items={images} useTranslate3D={false}/>
     )
      
    }


    return(
        <div></div>
    )
}