import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QAiyrHJvexuiPAUh3pXrY7BKMJDfeAa0xnVYDDt6n9s9fSEtAM0ljYMNqiR89g8fbS69QIX17MNUikmX4LnOHGS00lWnWIxOQ"
);

const Payment = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [cardType, setCardType] = useState("");

  useEffect(() => {
    const fetchToken = () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) {
          throw new Error(
            "No se encontró un token en el almacenamiento local."
          );
        }
        setToken(storedToken);
      } catch (error) {
        console.error("Error al cargar el token:", error);
        window.alert(
          "Hubo un problema al recuperar tus credenciales. Por favor, inicia sesión nuevamente."
        );
        navigate("/login"); // Redirige al usuario al inicio de sesión
      }
    };

    fetchToken();
  }, [navigate]);

  const detectCardType = (number) => {
    const patterns = {
      Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      MasterCard: /^5[1-5][0-9]{14}$/,
      "American Express": /^3[47][0-9]{13}$/,
      Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        setCardType(type);
        return;
      }
    }
    setCardType("");
  };

  const handleCardNumberChange = (number) => {
    const cleanedNumber = number.replace(/\D/g, "");
    const formattedNumber = cleanedNumber.replace(/(\d{4})(?=\d)/g, "$1 ");

    setCardNumber(formattedNumber);
    detectCardType(cleanedNumber);
  };

  const handleExpiryChange = (text) => {
    if (text.length > 5) return;

    let formattedText = text.replace(/\D/g, "");
    if (formattedText.length > 2) {
      formattedText =
        formattedText.slice(0, 2) + "/" + formattedText.slice(2, 4);
    }

    setExpiry(formattedText);
  };

  const handlePayment = async () => {
    const isCardNumberValid = cardNumber.replace(/\s/g, "").length === 16;
    const isExpiryValid = expiry.length === 5 && expiry.includes("/");
    const isCvcValid = cvc.length === 3;

    if (!isCardNumberValid || !isExpiryValid || !isCvcValid) {
      window.alert(
        "Por favor, completa correctamente todos los campos de la tarjeta."
      );
      return;
    }

    setLoading(true);

    if (!token) {
      window.alert("Token no encontrado. Por favor, inicia sesión nuevamente.");
      setLoading(false);
      return;
    }

    try {
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
      const gameIds = cartItems.map((item) => item._id);

      const response = await fetch(
        `http://localhost:3000/api/payment-cards/process`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: totalAmount * 100,
            gameIds,
          }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const { clientSecret } = await response.json();
      const cardElement = elements.getElement(CardElement);

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // Agregar datos adicionales aquí si es necesario
          },
        },
      });

      if (error) {
        console.error(error.message);
        window.alert("Hubo un problema con el pago.");
        setLoading(false);
        return;
      }

      window.alert("Pago procesado correctamente.");
      navigate("/success");

      const saveGameToLibraryResponse = await fetch(
        `http://localhost:3000/api/games/add-to-library`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gameIds,
          }),
        }
      );

      if (!saveGameToLibraryResponse.ok) {
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error(err);
      window.alert("Hubo un problema al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Pago</h1>
      <input
        type="text"
        value={cardNumber}
        onChange={(e) => handleCardNumberChange(e.target.value)}
        placeholder="Número de tarjeta"
      />
      {cardType && <p>Tipo de tarjeta: {cardType}</p>}
      <input
        type="text"
        value={expiry}
        onChange={(e) => handleExpiryChange(e.target.value)}
        placeholder="MM/YY"
      />
      <input
        type="text"
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
        placeholder="CVC"
      />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Procesando..." : "Pagar"}
      </button>
    </div>
  );
};

export default Payment;
