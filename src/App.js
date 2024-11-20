import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { GamesProvider } from "./context/GameContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainMenu from "./pages/MainMenu";
import GameInfo from "./pages/GameInfo";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Library from "./pages/Library";
import LibraryInfo from "./pages/LibraryInfo";

// Inicializa Stripe con tu clave pública
const stripePromise = loadStripe(
  "pk_test_51QAiyrHJvexuiPAUh3pXrY7BKMJDfeAa0xnVYDDt6n9s9fSEtAM0ljYMNqiR89g8fbS69QIX17MNUikmX4LnOHGS00lWnWIxOQ"
);

function App() {
  return (
    <GamesProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:gameId" element={<GameInfo />} />
            <Route path="/cart" element={<Cart />} />
            {/* Envolver Payment en Elements */}
            <Route
              path="/payment"
              element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              }
            />
            <Route path="/success" element={<Success />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/:gameId" element={<LibraryInfo />} />
          </Routes>
        </Router>
      </CartProvider>
    </GamesProvider>
  );
}

export default App;
