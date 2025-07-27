import { Routes, Route } from "react-router-dom";
import "./App.css";

import UserProvider from "./context/UserProvider.jsx";
import LoginPage from "./componets/loginPage/LoginPage.jsx";
import Home from "./componets/home/Home.jsx";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route exact path="/" element={ <LoginPage/> } />
        <Route exact path="/home" element={ <Home/> } />
        
      </Routes>
    </UserProvider>
  );
}

export default App;
