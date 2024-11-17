import React from "react";
import { PriceText, DescriptionGameText, SecundaryTitleText } from "../styles/GeneralStyles";
import { GameItemContainer, GameInfo, ImageContainer, GameItemTextContainer, GameItemImage } from "../styles/MainMenuStyles";

const GameItem = ({ imageUri, name, price, game }) => {
  const handlePress = () => {
    console.log("Navigate to game:", game);
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
