import "./App.css";
import Header from "./Layout/Header";

import Home from "./Layout/Home";
import Login from "./Layout/Login/Login";
import Register from "./Layout/Register/Register";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <section className="app-container">
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />        
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </section> 
    </Router>
  );
}

export default App;