import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { GamesProvider } from "./context/GameContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainMenu from "./pages/MainMenu";
import GameInfo from "./pages/GameInfo";

function App() {
  return (
    <GamesProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<MainMenu />} />
            <Route path="/:gameId" element={<GameInfo/>} />
          </Routes>
        </Router>
      </CartProvider>
    </GamesProvider>
  );
}

export default App;
