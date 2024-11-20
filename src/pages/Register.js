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

function Register() {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [serverResponse, setServerResponse] = useState("");
  const [showSpanner, setShowSpanner] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    birthday: "",
    cellphone_number: "",
    country_id: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    user_name: "",
    email: "",
    password: "",
    birthday: "",
    cellphone_number: "",
  });

  const [showErrorMessages, setShowErrorMessages] = useState({
    user_name: false,
    email: false,
    password: false,
    birthday: false,
    cellphone_number: false,
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });

    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/country/");
        setCountries(response.data);
        // console.log("Fetching Countries: ", response.data);
      } catch (error) {
        console.error("Error obteniendo países:", error);
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
      console.log("FormData: ", formData);
      const response = await axios.post("http://localhost:3000/api/users", formData);

      if (response && response.data) {
        setServerResponse("Registro exitoso, redirigiendo...");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setServerResponse(
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : "Error en el registro. Inténtalo de nuevo."
      );
    }

    setTimeout(() => {
      setShowSpanner(false);
    }, 4500);
  };

  const isButtonDisabled = Object.values(validationErrors).some((error) => error);

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
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                />

                <label data-aos="fade-up">Fecha de Nacimiento</label>
                <Input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                />

                <label data-aos="fade-up">Número de Teléfono</label>
                <Input
                  type="text"
                  placeholder="Teléfono"
                  name="cellphone_number"
                  value={formData.cellphone_number}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                />

                <label data-aos="fade-up">País</label>
                <CountrySelector
                  name="country_id"
                  value={formData.country_id}
                  onChange={handleChange}
                  required
                  data-aos="fade-up"
                >
                  {countries.map((country) => (
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
                  Registrarse
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
    </>
  );
}

export default Register;
