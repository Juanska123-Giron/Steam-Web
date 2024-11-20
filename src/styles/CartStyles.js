import styled from "styled-components";

export const CartWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 1px; /* Ajusta según la altura de tu navbar */
  overflow: auto;
`;



export const CartLayout = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  align-items: flex-start; /* Asegura que las columnas estén alineadas desde la parte superior */
  flex-wrap: wrap; /* Permite que las columnas se ajusten mejor en pantallas pequeñas */
`;


export const LeftColumn = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: auto;
`;

export const RightColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: auto;
`;

export const GameContainer = styled.div`
  margin: 10px 0;
  padding: 15px;
  background-color: #576674;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const RemoveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  button {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 14px;
  }
`;

export const TotalAndPayment = styled.div`
  padding: 15px;
  background-color: #576674;
  border-radius: 10px;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const PaymentRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
