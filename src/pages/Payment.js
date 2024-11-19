import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../components/Navbar";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import {
  Container,
  TitleTextView,
  FormText,
  InputBox,
  RowBox,
  ColumnBox,
  BlueButton,
  ButtonText,
} from "../styles/GeneralStyles"; // Asegúrate de importar los estilos
import { PaymentFormContainer } from "../styles/PaymentStyles";

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
        `https://prod.supersteam.pro/api/payment-cards/process`,
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

      // Después de procesar el pago, agregamos el juego a la biblioteca
      const saveGameToLibraryResponse = await fetch(
        `https://prod.supersteam.pro/api/games/add-to-library`,
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

      const responseData = await saveGameToLibraryResponse.json();

      // Verifica si la respuesta del backend indica que los juegos ya están en la biblioteca
      if (
        responseData.message === "Todos los juegos ya están en la biblioteca."
      ) {
        console.log("Los juegos ya estaban en la biblioteca.");
      } else if (saveGameToLibraryResponse.ok) {
        console.log(responseData.message);
      } else {
        console.error(
          "Hubo un problema al agregar los juegos a la biblioteca."
        );
        window.alert("Hubo un problema al procesar el pago.");
      }
      window.alert("Pago procesado correctamente.");
      navigate("/success");
    } catch (err) {
      console.error(err);
      window.alert("Pago procesado correctamente.");
      navigate("/success");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
      <PaymentFormContainer>
        <TitleTextView>Método de Pago</TitleTextView>

        <FormText>Número de tarjeta</FormText>
        {cardType && <p>Tipo de tarjeta: {cardType}</p>}
        <InputBox
          type="text"
          value={cardNumber}
          onChange={(e) => handleCardNumberChange(e.target.value)}
          placeholder="Número de tarjeta"
        />

        <RowBox>
          <ColumnBox>
            <FormText>Fecha de expiración</FormText>
            <InputBox
              type="text"
              value={expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              placeholder="MM/YY"
            />
          </ColumnBox>

          <ColumnBox>
            <FormText>Código de seguridad</FormText>
            <InputBox
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="CVC"
            />
          </ColumnBox>
        </RowBox>

        <BlueButton onClick={handlePayment} disabled={loading}>
          <ButtonText>{loading ? "Procesando..." : "Pagar"}</ButtonText>
        </BlueButton>
      </PaymentFormContainer>
    </Container>
    </>
  );
};

export default Payment;
