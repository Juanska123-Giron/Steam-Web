import styled from "styled-components";

export const MainImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin: 20px 0;
`;

export const GameInfoContainer = styled.div`
  margin-bottom: 20px;
`;

export const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 20px;
`;

export const CarouselImage = styled.img`
  width: 370px;
  height: 210px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const BuySection = styled.div`
  background-color: #576674;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const TitleAndIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const PriceAndCart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const PriceBox = styled.div`
  background-color: #000;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const SystemRequirements = styled.div`
  background-color: #243447;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 50px;
`;
