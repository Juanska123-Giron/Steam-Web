import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ModalContainer,
  ModalView,
  GameImage,
} from "../styles/components/AddToCartPopUpStyles";
import {
  TitleTextView,
  SecundaryTitleText,
  FormText,
  ButtonGroup,
  GrayButton,
  BlueButton,
  ButtonText,
} from "../styles/GeneralStyles";

const AddToCartPopup = ({ visible, onClose, game }) => {
  const navigate = useNavigate();

  const handleViewCart = () => {
    navigate("/cart", { state: { cartItems: [game] } });
  };

  if (!visible) return null;

  return (
    <ModalContainer>
      <ModalView>
        <TitleTextView>¡Añadido a tu carro!</TitleTextView>

        {/* Imagen del juego */}
        {game.photos && game.photos.length > 0 && (
          <GameImage src={game.photos[0]} alt={game.game_name} />
        )}

        {/* Nombre del juego */}
        <SecundaryTitleText>{game.game_name}</SecundaryTitleText>

        {/* Precio */}
        <FormText>{`$${(game.price / 1000).toFixed(3)}`}</FormText>

        {/* Botones */}
        <ButtonGroup>
          <GrayButton onClick={onClose}>
            <ButtonText>Seguir comprando</ButtonText>
          </GrayButton>
          <BlueButton onClick={handleViewCart}>
            <ButtonText>Ver mi carro</ButtonText>
          </BlueButton>
        </ButtonGroup>
      </ModalView>
    </ModalContainer>
  );
};

export default AddToCartPopup;
