import styled from "styled-components";

export const MainImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin: 20px 0;
`;

export const GameInfoContainer = styled.div`
  margin-bottom: 20px;
`;

export const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  overflow: hidden;
  position: relative;
`;

export const CarouselImage = styled.img`
  width: 800px;
  height: 500px;
  border-radius: 10px;
  flex-shrink: 0;
`;

export const CarouselButton = styled.button`
  background-color: #576674;
  border: none;
  padding: 10px;
  color: white;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4f5d64;
  }

  &:focus {
    outline: none;
  }
`;

export const BuySection = styled.div`
  display: flex;
  justify-content: space-between; /* Divide en 2 columnas */
  background-color: #576674;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
`;

export const TitleAndIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;
  flex: 1; /* Se ocupa la mitad de la sección */
`;

export const PriceBox = styled.div`
  background-color: #000;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px; /* Añadido espacio entre el botón y el cuadro de precio */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const LeftSection = styled.div`
  flex: 2; /* Aumentamos el tamaño de la sección izquierda */
  margin-right: 20px;
`;

export const RightSection = styled.div`
  flex: 1; /* Reducimos el tamaño de la sección derecha */
`;

export const SystemRequirements = styled.div`
  background-color: #243447;
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
`;
