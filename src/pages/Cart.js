import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import {
  CartWrapper,
  GameContainer,
  RemoveButtonContainer,
  TotalAndPayment,
  TotalRow,
  PaymentRow,
  ButtonContainer,
  CartLayout,
  LeftColumn,
  RightColumn,
} from "../styles/CartStyles";
import {
  Container,
  TitleTextView,
  DescriptionGameText,
  SecundaryTitleText,
  FormText,
  ButtonText,
  BlueButton,
  GrayButton,
} from "../styles/GeneralStyles";
import { GameImage } from "../styles/components/AddToCartPopUpStyles";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calcular el total
  const totalPrice = cartItems.reduce((sum, game) => sum + game.price, 0);

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handlePayment = () => {
    console.log("Total Price:", totalPrice); // Agregar mensaje de depuración
    navigate("/payment", { state: { totalPrice } });
  };

  return (
    <>
      <Navbar />
      <Container>
        <CartWrapper>
          <TitleTextView>Tu Carrito</TitleTextView>

          {cartItems.length === 0 ? (
            <DescriptionGameText>Tu carrito está vacío.</DescriptionGameText>
          ) : (
            <CartLayout>
              <LeftColumn>
                {cartItems.map((game, index) => (
                  <GameContainer key={index}>
                    {game.photos && game.photos.length > 0 && (
                      <GameImage src={game.photos[0]} alt={game.game_name} />
                    )}
                    <SecundaryTitleText>{game.game_name}</SecundaryTitleText>
                    <FormText>{`$${(game.price / 1000).toFixed(3)}`}</FormText>
                    <RemoveButtonContainer>
                      <button onClick={() => removeFromCart(index)}>
                        Eliminar
                      </button>
                    </RemoveButtonContainer>
                  </GameContainer>
                ))}
              </LeftColumn>

              <RightColumn>
                <TotalAndPayment>
                  <TotalRow>
                    <SecundaryTitleText>
                      Total estimado: {`$${(totalPrice / 1000).toFixed(3)}`}
                    </SecundaryTitleText>
                  </TotalRow>

                  <PaymentRow>
                    <BlueButton onClick={handlePayment}>
                      <ButtonText>Continuar al pago</ButtonText>
                    </BlueButton>
                  </PaymentRow>
                </TotalAndPayment>

                <ButtonContainer>
                  <GrayButton onClick={handleContinueShopping}>
                    <ButtonText>Seguir comprando</ButtonText>
                  </GrayButton>
                </ButtonContainer>
              </RightColumn>
            </CartLayout>
          )}
        </CartWrapper>
      </Container>
    </>
  );
};

export default Cart;