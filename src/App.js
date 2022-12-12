import React from 'react';
import './App.css';

import { Header } from './features/Header/Header';
import { SubReddits } from './features/SubReddits/SubReddits';
import { Feed } from './features/Feed/Feed';
import { SkeletonTheme } from 'react-loading-skeleton'


function App() {
  return (
    <>
    <SkeletonTheme baseColor="#ccc8c8" highlightColor="#e8e6e6">
    <Header />
    <main>
      <Feed />
    </main>
    <aside>
      <SubReddits />
    </aside>
    </SkeletonTheme >
    </>
  )
}



export default App;
