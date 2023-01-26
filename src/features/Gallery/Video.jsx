import React from "react";
import './gallery.css';



export const Video = ({url, link}) => {

   

    return(
        <div className="videoWrapper" >
            <a href={link} target='_blank'>
                <div className='imgSmall'>
                    <div className="banner">
                        <p>Externa link</p>
                    </div>
                    <img 
                    src={url} 
                    alt="" 
                    className='postImage'
                    />
                </div>
               
            </a>
        </div>
    )
}