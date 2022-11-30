import './App.css';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Mainpage from './components/mainpage/Mainpage';

function App() {
  return (
    <div className="App">
      
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Mainpage />} />
      </Routes>
      
    </div>
  );
}

export default App;
