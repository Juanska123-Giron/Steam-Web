import styled from "styled-components";

export const Background = styled.div`
  background-image: url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRsnnP1OQlpaTvPev-AknNPq6bybt8_f9GKZVnKHO7Y45zoUbA1c9cFJA7RHQrhLKc1L00Dp87TkHXEsMqgIzZ0c4khSVCl629_bm5ikaQNyoBuRX8xVyCQIhrHS9jFMQsmnNCh0OOvKGMB25VNShGRYBHgjUMIZ6M-aKqoLdU0kUnrWAtdQnA3iz8GRQ/s16000/paperWall.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100;
  display: flex;
  flex-direction: column; /* Alineación de los hijos en columna */
  align-items: center;
  justify-content: flex-start; /* Alinea el contenido al inicio (arriba) */
  position: relative;
  overflow: hidden;
  clip-path: inset(0 0 0 0); /* Mantiene el corte en la parte inferior */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

export const MainContent = styled.div`
  //   background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra horizontalmente el ContentContainer */
  max-width: 900px;
  width: 100%;
  padding: 4.2rem 8rem; /* Añade un margen lateral para que no quede pegado al borde */
  margin-top: 0; /* Asegura que esté pegado a la parte superior */
`;

export const ContentContainer = styled.div`
  //background-color: rgba(24, 26, 32, 0.95);
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea el contenido del formulario a la izquierda */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
`;

export const Title = styled.h2`
  margin-left: 0.5rem;
  font-size: 28.2px;
  font-weight: 1000;
  color: white;
  margin-bottom: 1.9rem;
  text-align: left; /* Alinea el título a la izquierda */
  width: 100%;
`;

export const TitleAlt = styled.h2`
  font-size: 28.2px;
  font-weight: 1000;
  color: white;
  margin-bottom: 1rem;
  text-align: left; /* Alinea el título a la izquierda */
  width: 100%;
`;

export const FormContainer = styled.div`
  //padding: 0 0rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  text-align: left; /* Alinea el contenido del formulario a la izquierda */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.9rem;
    color: #b8b6b4;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  a {
    font-size: 12px !important;
    color: #afafaf !important;
    text-decoration: underline !important;
    margin-top: 1rem !important;
  }

  p {
    font-size: 12px;
    color: #afafaf;
    margin-top: 2.4rem;
    text-align: center;
  }

  span {
    font-size: 12px;
    color: #ce1c0d;
    margin-bottom: 12px;
  }
`;

export const Input = styled.input`
  background-color: #31465c;
  border: none;
  border-radius: 4px;
  padding: 0.7rem;
  color: white;
  margin-bottom: 1rem;
  font-size: 1rem;
`;
export const Button = styled.button`
  background: linear-gradient(to right, #56bcf9, #4172f6); /* Agregar el degradado horizontal */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.65rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(to right, #4172f6, #56bcf9); /* Invertir el degradado en hover */
  }
`;

export const CountrySelector = styled.select`
  background-color: #31465c;
  border: none;
  border-radius: 4px;
  padding: 0.7rem 1rem; /* Aumentamos el padding a la derecha */
  color: white;
  margin-bottom: 1rem;
  font-size: 1rem;
  appearance: none; /* Quita la flecha predeterminada */

  /* Agregar la flecha personalizada */
  position: relative;

  &::after {
    content: "▼"; /* símbolo de la flecha hacia abajo */
    position: absolute;

    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem; /* Tamaño de la flecha */
    color: white;
    pointer-events: none; /* Hace que la flecha no interfiera con la selección */
  }
`;

export const Spanner = styled.span`
  margin: auto;
  display: ${(props) => (props.showSpanner ? "block" : "none")};
  color: ${(props) => (props.showSpanner ? "green" : "red")};
  font-size: 4rem;
  margin-top: 1rem;
  transition: opacity 2s ease;
  opacity: ${(props) => (props.showSpanner ? 1 : 0)};
`;
