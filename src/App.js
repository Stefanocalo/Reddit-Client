import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import { Header } from './features/Header/Header';
import { SubReddits } from './features/SubReddits/SubReddits';
import { Feed } from './features/Feed/Feed';
import { SkeletonTheme } from 'react-loading-skeleton'

import {ScrollButton} from './features/scrollButton/ScrollButton';
import { CommentSkeleton } from './features/Comments/CommentSkeleton';
import { PostSkeleton } from './features/Post/PostSkeleton';


function App() {

  const isLightMode = useSelector((state) => state.reddit.isLightMode)


  return (
    <>
    <SkeletonTheme baseColor={isLightMode ? "#ccc8c8" : "#53504F"} highlightColor={isLightMode ? "#e8e6e6" : "#646464"}>
      <Header />
      <main className={isLightMode ? 'main' : 'mainDark'}>
        <Feed />
      </main>
      <aside className={isLightMode ? null : 'asideDark'} >
        <SubReddits />
      </aside>
      < ScrollButton />
    </SkeletonTheme >
    </>
  )
}



export default App;
