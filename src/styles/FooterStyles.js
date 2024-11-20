import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #181a20;
  color: #afafaf;
  font-family: Arial, sans-serif;
  font-size: 12px;
  padding: 20px 100px;
`;

export const FooterTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* Centra el contenido de la fila dentro de FooterTop */
`;

export const FooterRow = styled.div`
  display: flex;
  justify-content: space-between; /* Distribuye los elementos de manera equitativa */
  align-items: center;
  width: 100%; /* Asegura que ocupe todo el ancho disponible */

  @media (max-width: 1300px) {
    flex-direction: column; /* Para pantallas más pequeñas */
  }
`;

export const FooterColumn = styled.div`
  flex: 1;
  text-align: center;
  padding: 5px;

  &:nth-child(2) {
    flex: 2; /* El texto ocupa más espacio */
  }

  /* Estilos para los logos */
  ${(props) =>
    props.left &&
    `
    text-align: left;
    margin-right: 1rem; /* Acerca el logo de Valve */
  `}

  ${(props) =>
    props.right &&
    `
    text-align: right;
    margin-left: 1rem; /* Acerca el logo de Steam */
  `}

  ${(props) =>
    props.middle &&
    `
    text-align: center;
  `}
`;

export const FooterLogo = styled.div`
  img {
    height: 90px; /* Ajusta el tamaño del logo */
  }
`;

export const FooterText = styled.p`
  font-size: 12px;
  line-height: 1.4;

  a {
    color: white;
    text-decoration: none;
    margin: 0 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid #2a2a2a;
  padding-top: 10px;
  text-align: center;
`;

export const FooterNav = styled.nav`
  a {
    color: #afafaf;
    text-decoration: none;
    margin: 0 10px;

    &:hover {
      color: #fff;
    }

    &:not(:last-child)::after {
      content: "|";
      color: #afafaf;
      margin-left: 10px;
    }
  }
`;
