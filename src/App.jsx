import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Video from './Pages/Video/Video.jsx';
import './App.css';

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Navbar setSidebar={setSidebar} setSearchQuery={setSearchQuery}/>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sidebar={sidebar}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        ></Route>
        <Route path="/video/:categoryId/:videoId" element={<Video />}></Route>
      </Routes>
    </>
  );
};
export default App;
