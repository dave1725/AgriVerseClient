import './App.css'
import Welcome from "./components/Welcome";
import About from './components/About.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import Farms from './components/Farms.jsx';
import Produces from './components/Produces.jsx';
import Stakeholders from './components/Stakeholders.jsx';
import Revenue from './components/Revenue.jsx';
import { Route, Routes } from 'react-router-dom';
import Market from './components/Market.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/farms' element={<Farms />}></Route>
        <Route path='/produces' element={<Produces />}></Route>
        <Route path='/stakeholders' element={<Stakeholders />}></Route>
        <Route path='/revenue' element={<Revenue />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path="/market" element={<Market />}></Route>
      </Routes>
    </>
  );
}

export default App
