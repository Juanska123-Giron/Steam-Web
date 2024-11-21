import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import {
  Background,
  Column,
  ContentContainer,
  FormContainer,
  MainContent,
  Title,
  Input,
  Button,
  CountrySelector,
  Spanner,
} from "../styles/RegisterStyles";
import Footer from "../components/Footer";

function Register() {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [showSpanner, setShowSpanner] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    birthday: "",
    cellphone_number: "",
    country_id: "", // Campo de país
  });

  const [validationErrors, setValidationErrors] = useState({
    user_name: "",
    email: "",
    password: "",
    birthday: "",
    cellphone_number: "",
    country_id: "", // Validación del campo de país
  });

  const [showErrorMessages, setShowErrorMessages] = useState({
    user_name: false,
    email: false,
    password: false,
    birthday: false,
    cellphone_number: false,
    country_id: false, // Mostrar mensaje de error para el campo de país
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });

    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://prod.supersteam.pro/api/country/");
        setCountries(response.data);
      } catch (error) {
        console.error("Error obteniendo países:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "email":
        errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Ingresa un correo válido";
        break;
      case "password":
        errorMessage = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/.test(value)
          ? ""
          : "Tu contraseña debe tener al menos 12 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.";
        break;
      case "user_name":
        errorMessage = value ? "" : "El nombre de usuario es obligatorio";
        break;
      case "birthday":
        errorMessage = value ? "" : "La fecha de nacimiento es obligatoria";
        break;
      case "cellphone_number":
        errorMessage = value ? "" : "El número de teléfono es obligatorio";
        break;
      case "country_id":
        errorMessage = value ? "" : "Selecciona un país";
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMessage = validateField(name, value);
    setValidationErrors({ ...validationErrors, [name]: errorMessage });
    setShowErrorMessages({ ...showErrorMessages, [name]: !!errorMessage });

    if (errorMessage) {
      setTimeout(() => {
        setShowErrorMessages((prevState) => ({ ...prevState, [name]: false }));
      }, 4500);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerResponse("");
    setShowSpanner(true);

    try {
      const response = await axios.post("https://prod.supersteam.pro/api/users", formData);

      if (response && response.data) {
        setServerResponse("Registro exitoso, redirigiendo...");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Resaltar el campo con error
        const { field, msg } = error.response.data;
        setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: msg }));
        setShowErrorMessages((prevShow) => ({ ...prevShow, [field]: true }));

        // Mostrar mensaje general
        setServerResponse(msg || "Error en los datos proporcionados.");
      } else {
        setServerResponse("Error en el registro. Inténtalo más tarde.");
      }
    } finally {
      // setTimeout(() => {
      //   setShowSpanner(false);
      // }, 1000);
    }
  };

  const isButtonDisabled =
    Object.values(validationErrors).some((error) => error) ||
    Object.values(formData).some((value) => value === "");

  return (
    <>
      <Background>
        <MainContent>
          <Title data-aos="fade-down">CREA UNA CUENTA</Title>
          <ContentContainer>
            <FormContainer>
              <Column>
                <label data-aos="fade-up">Nombre de Usuario</label>
                {showErrorMessages.user_name && (
                  <span
                    data-aos="fade-in"
                    className="error-message"
                    style={{ color: "red", transition: "opacity 2s" }}
                  >
                    {validationErrors.user_name}
                  </span>
                )}
                <Input
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                />

                <label data-aos="fade-up">Correo Electrónico</label>
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
                  placeholder="Contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                />

                <label data-aos="fade-up">Fecha de Nacimiento</label>
                {showErrorMessages.birthday && (
                  <span
                    data-aos="fade-in"
                    className="error-message"
                    style={{ color: "red", transition: "opacity 2s" }}
                  >
                    {validationErrors.birthday}
                  </span>
                )}
                <Input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                />

                <label data-aos="fade-up">Número de Teléfono</label>
                {showErrorMessages.cellphone_number && (
                  <span
                    data-aos="fade-in"
                    className="error-message"
                    style={{ color: "red", transition: "opacity 2s" }}
                  >
                    {validationErrors.cellphone_number}
                  </span>
                )}
                <Input
                  type="tel"
                  placeholder="Número de Teléfono"
                  name="cellphone_number"
                  value={formData.cellphone_number}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                />

                <label data-aos="fade-up">País</label>
                {showErrorMessages.country_id && (
                  <span
                    data-aos="fade-in"
                    className="error-message"
                    style={{ color: "red", transition: "opacity 2s" }}
                  >
                    {validationErrors.country_id}
                  </span>
                )}
                <CountrySelector
                  name="country_id"
                  value={formData.country_id}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                >
                  <option value="" disabled>
                    Selecciona un país
                  </option>
                  {!isLoading &&
                    countries.map((country) => (
                      <option key={country._id} value={country._id}>
                        {country.country_name}
                      </option>
                    ))}
                </CountrySelector>

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
                  Registrar
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
                  ¿Ya tienes una cuenta?{" "}
                  <a href="/login" data-aos="fade-up">
                    Inicia sesión aquí
                  </a>
                </p>
              </Column>
            </FormContainer>
          </ContentContainer>
        </MainContent>
      </Background>
      <Footer />
    </>
  );
}

export default Register;
