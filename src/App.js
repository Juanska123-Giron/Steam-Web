import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { GamesProvider } from "./context/GameContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainMenu from "./pages/MainMenu";
import GameInfo from "./pages/GameInfo";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

// Configura tu clave pública de Stripe
const stripePromise = loadStripe(
  "pk_test_51QAiyrHJvexuiPAUh3pXrY7BKMJDfeAa0xnVYDDt6n9s9fSEtAM0ljYMNqiR89g8fbS69QIX17MNUikmX4LnOHGS00lWnWIxOQ"
);

function App() {
  return (
    <GamesProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Router>
            <Routes>
              <Route path="/" element={<MainMenu />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/:gameId" element={<GameInfo />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </Router>
        </Elements>
      </CartProvider>
    </GamesProvider>
  );
}

export default App;
