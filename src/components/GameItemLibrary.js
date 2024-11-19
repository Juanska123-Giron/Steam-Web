import React from "react";
import { useNavigate } from "react-router-dom"; // Usar useNavigate
import {
  DescriptionGameText,
  SecundaryTitleText,
} from "../styles/GeneralStyles";
import {
  GameItemContainer,
  GameInfo,
  ImageContainer,
  GameItemTextContainer,
  GameItemImage,
} from "../styles/MainMenuStyles";

const GameItemLibrary = ({ imageUri, name, gameId }) => {
    const navigate = useNavigate();
  
    const handlePress = () => {
      // Si `gameId` es un objeto, accede a su `_id`
      const id = gameId._id || gameId;  // Verifica si `gameId` ya es un string o un objeto
  
      // Navega a la URL correcta utilizando el `gameId` (ahora asegurado que es un string)
      navigate(`/library/${id}`);
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
      </GameItemContainer>
    );
  };
  

export default GameItemLibrary;
