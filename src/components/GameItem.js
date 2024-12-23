import React from "react";
import { useNavigate } from "react-router-dom"; // Usar useNavigate
import { PriceText, DescriptionGameText, SecundaryTitleText } from "../styles/GeneralStyles";
import { GameItemContainer, GameInfo, ImageContainer, GameItemTextContainer, GameItemImage } from "../styles/MainMenuStyles";

const GameItem = ({ imageUri, name, price, gameId }) => {
  const navigate = useNavigate(); // Inicializar useNavigate

  const handlePress = () => {
    // Redirigir a la página de detalles del juego con el ID
    navigate(`${gameId}`);
  };

  return (
    <GameItemContainer onClick={handlePress}>
      <GameInfo>
        <ImageContainer>
          <GameItemImage src={imageUri} alt={name} />
        </ImageContainer>
        <GameItemTextContainer>
          <SecundaryTitleText>{name}</SecundaryTitleText>
          <DescriptionGameText>Windows</DescriptionGameText>
        </GameItemTextContainer>
      </GameInfo>
      <PriceText>{price}</PriceText>
    </GameItemContainer>
  );
};

export default GameItem;
