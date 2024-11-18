import React from "react";
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

const Cart = ({ navigation }) => {
  const { cartItems, removeFromCart } = useCart(); // Obtén el estado del carrito y la función para eliminar

  // Calcular el total
  const totalPrice = cartItems.reduce((sum, game) => sum + game.price, 0);

  const handleContinueShopping = () => {
    navigation.navigate("MainMenu");
  };

  const handlePayment = () => {
    navigation.navigate("PaymentScreen", { totalPrice }); // Navega a la pantalla de pago y pasa el monto total
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
              {/* Columna izquierda - Juegos */}
              <LeftColumn>
                {cartItems.map((game, index) => (
                  <GameContainer key={index}>
                    {/* Imagen del juego */}
                    {game.photos && game.photos.length > 0 && (
                      <GameImage src={game.photos[0]} alt={game.game_name} />
                    )}

                    {/* Nombre del juego */}
                    <SecundaryTitleText>{game.game_name}</SecundaryTitleText>

                    {/* Precio */}
                    <FormText>{`$${(game.price / 1000).toFixed(3)}`}</FormText>

                    {/* Botón para eliminar */}
                    <RemoveButtonContainer>
                      <button onClick={() => removeFromCart(index)}>
                        Eliminar
                      </button>
                    </RemoveButtonContainer>
                  </GameContainer>
                ))}
              </LeftColumn>

              {/* Columna derecha - Total y botones */}
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
