import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import QR from "../assets/QRSteam.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // Importar el hook de redirección
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
  SubA,
  PreFooter,
  PreContainer,
  Title2,
  Button2,
  Column2,
} from "../styles/LoginStyles";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  const [serverResponse, setServerResponse] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const [showErrorMessages, setShowErrorMessages] = useState({
    email: false,
    password: false,
  });

  const [showSpanner, setShowSpanner] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Ingresa un correo válido";
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
    return passwordRegex.test(password)
      ? ""
      : "Tu contraseña debe tener al menos 12 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      const emailError = validateEmail(value);
      setValidationErrors({ ...validationErrors, email: emailError });
      setShowErrorMessages({ ...showErrorMessages, email: !!emailError });

      if (emailError) {
        setTimeout(() => {
          setShowErrorMessages({ ...showErrorMessages, email: false });
        }, 4500);
      }
    } else if (name === "password") {
      const passwordError = validatePassword(value);
      setValidationErrors({ ...validationErrors, password: passwordError });
      setShowErrorMessages({ ...showErrorMessages, password: !!passwordError });

      if (passwordError) {
        setTimeout(() => {
          setShowErrorMessages({ ...showErrorMessages, password: false });
        }, 4500);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerResponse("");
    setShowSpanner(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/users/login`, formData);

      if (response && response.data && response.data.token) {
        // Guardar el token en localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userName", response.data.user_name);
        // setServerResponse("Inicio de sesión exitoso");
        console.log("Logueo exitoso: ", response.data.user_name);
        navigate("/"); // Asegúrate de tener la ruta '/dashboard' configurada en tu app
      } else {
        setServerResponse("Error en el inicio de sesión. Inténtalo de nuevo.");
        setTimeout(() => {
          setShowSpanner(false);
        }, 4500);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setServerResponse(error.response.data.msg);
        setTimeout(() => {
          setShowSpanner(false);
        }, 4500);
      } else {
        setServerResponse("Error en el inicio de sesión. Inténtalo de nuevo.");
        setTimeout(() => {
          setShowSpanner(false);
        }, 4500);
      }
    }
  };

  const handleSubmitAlt = async (e) => {
    navigate("/register");
  };

  const isButtonDisabled =
    !formData.email || !formData.password || validationErrors.email || validationErrors.password;

  return (
    <>
      <Navbar />
      <Background>
        <MainContent>
          <Title data-aos="fade-down">Sign in</Title>
          <ContentContainer>
            <FormContainer>
              <Column>
                <label data-aos="fade-up">Email</label>
                {showErrorMessages.email && (
                  <span
                    data-aos="fade-in"
                    className="error-message"
                    style={{ color: "red", transition: "opacity 2s" }}
                  >
                    {validationErrors.email}
                  </span>
                )}
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                />
                <label data-aos="fade-up">Contraseña</label>
                {showErrorMessages.password && (
                  <span
                    data-aos="fade-in"
                    className="error-message"
                    style={{ color: "red", transition: "opacity 2s" }}
                  >
                    {validationErrors.password}
                  </span>
                )}
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                />

                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isButtonDisabled}
                  style={{
                    opacity: isButtonDisabled ? 0.5 : 1,
                    cursor: isButtonDisabled ? "not-allowed" : "pointer",
                  }}
                  data-aos="zoom-in"
                >
                  Ingresar
                </Button>

                {showSpanner && (
                  <Spanner
                    data-aos="fade-in"
                    style={{
                      margin: "1rem 0 0 0",
                      color: "#4da297",
                      opacity: serverResponse ? 1 : 0,
                      transition: "opacity 6s ease",
                    }}
                  >
                    {serverResponse ? serverResponse : ""}
                  </Spanner>
                )}

                <p>
                  ¿Necesitas ayuda? <a href="/support">Click aquí</a>
                </p>
                <SubA href="/recover-password">Olvidé mi contraseña</SubA>
              </Column>
              <QRContainer data-aos="fade-up">
                <label>También puedes iniciar con QR</label>
                <QRCode src={QR} alt="QR Code" />
                <p>Usa el App Steam Mobile para el sign in via código QR</p>
              </QRContainer>
            </FormContainer>
          </ContentContainer>
        </MainContent>
      </Background>
      <PreFooter>
        <PreContainer>
          <Column2>
            {/* <Title2 data-aos="fade-down">Sign in</Title2> */}
            <Title2 data-aos="fade-up">Nuevo en Steam?</Title2>
            <Button2 type="submit" onClick={handleSubmitAlt} data-aos="zoom-in">
              Crear una cuenta
            </Button2>
          </Column2>
          <Column2>
            <p data-aos="zoom-in">
              Es gratis y fácil. Descubre miles de juegos para jugar con millones de nuevos amigos.
              <a href="/support">Obtén más información sobre Steam.</a>
            </p>
          </Column2>
        </PreContainer>
      </PreFooter>

      <Footer />
    </>
  );
}

export default Login;
