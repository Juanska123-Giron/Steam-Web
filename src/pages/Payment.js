import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import {
  Container,
  TitleTextView,
  FormText,
  ButtonText,
  BlueButton,
  InputBox,
} from "../styles/GeneralStyles";

const Payment = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    let paymentResponse; // Mover la declaración fuera del bloque try
    let gameIds = []; // Inicializar gameIds aquí
    let token = ""; // Inicializar token aquí
  
    console.log("Datos del formulario:", formData); // Aquí imprimimos los datos del formulario
  
    try {
      token = localStorage.getItem("authToken"); // Get the token from localStorage
  
      if (!token) {
        setError("No se encontró el token de autenticación.");
        setIsLoading(false);
        return;
      }
  
      // Remove duplicate game IDs
      gameIds = [...new Set(cartItems.map((game) => game._id))];
      console.log("Game IDs being sent:", gameIds); // Log the game IDs
  
      // Procesar el pago
      paymentResponse = await axios.post(
        "https://prod.supersteam.pro/api/payment-cards/process",
        {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
          amount: totalPrice,
          gameIds, // Include gameIds in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(paymentResponse.data); // Agregar para depurar la respuesta
    } catch (error) {
      console.error("Payment error:", error.response ? error.response.data : error.message);
      setError("Error en el proceso de pago. Inténtalo de nuevo.");
      setIsLoading(false);
      return; // Terminar la ejecución si hay un error
    }
  
    if (paymentResponse.data.success) {
      // Agregar juegos a la biblioteca del usuario
      const addToLibraryResponse = await axios.post(
        "https://prod.supersteam.pro/api/games/add-to-library",
        {
          games: gameIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
  
      if (addToLibraryResponse.data.success) {
        // Limpiar el carrito y redirigir al usuario
        setCartItems([]);
        localStorage.removeItem("cartItems");
        navigate("/library");
      } else {
        setError("Error al agregar juegos a la biblioteca.");
      }
    } else {
      setError("Error al procesar el pago.");
    }
  };
  
  
  

  return (
    <>
      <Navbar />
      <Container>
        <TitleTextView>Pago</TitleTextView>
        <form onSubmit={handleSubmit}>
          <FormText>Número de tarjeta</FormText>
          <InputBox
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <FormText>Fecha de expiración</FormText>
          <InputBox
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
          <FormText>CVV</FormText>
          <InputBox
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <BlueButton type="submit" disabled={isLoading}>
            <ButtonText>{isLoading ? "Procesando..." : "Pagar"}</ButtonText>
          </BlueButton>
        </form>
      </Container>
    </>
  );
};

export default Payment;