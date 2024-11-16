import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181d24;
  padding: 30px 279px;
  color: #ffffff;
  position: relative;
  @media (max-width: 1342px) {
    padding: 30px 20px;
  }
`;

export const StyledLogo = styled.img`
  width: 176px;
  height: auto;
  cursor: pointer;
  @media (max-width: 1342px) {
    width: 150px;
    margin: 0 auto;
  }
`;

export const OptionsContainer = styled.div`
  margin-top: 5px;
  margin-left: 2.6%;
  display: flex;
  margin-right: auto;
  @media (max-width: 1342px) {
    display: none;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  @media (max-width: 1342px) {
    display: block;
    background: none;
    border: none;
    color: #ffffff;
    font-size: 34px;
    cursor: pointer;
  }
`;

export const MobileMenu = styled.div.attrs((props) => ({
  // Filtrar el prop $isOpen para que no se pase al DOM
  isOpen: undefined,
}))`
  text-transform: uppercase;
  display: ${(props) => (props.$isOpen ? "block" : "none")}; // Cambia a block
  margin-top: 25px;
  background-color: #2e3641;
  width: 100%;
  position: absolute;
  top: 100%; // Posiciona debajo de la barra de navegación
  left: 0;
  padding: 10px 0;
  z-index: 1; // Asegura que esté por encima de otros elementos

  @media (max-width: 1342px) {
    position: absolute;
    top: 70px;
  }
`;

export const Option = styled.div.attrs((props) => ({
  // Filtrar el prop $isSelected para que no se pase al DOM
  isSelected: undefined,
}))`
  color: #dcdedf;
  font-size: 16px;
  font-weight: 550;
  margin: 0 6px;
  cursor: pointer;
  font-family: "Motiva Sans", "Twemoji", "Noto Sans", Helvetica, sans-serif;
  position: relative;

  transition: color 0.6s;

  ${({ $isSelected }) =>
    $isSelected &&
    `
    color: #4b9df8;
    font-weight: bold;
  `}

  &:after {
    content: "";
    display: block;
    height: 2px;
    background-color: ${({ $isSelected }) => ($isSelected ? "#4b9df8" : "transparent")};
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    transition: width 0.3s ease, background-color 0.3s;
  }

  ${({ $isSelected }) =>
    $isSelected &&
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
  font-size: 13px;
  font-weight: 500;
  margin: 0 6px;
  cursor: pointer;
  font-family: "Motiva Sans", "Twemoji", "Noto Sans", Helvetica, sans-serif;
`;

export const UserNameLabel = styled.div`
  color: #dcdedf;
  font-size: 13.5px;
  font-weight: 600;
  margin: 0 6px;
  cursor: pointer;
  font-family: "Motiva Sans", "Twemoji", "Noto Sans", Helvetica, sans-serif;
`;

export const VerticalBar = styled.div.attrs((props) => ({
  // Filtrar el prop $isOpen para que no se pase al DOM
  userName: undefined,
}))`
  width: 1px;
  height: ${(props) => (props.$userName ? "13px" : "20px")}; // Cambia a block;
  background-color: #dcdedf;
  margin: 0 10px;
`;

export const OptionsMenuMobile = styled.div.attrs((props) => ({
  // Filtrar el prop $isSelected para que no se pase al DOM
  isSelected: undefined,
}))`
  color: #dcdedf;
  font-size: 16px;
  font-weight: 550;
  margin: 6.5px 6px;
  cursor: pointer;
  font-family: "Motiva Sans", "Twemoji", "Noto Sans", Helvetica, sans-serif;
  position: relative;
  text-align: center;

  transition: color 0.6s;

  ${({ $isSelected }) =>
    $isSelected &&
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

  ${({ $isSelected }) =>
    $isSelected &&
    `
    &:after {
      width: 100%;
      left: 0;
    }
  `}
`;
