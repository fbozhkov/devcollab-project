import React, { useState } from 'react';
import './App.css';
import { StyledEngineProvider } from '@mui/system';
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './contexts/UserContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Navbar from './components/navbar/Navbar';
import Mainpage from './components/mainpage/Mainpage';
import About from './components/about/About';
import Profile from './components/profile/Profile';
import Projects from './components/projects/Projects';
import CreateProject from './components/create-project/CreateProject';
import ProjectPage from './components/project-page/ProjectPage';
import Footer from './components/footer/Footer';


function App() {
  const [user, setUser] = useState();
  
  return (
    <div className="App">
    <Provider store={store}>
      <UserContext.Provider value={{user, setUser}}>
          <StyledEngineProvider injectFirst={true}>
          <Navbar />
          
          <Routes>
            <Route path='/' element={<Mainpage />} />
            <Route path='/about' element={<About />} />
            <Route path='/my-profile' element={<Profile />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/create-project' element={<CreateProject />} />
            <Route path='/project/:projectId' element={<ProjectPage />} />
          </Routes>

          <Footer />
          </StyledEngineProvider>
      </UserContext.Provider>
    </Provider>
    </div>
  );
}

export default App;
