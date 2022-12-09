import React from 'react';
import './App.css';

import { Header } from './features/Header/Header';
import { SubReddits } from './features/SubReddits/SubReddits';
import { Feed } from './features/Feed/Feed';

function App() {
  return (
    <>
    <Header />
    <main>
      <Feed />
    </main>
    <aside>
      <SubReddits />
    </aside>
    
    </>
  )
}



export default App;
