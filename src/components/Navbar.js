import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  NavbarContainer,
  StyledLogo,
  OptionsContainer,
  Option,
  OptionsContainerLogin,
  OptionLogin,
  VerticalBar,
  MobileMenuButton,
  MobileMenu,
  OptionsMenuMobile,
  UserNameLabel,
} from "../styles/NavbarStyles";
import LogoSvg from "../assets/steamLogo.svg";

function Navbar() {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [selectedOption, setSelectedOption] = useState("TIENDA");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      setUserName(localStorage.getItem("userName"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setMobileMenuOpen(false);

    switch (option) {
      case "TIENDA":
        navigate("/");
        break;
      case "BIBLIOTECA":
        navigate("/library");
        break;
      case "MI PERFIL":
        navigate("/profile");
        break;
      case "CARRITO":
        navigate("/cart");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("userName");
    setUserName(null); // Actualizar el estado inmediatamente
  };

  const handleUserClick = () => {
    navigate("/user-info");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      easing: "ease", // Efecto de transición
      once: false, // Las animaciones deben ejecutarse cada vez que el elemento entre en vista
    });

    const handleResize = () => {
      if (window.innerWidth > 1343 && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      AOS.refresh(); // Forzamos la actualización de AOS después de cada cambio de estado
    };
  }, [isMobileMenuOpen, selectedOption]);

  return (
    <NavbarContainer>
      <MobileMenuButton onClick={toggleMobileMenu} data-aos="fade-right">
        ☰
      </MobileMenuButton>
      <StyledLogo
        src={LogoSvg}
        alt="Logo de Steam"
        onClick={() => navigate("/")}
        data-aos="zoom-in"
      />
      <OptionsContainer data-aos="fade-up">
        {["TIENDA", "BIBLIOTECA", "MI PERFIL", "CARRITO"].map(
          (option) => (
            <Option
              key={option}
              onClick={() => handleOptionClick(option)}
              $isSelected={selectedOption === option}
              data-aos="zoom-in"
            >
              {option}
            </Option>
          )
        )}
      </OptionsContainer>
      <OptionsContainer data-aos="fade-up">
        <OptionsContainerLogin>
          {userName ? (
            <>
              <UserNameLabel onClick={handleUserClick} data-aos="flip-left">
                {userName}
              </UserNameLabel>
              <VerticalBar $userName />
              <UserNameLabel onClick={handleLogOutClick} data-aos="flip-left">
                Cerrar Sesión
              </UserNameLabel>
            </>
          ) : (
            <>
              <OptionLogin onClick={handleLoginClick} data-aos="flip-left">
                Inicio de sesión
              </OptionLogin>
              <VerticalBar />
              <OptionLogin onClick={handleRegisterClick} data-aos="flip-right">
                Registrarse
              </OptionLogin>
            </>
          )}
        </OptionsContainerLogin>
      </OptionsContainer>
      <MobileMenu $isOpen={isMobileMenuOpen}>
        {["TIENDA", "COMUNIDAD", "ACERCA DE", "SOPORTE"].map((option) => (
          <OptionsMenuMobile
            key={option}
            onClick={() => handleOptionClick(option)}
            $isSelected={selectedOption === option}
            data-aos="fade-up"
          >
            {option}
          </OptionsMenuMobile>
        ))}
        <OptionsMenuMobile onClick={handleLoginClick} data-aos="zoom-in">
          Inicio de sesión
        </OptionsMenuMobile>
        <OptionsMenuMobile onClick={handleRegisterClick} data-aos="zoom-in">
          Registrarse
        </OptionsMenuMobile>
      </MobileMenu>
    </NavbarContainer>
  );
}

export default Navbar;
