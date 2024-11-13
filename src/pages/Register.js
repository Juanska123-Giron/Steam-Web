import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
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
} from "../styles/RegisterStyles";

function Register() {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    birthday: "",
    cellphone_number: "",
    country_id: "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/country/`);
        setCountries(response.data); // Asigna los datos de la respuesta
        //console.log(response.data);
      } catch (error) {
        console.error("Error obteniendo países:", error);
      }
    };
    fetchCountries();
  }, []);

  // Manejador de cambios de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users", formData);
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
          <Title>CREA UNA CUENTA</Title>
          <ContentContainer>
            <FormContainer>
              <Column>
                <label>Nombre de Usuario</label>
                <Input
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                />
                <label>Dirección Email</label>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>Fecha de Nacimiento</label>
                <Input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
                <label>Teléfono</label>
                <Input
                  type="number"
                  placeholder="Número de teléfono"
                  name="cellphone_number"
                  value={formData.cellphone_number}
                  onChange={handleChange}
                />
                <label>Contraseña</label>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label>País</label>
                <CountrySelector
                  name="country_id"
                  value={formData.country_id}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un país</option>
                  {countries.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.country_name}
                    </option>
                  ))}
                </CountrySelector>
                <Button type="submit" onClick={handleSubmit}>
                  Registrarse
                </Button>
                <p>
                  ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
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
