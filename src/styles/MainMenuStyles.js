import styled from 'styled-components';

export const GameList = styled.div`
  flex: 1;
  margin-top: 10px;
  padding-top: 0;
  padding-bottom: 0;
`;

export const GameItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #243447;
  border-radius: 10px;
`;

export const GameInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 72px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
`;

export const GameItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const GameItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
