import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import {
  Container,
  TitleTextView,
  FormText,
  BlueButton,
  ButtonText,
} from "../styles/GeneralStyles";
import { PaymentForm, PaymentWrapper } from "../styles/PaymentStyles";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = location.state?.totalPrice;

  useEffect(() => {
    console.log("Total Price from location state:", totalPrice); // Agregar mensaje de depuración
  }, [totalPrice]);

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      const token = localStorage.getItem("authToken"); // Obtener el token de autenticación

      console.log("Payment Method ID:", paymentMethod.id); // Mensaje de depuración
      console.log("Total Price:", totalPrice); // Mensaje de depuración

      // Eliminar duplicados de gameIds
      const gameIds = [...new Set(cartItems.map((game) => game._id))];
      console.log("Game IDs:", gameIds); // Mensaje de depuración

      const response = await axios.post(
        "https://prod.supersteam.pro/api/payment-cards/process",
        {
          payment_method_id: paymentMethod.id,
          amount: totalPrice,
          gameIds: gameIds, // Incluir gameIds en la solicitud
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
          },
        }
      );

      console.log("Payment Response:", response.data); // Mensaje de depuración

      if (response.data.clientSecret) {
        const { clientSecret } = response.data;

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (result.error) {
          console.error("Error confirming card payment:", result.error);
          setError("Error en el procesamiento del pago. Inténtalo de nuevo.");
        } else if (
          result.paymentIntent &&
          result.paymentIntent.status === "succeeded"
        ) {
          const addToLibraryResponse = await axios.post(
            "https://prod.supersteam.pro/api/games/add-to-library", // Verifica que esta URL sea correcta
            {
              games: gameIds,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
              },
            }
          );

          console.log("Add to Library Response:", addToLibraryResponse.data); // Mensaje de depuración

          setCartItems([]);
          localStorage.removeItem("cartItems");
          navigate("/success"); // Redirigir a /success después del pago exitoso
        }
      } else {
        setError("Error en el procesamiento del pago. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data); // Mensaje de depuración para la respuesta del servidor

        // Agregar manejo de error más detallado para el código 404
        if (error.response.status === 404) {
          setError(
            "No se pudo encontrar el servicio de adición a la biblioteca. Intenta más tarde."
          );
        } else {
          setError("Error en el procesamiento del pago. Inténtalo de nuevo.");
        }
      } else {
        setError("Error en el procesamiento del pago. Inténtalo de nuevo.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <PaymentWrapper>
          <TitleTextView>Pago</TitleTextView>
          <PaymentForm onSubmit={handlePayment}>
            {totalPrice ? (
              <>
                <FormText>Total a pagar: ${totalPrice / 1000}</FormText>
                <CardElement />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <BlueButton type="submit" disabled={isProcessing || !stripe}>
                  <ButtonText>
                    {isProcessing ? "Procesando..." : "Pagar"}
                  </ButtonText>
                </BlueButton>
              </>
            ) : (
              <p style={{ color: "red" }}>
                No se pudo obtener el total a pagar.
              </p>
            )}
          </PaymentForm>
        </PaymentWrapper>
      </Container>
    </>
  );
};

export default Payment;
