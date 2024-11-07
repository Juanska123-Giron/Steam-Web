import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181d24;
  padding: 30px 279px;
  color: #ffffff;
  position: relative; // Para asegurar que el MobileMenu se posicione en relación a la Navbar

  @media (max-width: 1342px) {
    padding: 30px 20px; // Ajuste de padding para pantallas más pequeñas
  }
`;

export const StyledLogo = styled.img`
  width: 176px;
  height: auto;

  @media (max-width: 1323px) {
    width: 150px; // Reducción del tamaño del logo
    margin: 0 auto; // Centrando el logo
  }
`;

export const OptionsContainer = styled.div`
  margin-top: 5px;
  margin-left: 2.6%;
  display: flex; // Alineación horizontal
  margin-right: auto;

  @media (max-width: 1323px) {
    display: none; // Ocultar en pantallas pequeñas
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  @media (max-width: 1323px) {
    display: block;
    background: none;
    border: none;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
  }
`;
export const MobileMenu = styled.div`
  text-transform: uppercase;
  display: ${(props) => (props.isOpen ? "block" : "none")}; // Cambia a block
  margin-top: 25px;
  background-color: #2e3641;
  width: 100%;
  position: absolute;
  top: 100%; // Posiciona debajo de la barra de navegación
  left: 0;
  padding: 10px 0;
  z-index: 1; // Asegura que esté por encima de otros elementos

  @media (max-width: 1323px) {
    position: absolute;
    top: 70px;
  }
`;

export const Option = styled.div`
  color: #dcdedf;
  font-size: 16px;
  font-weight: 550;
  margin: 0 6px;
  cursor: pointer;
  font-family: "Motiva Sans", "Twemoji", "Noto Sans", Helvetica, sans-serif;
  position: relative;

  transition: color 0.6s;

  ${({ isSelected }) =>
    isSelected &&
    `
    color: #4b9df8;
    font-weight: bold;
  `}

  &:after {
    content: "";
    display: block;
    height: 2px;
    background-color: ${({ isSelected }) =>
      isSelected ? "#4b9df8" : "transparent"};
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    transition: width 0.3s ease, background-color 0.3s;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    &:after {
      width: 100%;
      left: 0;
    }
  `}
`;

export const OptionsContainerLogin = styled.div`
  margin-top: 5px;
  display: flex;
  margin-left: auto;
  align-items: center;
`;

export const OptionLogin = styled.div`
  color: #dcdedf;
  font-size: 12px;
  font-weight: 500;
  margin: 0 6px;
  cursor: pointer;
  font-family: "Motiva Sans", "Twemoji", "Noto Sans", Helvetica, sans-serif;
`;

export const VerticalBar = styled.div`
  width: 1px;
  height: 20px;
  background-color: #dcdedf;
  margin: 0 10px;
`;

export const OptionsMenuMobile = styled.div`
  color: #dcdedf;
  font-size: 16px;
  font-weight: 550;
  margin: 6.5px 6px;
  cursor: pointer;
  font-family: "Motiva Sans", "Twemoji", "Noto Sans", Helvetica, sans-serif;
  position: relative;
  text-align: center;

  transition: color 0.6s;

  ${({ isSelected }) =>
    isSelected &&
    `
    color: #4b9df8;
    font-weight: bold;
  `}

  &:after {
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    transition: width 0.3s ease, background-color 0.3s;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    &:after {
      width: 100%;
      left: 0;
    }
  `}
`;
