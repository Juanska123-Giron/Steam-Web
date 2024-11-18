import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"; // Importación correcta de CardElement

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe(); 
  const elements = useElements(); 

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return; 

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Error:", error);
      setLoading(false);
      return;
    }

    // Aquí, envías el token al backend o procesas el pago
    console.log("Token:", token);
    setLoading(false);
  };

  return (
    <div>
      <h2>Pago</h2>
      <form onSubmit={handleSubmit}>
        <CardElement /> {/* Aquí agregas el componente CardElement de Stripe */}
        <button disabled={!stripe || loading} type="submit">
          {loading ? "Cargando..." : "Pagar"}
        </button>
      </form>
    </div>
  );
};

export default Payment;
