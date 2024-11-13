import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../styles/NavbarStyles";
import LogoSvg from "../assets/steamLogo.svg";

function Navbar() {
  const [selectedOption, setSelectedOption] = useState("TIENDA");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setMobileMenuOpen(false);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1343 && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <NavbarContainer>
      <MobileMenuButton onClick={toggleMobileMenu}>☰</MobileMenuButton>
      <StyledLogo src={LogoSvg} alt="Logo de Steam" onClick={() => navigate("/")} />
      <OptionsContainer>
        {["TIENDA", "COMUNIDAD", "ACERCA DE", "SOPORTE"].map((option) => (
          <Option
            key={option}
            onClick={() => handleOptionClick(option)}
            $isSelected={selectedOption === option} // Cambiado a $isSelected
          >
            {option}
          </Option>
        ))}
      </OptionsContainer>
      <OptionsContainer>
        <OptionsContainerLogin>
          <OptionLogin onClick={handleLoginClick}>Inicio de sesión</OptionLogin>
          <VerticalBar />
          <OptionLogin onClick={handleRegisterClick}>Registrarse</OptionLogin>
        </OptionsContainerLogin>
      </OptionsContainer>
      <MobileMenu $isOpen={isMobileMenuOpen}>
        {" "}
        {/* Cambiado a $isOpen */}
        {["TIENDA", "COMUNIDAD", "ACERCA DE", "SOPORTE"].map((option) => (
          <OptionsMenuMobile
            key={option}
            onClick={() => handleOptionClick(option)}
            $isSelected={selectedOption === option} // Cambiado a $isSelected
          >
            {option}
          </OptionsMenuMobile>
        ))}
        <OptionsMenuMobile onClick={handleLoginClick}>Inicio de sesión</OptionsMenuMobile>
        <OptionsMenuMobile onClick={handleRegisterClick}>Registrarse</OptionsMenuMobile>
      </MobileMenu>
    </NavbarContainer>
  );
}

export default Navbar;
