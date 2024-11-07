import React, { useState, useEffect } from "react";
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
import LogoSvg from "../assets/steamLogo.svg"; // Ajusta la ruta según sea necesario

function Navbar() {
  const [selectedOption, setSelectedOption] = useState("TIENDA");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setMobileMenuOpen(false); // Cerrar el menú después de hacer clic en una opción
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen); // Alternar estado del menú móvil
  };

  // Efecto para cerrar el menú móvil al redimensionar la ventana
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
      <StyledLogo src={LogoSvg} alt="Logo de Steam" />
      <OptionsContainer isOpen={isMobileMenuOpen}>
        {["TIENDA", "COMUNIDAD", "ACERCA DE", "SOPORTE"].map((option) => (
          <Option
            key={option}
            onClick={() => handleOptionClick(option)}
            isSelected={selectedOption === option}
          >
            {option}
          </Option>
        ))}
      </OptionsContainer>
      <OptionsContainer isOpen={isMobileMenuOpen}>
        <OptionsContainerLogin>
          <OptionLogin>Inicio de sesión</OptionLogin>
          <VerticalBar />
          <OptionLogin>Registrarse</OptionLogin>
        </OptionsContainerLogin>
      </OptionsContainer>
      <MobileMenu isOpen={isMobileMenuOpen}>
        {["TIENDA", "COMUNIDAD", "ACERCA DE", "SOPORTE"].map((option) => (
          <OptionsMenuMobile
            key={option}
            onClick={() => handleOptionClick(option)}
            isSelected={selectedOption === option}
          >
            {option}
          </OptionsMenuMobile>
        ))}
        <OptionsMenuMobile>Inicio de sesión</OptionsMenuMobile>
        <OptionsMenuMobile>Registrarse</OptionsMenuMobile>
      </MobileMenu>
    </NavbarContainer>
  );
}

export default Navbar;
