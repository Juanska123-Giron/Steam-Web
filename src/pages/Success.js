import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TitleTextView,
  FormText,
  ButtonGroup,
  GrayButton,
  ButtonText,
} from "../styles/GeneralStyles";
import { PaymentFormContainer } from "../styles/PaymentStyles";

const Success = () => {
  const navigate = useNavigate();

  const handleNavigateToLibrary = () => {
    navigate("/library");
  };

  return (
    <>
    <Container>
      <PaymentFormContainer>
        <TitleTextView>¡Gracias por tu compra!</TitleTextView>
        <FormText>
          Tu pago se ha procesado correctamente. Encontrarás tu nuevo contenido
          en tu biblioteca.
        </FormText>
        <ButtonGroup>
          <GrayButton onClick={handleNavigateToLibrary}>
            <ButtonText>Ver la biblioteca</ButtonText>
          </GrayButton>
        </ButtonGroup>
      </PaymentFormContainer>
    </Container>
    </>
  );
};

export default Success;
