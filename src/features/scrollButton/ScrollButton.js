import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import './ScrollButton.css';
  
export const ScrollButton = () => {


  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <button 
    className='scrollTop'
    onClick={scrollToTop}
    style={{bottom: visible ? '1rem' : '-3rem'}}>
     <FaArrowCircleUp className='topIcon' />
     Scroll Top
    </button>
  );
}
  
export default ScrollButton;