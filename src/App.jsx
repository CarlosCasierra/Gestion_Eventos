import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Paginas

import Events from './pages/Events';
import Register from './pages/Register';
import Login from './pages/Login';

//Componentes
import Navbar from './components/navbar';
import Footer from './components/footer'




const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} /> 
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};


export default App;
