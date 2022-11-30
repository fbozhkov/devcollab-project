import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './contexts/UserContext';
import Navbar from './components/navbar/Navbar';
import Mainpage from './components/mainpage/Mainpage';
import About from './components/about/About';
import Profile from './profile/Profile';
import Projects from './components/projects/Projects';
import CreateProject from './components/create-project/CreateProject';


function App() {
  const [user, setUser] = useState();
  
  return (
    <div className="App">
      
    <UserContext.Provider value={{user, setUser}}>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/create-project' element={<CreateProject />} />
        </Routes>
    </UserContext.Provider>
      
    </div>
  );
}

export default App;
