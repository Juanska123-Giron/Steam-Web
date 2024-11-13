import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import QR from "../assets/QRSteam.svg";
import {
  Background,
  MainContent,
  ContentContainer,
  Title,
  FormContainer,
  Column,
  Input,
  QRContainer,
  QRCode,
  Button,
  Spanner,
} from "../styles/LoginStyles";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <Background>
        <MainContent>
          {/* Contenedor principal */}
          <Title>Sign in</Title> {/* Título alineado a la izquierda del formulario */}
          <ContentContainer>
            <FormContainer>
              <Column>
                <label>Email</label>
                <span>Ingresa un correo válido</span>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Contraseña</label>
                <span>
                  Tu contraseña debe tener al menos 12 caracteres e incluir una letra mayúscula, una
                  letra minúscula, un número y un carácter especial.
                </span>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <Button type="submit" onClick={handleSubmit}>
                  Ingresar
                </Button>
                <p>
                  ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </p>
              </Column>
              <QRContainer>
                <label>También puedes iniciar con QR</label>
                <QRCode src={QR} alt="QR Code" />
                <p>Usa el App Steam Mobile para el sign in via código QR</p>
              </QRContainer>
            </FormContainer>
          </ContentContainer>
        </MainContent>
      </Background>
    </>
  );
}

export default Login;
