import React, { useState } from 'react';
import './App.css';
import { StyledEngineProvider } from '@mui/system';
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './contexts/UserContext';
import Navbar from './components/navbar/Navbar';
import Mainpage from './components/mainpage/Mainpage';
import About from './components/about/About';
import Profile from './components/profile/Profile';
import Projects from './components/projects/Projects';
import CreateProject from './components/create-project/CreateProject';
import ProjectPage from './components/project-page/ProjectPage';


function App() {
  const [user, setUser] = useState();
  
  return (
    <div className="App">
      
    <UserContext.Provider value={{user, setUser}}>
        <StyledEngineProvider injectFirst={true}>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/create-project' element={<CreateProject />} />
          <Route path='/project/:projectId' element={<ProjectPage />} />
        </Routes>
        </StyledEngineProvider>
    </UserContext.Provider>
      
    </div>
  );
}

export default App;
